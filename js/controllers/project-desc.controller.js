if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    function ProjectDescriptionController(manager, options) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = undefined;
        this.options = options;
        this.destroyed = false;
    }

    ProjectDescriptionController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    ProjectDescriptionController.prototype.constructor = ProjectDescriptionController;

    ProjectDescriptionController.prototype.buildView = function() {
        this.container = DomHelper.createDiv();
        this.container.appendChild(ProjectDescriptionView.main(this.options));
        return this.container;
    };

    ProjectDescriptionController.prototype.destroyView = function() {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                    resolve();
                }});
        });
    };

    ProjectDescriptionController.prototype.cssName = function() {
        return 'project-desc-css';
    };

    window.Controllers.ProjectDescriptionController = ProjectDescriptionController;
})();