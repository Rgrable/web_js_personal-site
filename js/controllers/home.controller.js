if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;

    function HomeController(manager) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = undefined;
        this.destroyed = false;
    }

    HomeController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    HomeController.prototype.constructor = HomeController;

    HomeController.prototype.fetchBlogPosts = function() {
        webService.get(`?action=fetchPosts`).then(res => {
            console.log(res);
            let json = JSON.parse(res);
            if (json.success && !this.destroyed) {
                let delay = 250;
                for (let res of json.result) {
                    res.delay = delay;
                    this.container.appendChild(HomeView.blogCard(res));
                    delay += 250;
                }
            }
        });
    };

    HomeController.prototype.buildView = function() {
        this.container = DomHelper.createDiv();
        this.container.appendChild(HomeView.main());
        this.fetchBlogPosts();
        return this.container;
    };

    HomeController.prototype.destroyView = function() {
        this.destroyed = true;
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                    resolve();
            }});
        });
    };

    HomeController.prototype.cssName = function() {
        return 'home-css';
    };

    window.Controllers.HomeController = HomeController;
})();