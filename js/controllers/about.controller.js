if (!window.Controllers) {
    window.Controllers = {};
}

(function () {

    function AboutController(manager) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = null;
    }

    AboutController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    AboutController.prototype.constructor = AboutController;

    AboutController.prototype.buildView = function () {
        this.container = DomHelper.createDiv();
        this.container.appendChild(DomHelper.createH1({text: "About", class: "title"}));
        return this.container;
    };

    AboutController.prototype.destroyView = function() {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                resolve();
            }});
        });
    };

    AboutController.prototype.cssName = function() {
        return 'about-css';
    };

    window.Controllers.AboutController = AboutController;
})();