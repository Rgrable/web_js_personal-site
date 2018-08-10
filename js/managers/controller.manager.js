if (!window.Managers) {
    window.Managers = {};
}

(function () {
    const CSS_DIR = "css/";
    let __controller = undefined;
    let __curName = "";

    function ControllerManager() {
        this.main = document.getElementById('main');
        this.sizeListener = null;
    }

    ControllerManager.prototype.loadCss = function(css, name) {
        return new Promise(resolve => {
            let d = document.createElement('link');
            d.href = CSS_DIR + css;
            d.id = name;
            d.rel = "stylesheet";
            document.head.appendChild(d);
            setTimeout(() => {
                resolve();
            }, 10);
        });
    };

    ControllerManager.prototype.removeCss = function(id) {
        let d = document.getElementById(id);
        if (d) {
            document.head.removeChild(d);
        }
    };

    /***
     * switches the controller
     * @param controller : 'home','about','skills'
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
            this.removeCss(__controller.cssName());
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
            case 'skills':
                __controller = new window.Controllers.SkillsController(this);
                css = "skills.css";
                break;
        }

        this.loadCss(css, __controller.cssName()).then(() => {
            let view = __controller.buildView();
            this.sizeListener = DomHelper.createResizeEvent(view, (sizeY) => {
                this.main.style.height = sizeY + "px";
            });
            this.main.appendChild(view);
        });
    };

    window.Managers.ControllerManager = ControllerManager;
})();