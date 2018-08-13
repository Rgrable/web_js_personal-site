if (!window.Managers) {
    window.Managers = {};
}

(function () {
    const BUTTONS = [
        {
            name: 'HOME',
            controller: 'home',
            col: "#d07337"
        },
        {
            name: 'PROJECTS',
            controller: 'project',
            col: "#3874ad"
        },
        {
            name: 'SKILLS',
            controller: 'skills',
            col: "#309340"
        }];

    function NavManager(onclick, onclose) {
        this.nav = document.getElementById('nav');
        this.onclick = onclick;
        this.onclose = onclose;
        this.buttons = [];
        this.closeBtn = null;
        this.slider = new window.MaterialSlider().setRoot(this.nav).build({height: "5px"});
        this.setupButtons();
    }

    NavManager.prototype.showAnimation = function(col) {
        let animator = DomHelper.createDiv({class: "animator", style: {backgroundColor: col}});
        this.nav.appendChild(animator);
        AnimationHelper.applyAnimation(animator, {anim: (el, t, opt) => {
            el.style.transform = "translate(-50%, -50%) scale(60)";
            el.style.opacity = "1";
            return t * 1000;
        },delay: 250, length: 0.75, onfinished: () => {
            this.nav.style.backgroundColor = col;
            this.nav.removeChild(animator);
        }});
    };

    NavManager.prototype.showShadow = function () {
        if (!this.nav.classList.contains('scrolled')) {
            this.nav.classList.add('scrolled');
        }
    };

    NavManager.prototype.hideShadow = function () {
        if (this.nav.classList.contains('scrolled')) {
            this.nav.classList.remove('scrolled');
        }
    };

    NavManager.prototype.hideButtons = function() {
        for (let i of this.buttons) {
            AnimationHelper.applyAnimation(i, {anim: AnimationHelper.genericAnimations.fadeOutUp, length: 0.25});
        }
        AnimationHelper.applyAnimation(this.closeBtn, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
    };

    NavManager.prototype.showButtons = function() {
        for (let i of this.buttons) {
            AnimationHelper.applyAnimation(i, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
        }

        AnimationHelper.applyAnimation(this.closeBtn, {anim: AnimationHelper.genericAnimations.fadeOutUp, length: 0.25});
    };

    NavManager.prototype.setEvents = function() {
        window.onscroll = () => {
            if (window.scrollY >= 70) {
                this.showShadow();
            } else {
                this.hideShadow();
            }
        };
    };

    NavManager.prototype.setupButtons = function() {
        this.closeBtn = document.getElementById('close');
        AnimationHelper.genericAnimations.fadeOutUp(this.closeBtn);
        this.closeBtn.onclick = this.onclose;
        let del = 250;
        let slid = false;
        for (let i of BUTTONS) {
            let btn = DomHelper.createBtn(
                {
                    text: i.name,
                    click: () => {
                        this.onclick(i.controller);
                        this.slider.move(btn);
                        this.showAnimation(i.col);
                    }
                });
            this.nav.appendChild(btn);
            AnimationHelper.genericAnimations.fadeOutUp(btn);
            AnimationHelper.applyAnimation(btn, {delay: del, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onfinished: () => {
                    if (!slid) {
                        slid = true;
                        this.showAnimation(i.col);
                        this.slider.move(btn);
                    }
                }});
            del += 250;
            this.buttons.push(btn);
        }
    };

    window.Managers.NavManager = NavManager;
})();