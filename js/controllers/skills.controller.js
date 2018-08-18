if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;
    let _data = null;

    function SkillsController(manager, options) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = null;
    }


    SkillsController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    SkillsController.prototype.constructor = SkillsController;

    SkillsController.prototype.expName = function(exp) {
        if (exp > 90) {
            return "master";
        } else if (exp > 70) {
            return "expert";
        } else if (exp > 55) {
            return "proficient";
        } else if (exp > 40) {
            return "novice";
        } else {
            return "n00b";
        }
    };

    SkillsController.prototype.populateSkills = function(data) {
        let delay = 250;
        let cont = DomHelper.createDiv({class: "skill-card-container"});
        for (let r of data.result) {
            r.expName = this.expName(r.exp);
            r.delay = delay;
            cont.appendChild(SkillsView.skillCard(r));
            delay += 100;
        }
        this.container.appendChild(cont);
    };

    SkillsController.prototype.fetchSkills = function() {
        if (_data) {
            this.populateSkills(_data);
        } else {
            webService.get(`?action=fetchSkills`).then(res => {
                let json = JSON.parse(res);
                if (json.success) {
                    this.populateSkills(json);
                    _data = json;
                }
            });
        }
    };

    SkillsController.prototype.buildView = function () {
        this.container = DomHelper.createDiv();
        this.container.appendChild(SkillsView.main());
        this.fetchSkills();
        return this.container;
    };

    SkillsController.prototype.destroyView = function () {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                resolve();
            }});
        });
    };

    SkillsController.prototype.cssName = function () {
        return "skills-css";
    };

    window.Controllers.SkillsController = SkillsController;
})();