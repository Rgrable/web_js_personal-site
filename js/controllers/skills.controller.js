if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;

    function SkillsController(manager) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = null;
    }


    SkillsController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    SkillsController.prototype.constructor = SkillsController;

    SkillsController.prototype.expName = function(exp) {
        if (exp > 90) {
            return "master";
        } else if (exp > 75) {
            return "expert";
        } else if (exp > 65) {
            return "proficient";
        } else if (exp > 50) {
            return "novice";
        } else {
            return "n00b";
        }
    };

    SkillsController.prototype.fetchSkills = function() {
        webService.get(`?action=fetchSkills`).then(res => {
            let delay = 250;
            let json = JSON.parse(res);
            for (let r of json.result) {
                r.expName = this.expName(r.exp);
                r.delay = delay;
                this.container.appendChild(SkillsView.skillCard(r));
                delay += 250;
            }
        });
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