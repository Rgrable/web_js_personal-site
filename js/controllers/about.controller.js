if (!window.Controllers) {
    window.Controllers = {};
}

(function () {

    function AboutController() {
        window.Controllers.AbstractController.call(this);
    }

    AboutController.prototype = window.Controllers.AbstractController.prototype;
    AboutController.prototype.constructor = AboutController;

    AboutController.prototype.buildView = function () {
        this.main.style.minHeight = "200px";
        let d = document.createElement('div');
        d.appendChild(DomHelper.createH1({text: "About", class: "title"}));
        return d;
    };

    AboutController.prototype.destroyView = function() {
        this.removeCss(this.cssName());
        this.main.style.minHeight = "0";
        this.main.innerHTML = ``;
    };

    AboutController.prototype.cssName = function() {
        return 'about-css';
    };

    window.Controllers.AboutController = AboutController;
})();