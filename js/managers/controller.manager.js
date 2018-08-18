if (!window.Managers) {
    window.Managers = {};
}

(function () {
    const CSS_DIR = "css/";
    let __controller = undefined;
    let __curName = "";
    let __prevName = "";

    function ControllerManager() {
        this.main = document.getElementById('main');
        this.sizeListener = null;
        this.events = {
            onShowNav: null,
            onHideNav: null
        };
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

    ControllerManager.prototype.setOnSwitchEvents = function (onShowNav, onHideNav) {
        this.events.onShowNav = onShowNav;
        this.events.onHideNav = onHideNav;
    };

    ControllerManager.prototype.goBack = function() {
        this.switchController(__prevName, null);
    };

    ControllerManager.prototype.fromLocation = function() {
        let res = "home";
        let loc = window.location.toString().split("#")[1];
        console.log(loc);
        switch (loc) {
            case '/projects':
                res = "project";
                break;
            case '/skills':
                res = 'skills';
                break;
        }

        return res;
    };

    /***
     * switches the controller
     * @param controller : 'home','project','skills','project-desc','markdown'
     * @param options: {}
     */
    ControllerManager.prototype.switchController = async function (controller, options) {
        if (__curName && __curName === controller) {
            return;
        }

        if (__curName) {
            __prevName = __curName;
        }

        if (__curName === 'project-desc' || __curName === 'markdown') {
            this.events.onShowNav();
        }

        if (this.sizeListener) {
            clearInterval(this.sizeListener);
        }

        __curName = controller;
        nav.moveSlider(__curName);
        if (__controller) {
            await __controller.destroyView();
            this.removeCss(__controller.cssName());
            this.main.innerHTML = ``;
        }

        let css = "";
        switch (controller) {
            case 'home':
            default:
                __controller = new window.Controllers.HomeController(this, options);
                nav.navBarAnimation("#d07337");
                window.location = "#/home";
                css = 'home.css';
                break;
            case 'project':
                __controller = new window.Controllers.ProjectController(this, options);
                nav.navBarAnimation("#3874ad");
                window.location = "#/projects";
                css = 'projects.css';
                break;
            case 'skills':
                __controller = new window.Controllers.SkillsController(this, options);
                nav.navBarAnimation("#309340");
                window.location = "#/skills";
                css = "skills.css";
                break;
            case 'project-desc':
                this.events.onHideNav();
                __controller = new window.Controllers.ProjectDescriptionController(this, options);
                nav.navBarAnimation(options.boxColor, options.fontColor);
                css = "project-desc.css";
                break;
            case 'markdown':
                this.events.onHideNav();
                __controller = new window.Controllers.MarkdownController(this, options);
                css = "markdown.css";
                break;
        }

        this.loadCss(css, __controller.cssName()).then(() => {
            let view = __controller.buildView();
            this.sizeListener = DomHelper.createResizeEvent(view, (sizeY) => {
                this.main.style.height = sizeY + "px";
            });
            this.main.appendChild(view);
            window.scrollTo({behavior: "smooth", top: 0});
        });
    };

    window.Managers.ControllerManager = ControllerManager;
})();