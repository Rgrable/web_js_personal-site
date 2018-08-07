if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const CSS_DIR = "css/";

    function AbstractController() {
        this.main = document.getElementById('main');
    }

    AbstractController.prototype.createView = function () {
        this.main.appendChild(this.buildView());
    };

    AbstractController.prototype.loadCss = function(css, id) {
        let d = document.createElement('link');
        d.href = CSS_DIR + css;
        d.id = id;
        d.rel = "stylesheet";
        document.head.appendChild(d);
    };

    AbstractController.prototype.removeCss = function(id) {
        let d = document.getElementById(id);
        if (d) {
            document.head.removeChild(d);
        }
    };

    /***
     * @abstract
     * @returns {*}
     */
    AbstractController.prototype.buildView = function () {
        console.log("buildView is not implemented!");
        return null;
    };

    window.Controllers.AbstractController = AbstractController;
})();