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

    ProjectController.prototype.fetchProjects = function() {
        if (_data) {
            for (let jobs of _data.result) {
                let j = ProjectView.job(jobs);
                for (let cat of jobs.projects) {
                    for (let project of cat.projects) {
                        console.log(project);
                        let p = ProjectView.project(project, (data) => {
                            this.manager.switchController('project-desc', data);
                        });
                        j.projects.appendChild(p);
                    }
                }
                this.container.appendChild(j.job);
            }
        } else {
            webService.get(`?action=fetchProjects`).then(res => {
                let json = JSON.parse(res);
                if (json.success) {
                    _data = json;
                    for (let jobs of json.result) {
                        let j = ProjectView.job(jobs);
                        for (let cat of jobs.projects) {
                            for (let project of cat.projects) {
                                console.log(project);
                                let p = ProjectView.project(project, (data) => {
                                    this.manager.switchController('project-desc', data);
                                });
                                j.projects.appendChild(p);
                            }
                        }
                        this.container.appendChild(j.job);
                    }
                }
            });
        }
    };

    ProjectController.prototype.buildView = function () {
        this.container = DomHelper.createDiv();
        this.container.appendChild(DomHelper.createH1({text: "Projects", class: "title"}));
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