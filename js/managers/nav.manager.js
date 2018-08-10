if (!window.Managers) {
    window.Managers = {};
}

(function () {
    const BUTTONS = [
        {
            name: 'HOME',
            controller: 'home'
        },
        {
            name: 'ABOUT',
            controller: 'about'
        },
        {
            name: 'SKILLS',
            controller: 'skills'
        }];

    function NavManager(onclick) {
        this.nav = document.getElementById('nav');
        this.onclick = onclick;
        this.slider = new window.MaterialSlider().setRoot(this.nav).build({height: "5px"});
        this.setEvents();
        this.createButtons();
    }

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

    NavManager.prototype.setEvents = function() {
        window.onscroll = () => {
            if (window.scrollY >= 70) {
                this.showShadow();
            } else {
                this.hideShadow();
            }
        };
    };

    NavManager.prototype.createButtons = function() {
        let del = 250;
        let slid = false;
        for (let i of BUTTONS) {
            let btn = DomHelper.createBtn(
                {
                    text: i.name,
                    click: () => {
                        this.onclick(i.controller);
                        this.slider.move(btn);
                    }
                });
            this.nav.appendChild(btn);
            AnimationHelper.genericAnimations.fadeOutUp(btn);
            AnimationHelper.applyAnimation(btn, {delay: del, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onfinished: () => {
                    if (!slid) {
                        slid = true;
                        this.slider.move(btn);
                    }
                }});
            del += 250;
        }
    };

    window.Managers.NavManager = NavManager;
})();