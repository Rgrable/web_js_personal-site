if (!window.Managers) {
    window.Managers = {};
}

(function () {
    let __controller = undefined;
    let __curName = "";

    function ControllerManager() {
        this.main = document.getElementById('main');
        this.sizeListener = null;
    }

    /***
     * switches the controller
     * @param controller : 'home','about'
     */
    ControllerManager.prototype.switchController = async function (controller) {
        if (__curName && __curName === controller) {
            return;
        }

        if (this.sizeListener) {
            clearInterval(this.sizeListener);
        }

        __curName = controller;
        if (__controller) {
            await __controller.destroyView();
            this.main.innerHTML = ``;
        }

        let css = "";
        switch (controller) {
            case 'home':
            default:
                __controller = new window.Controllers.HomeController(this);
                css = 'home.css';
                break;
            case 'about':
                __controller = new window.Controllers.AboutController(this);
                css = 'about.css';
                break;
        }

        __controller.loadCss(css).then(() => {
            let view = __controller.buildView();
            this.sizeListener = DomHelper.createResizeEvent(view, (sizeY) => {
                this.main.style.height = sizeY + "px";
            });
            this.main.appendChild(view);
        });
    };

    window.Managers.ControllerManager = ControllerManager;
})();