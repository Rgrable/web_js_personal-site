if (!window.Controllers) {
    window.Controllers = {};
}

(function () {

    const webService = window.Services.WebService;
    let _data = null;

    function ProjectController(manager, options) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = null;
    }

    ProjectController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    ProjectController.prototype.constructor = ProjectController;

    ProjectController.prototype.populateProjects = function(data) {
        let jobDelay = 250;
        for (let jobs of data.result) {
            let projectDelay = jobDelay;
            jobs.delay = jobDelay;
            let j = ProjectView.job(jobs);
            for (let cat of jobs.projects) {
                for (let project of cat.projects) {
                    project.delay = projectDelay;
                    let p = ProjectView.project(project, (d) => {
                        this.manager.switchController('project-desc', d);
                    });
                    j.projects.appendChild(p);
                    projectDelay += 50;
                }
            }
            jobDelay += 250;
            this.container.appendChild(j.job);
        }
    };

    ProjectController.prototype.fetchProjects = function() {
        if (_data) {
            this.populateProjects(_data);
        } else {
            webService.get(`?action=fetchProjects`).then(res => {
                let json = JSON.parse(res);
                if (json.success) {
                    _data = json;
                    this.populateProjects(json);
                }
            });
        }
    };

    ProjectController.prototype.buildView = function () {
        this.container = DomHelper.createDiv();
        this.container.appendChild(ProjectView.main());
        this.fetchProjects();
        return this.container;
    };

    ProjectController.prototype.destroyView = function() {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                resolve();
            }});
        });
    };

    ProjectController.prototype.cssName = function() {
        return 'projects-css';
    };

    window.Controllers.ProjectController = ProjectController;
})();