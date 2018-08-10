if (!window.Controllers) {
    window.Controllers = {};
}

(function () {

    function AbstractController(manager) {
        this.manager = manager;
    }

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