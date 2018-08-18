if (!window.Controllers) {
    window.Controllers = {};
}

(function () {
    function MarkdownController(manager, options) {
        window.Controllers.AbstractController.call(this, manager);
        this.container = undefined;
        this.options = options;
    }

    MarkdownController.prototype = Object.create(window.Controllers.AbstractController.prototype);
    MarkdownController.prototype.constructor = MarkdownController;


    MarkdownController.prototype.buildView = function() {
        this.container = DomHelper.createDiv({class: "markdown-body"});
        this.container.innerHTML = this.options.data;
        AnimationHelper.genericAnimations.fadeOutLeft(this.container);
        AnimationHelper.applyAnimation(this.container, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
        return this.container;
    };

    MarkdownController.prototype.destroyView = function() {
        return new Promise(resolve => {
            AnimationHelper.applyAnimation(this.container, {anim: AnimationHelper.genericAnimations.fadeOutLeft, length: 0.25, onfinished: () => {
                    resolve();
                }});
        });
    };

    MarkdownController.prototype.cssName = function() {
        return 'markdown-css';
    };

    window.Controllers.MarkdownController = MarkdownController;
})();