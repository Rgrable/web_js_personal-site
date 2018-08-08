if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;

    function HomeController() {
        window.Controllers.AbstractController.call(this);
        this.container = undefined;
    }

    HomeController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    HomeController.prototype.constructor = HomeController;

    HomeController.prototype.buildView = function() {
        this.main.style.minHeight = "500px";
        this.container = DomHelper.createDiv();
        HomeView.main(this.container);
        return this.container;
    };

    HomeController.prototype.destroyView = function() {
        this.removeCss(this.cssName());
        this.main.style.minHeight = "0";
        this.main.innerHTML = ``;
    };

    HomeController.prototype.cssName = function() {
        return 'home-css';
    };

    window.Controllers.HomeController = HomeController;
})();