if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    function HomeController() {
        this.main = document.getElementById('main');
        this.createView();
    }

    HomeController.prototype.createView = function() {
        LogUtil.debug("creating home view");
        this.main.innerHTML = ``;
    };

    window.Controllers.HomeController = HomeController;
})();