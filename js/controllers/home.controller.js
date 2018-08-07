if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;
    const CSS_NAME = "home-css";

    function HomeController() {
        window.Controllers.AbstractController.call(this);
        this.createView();
    }

    HomeController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    HomeController.prototype.constructor = HomeController;

    HomeController.prototype.buildView = function() {
        this.loadCss('home.css', CSS_NAME);
        let d = document.createElement('div');
        d.appendChild(DomHelper.createH1({text: "Home", class: "title"}));
        d.appendChild(DomHelper.createImg({src: 'https://storage.googleapis.com/richardgrable-com/header.jpg', class: "header"}));
        return d;
    };

    window.Controllers.HomeController = HomeController;
})();