if (!window.Managers) {
    window.Managers = {};
}

(function () {
    let __controller = undefined;

    function ControllerManager() {

    }

    /***
     * switches the controller
     * @param controller : 'home','about'
     */
    ControllerManager.prototype.switchController = function (controller) {
        if (__controller) {
            __controller.removeView();
        }

        let css = "";
        switch (controller) {
            case 'home':
            default:
                __controller = new window.Controllers.HomeController();
                css = 'home.css';
                break;
            case 'about':
                __controller = new window.Controllers.AboutController();
                css = 'about.css';
                break;
        }

        __controller.loadCss(css).then(() => {
            __controller.createView();
        });
    };

    window.Managers.ControllerManager = ControllerManager;
})();