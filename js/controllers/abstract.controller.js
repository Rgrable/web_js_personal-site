if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const CSS_DIR = "css/";

    function AbstractController(manager) {
        this.manager = manager;
    }

    AbstractController.prototype.loadCss = function(css) {
        return new Promise(resolve => {
            let d = document.createElement('link');
            d.href = CSS_DIR + css;
            d.id = this.cssName();
            d.rel = "stylesheet";
            document.head.appendChild(d);
            setTimeout(() => {
                resolve();
            }, 10);
        });
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

    /***
     * @abstract
     * @returns {Promise<*>}
     */
    AbstractController.prototype.destroyView = function () {
        console.log("destroyView is not implemented!");
        return Promise.reject("");
    };

    /***
     * @abstract
     * @returns {string}
     */
    AbstractController.prototype.cssName = function() {
        console.log("cssName is not implemented!");
        return "";
    };

    window.Controllers.AbstractController = AbstractController;
})();