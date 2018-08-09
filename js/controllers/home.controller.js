if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;

    function HomeController(manager) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = undefined;
    }

    HomeController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    HomeController.prototype.constructor = HomeController;

    HomeController.prototype.buildView = function() {
        this.container = DomHelper.createDiv();
        HomeView.main(this.container);
        return this.container;
    };

    HomeController.prototype.destroyView = function() {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                    this.removeCss(this.cssName());
                    resolve();
            }});
        });
    };

    HomeController.prototype.cssName = function() {
        return 'home-css';
    };

    window.Controllers.HomeController = HomeController;
})();