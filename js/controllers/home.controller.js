if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    const webService = window.Services.WebService;
    let _data = null;

    function HomeController(manager, options) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = undefined;
        this.destroyed = false;
    }

    HomeController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    HomeController.prototype.constructor = HomeController;

    HomeController.prototype.populatePosts = function(data) {
        let delay = 250;
        for (let res of data.result) {
            res.delay = delay;
            this.container.appendChild(HomeView.blogCard(res, (link) => {
                webService.get(`?action=fetchText&link=${link}`).then(res => {
                    let json = JSON.parse(res);
                    if (json.success) {
                        this.manager.switchController('markdown', {data: json.result.value});
                    }
                });
            }));
            delay += 250;
        }
    };

    HomeController.prototype.fetchBlogPosts = function() {
        if (_data) {
            this.populatePosts(_data);
        } else {
            webService.get(`?action=fetchPosts`).then(res => {
                let json = JSON.parse(res);
                if (json.success && !this.destroyed) {
                    this.populatePosts(json);
                    _data = json;
                }
            });
        }
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