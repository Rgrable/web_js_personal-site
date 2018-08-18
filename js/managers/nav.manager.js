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
        },
        {
            name: 'RESUME',
            link: 'https://storage.googleapis.com/richardgrable-com/resources/Resume.pdf'
        }];
    let __curController = undefined;

    function NavManager(onclick, onclose) {
        this.navCont = document.getElementById('nav-container');
        this.nav = document.getElementById('nav');
        this.mobileNav = document.getElementById('mobile-nav');
        this.onclick = onclick;
        this.onclose = onclose;
        this.buttons = [];
        this.closeBtn = null;
        this.hamburgerMenu = null;
        this.mobile = window.innerWidth <= 960;
        this.slider = new window.MaterialSlider().setRoot(this.nav).build({height: "5px"});
        this.setupButtons();
        this.changeView();
    }

    NavManager.prototype.navBarAnimation = function(col, fontCol) {
        fontCol = fontCol || "#FFFFFF";
        let animator = DomHelper.createDiv({class: "animator", style: {backgroundColor: col}});
        this.navCont.appendChild(animator);
        AnimationHelper.applyAnimation(animator, {anim: (el, t, opt) => {
            el.style.transform = "translate(-50%, -50%) scale(50)";
            el.style.opacity = "1";
            return t * 1000;
        },delay: 500, length: 0.75, onfinished: () => {
            this.navCont.style.backgroundColor = col;
            this.navCont.removeChild(animator);
        }, onstart: () => {
            this.changeFontColor(fontCol);
        }});
    };

    NavManager.prototype.moveSlider = function(name) {
        __curController = name;
        for (let i of this.buttons) {
            if (i.controller === name) {
                this.slider.move(i);
                break;
            }
        }
    };

    NavManager.prototype.changeFontColor = function(col) {
        this.closeBtn.style.color = col;
        this.slider.slider.style.color = col;
        for (let i of this.buttons) {
            i.style.color = col;
        }
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

    NavManager.prototype.changeView = function() {
        if (this.mobile) {
            this.hideMobileNav();
            this.nav.style.display = 'none';
            this.mobileNav.style.display = 'block';
        } else {
            this.mobileNav.style.display = 'none';
            this.nav.style.display = 'block';
            if (__curController) {
                this.moveSlider(__curController);
            }
        }
    };

    NavManager.prototype.showMobileNav = function() {
        this.mobileNav.style.maxHeight = null;
    };

    NavManager.prototype.hideMobileNav = function() {
        this.mobileNav.style.maxHeight = "0px";
    };

    NavManager.prototype.hideButtons = function() {
        this.slider.hide();
        for (let i of this.buttons) {
            AnimationHelper.applyAnimation(i, {anim: AnimationHelper.genericAnimations.fadeOutUp, length: 0.25, onfinished: () => {
                i.style.display = "none";
            }});
        }
        AnimationHelper.applyAnimation(this.closeBtn, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onstart: () => {
            this.closeBtn.style.display = "block";
        }});

        AnimationHelper.applyAnimation(this.hamburgerMenu, {anim: AnimationHelper.genericAnimations.fadeOutUp, length: 0.25, onfinished: () => {
            this.hamburgerMenu.style.display = "none";
        }});
    };

    NavManager.prototype.showButtons = function() {
        this.slider.show();
        for (let i of this.buttons) {
            AnimationHelper.applyAnimation(i, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onstart: () => {
                i.style.display = "inline-block";
            }});
        }

        AnimationHelper.applyAnimation(this.closeBtn, {anim: AnimationHelper.genericAnimations.fadeOutUp, length: 0.25, onfinished: () => {
            this.closeBtn.style.display = "none";
        }});

        AnimationHelper.applyAnimation(this.hamburgerMenu, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onstart: () => {
                this.hamburgerMenu.style.display = "block";
        }});
    };

    NavManager.prototype.setEvents = function() {
        window.onscroll = () => {
            if (window.scrollY >= 50) {
                this.showShadow();
            } else {
                this.hideShadow();
            }
        };

        window.onresize = () => {
            if (window.innerWidth <= 960 && !this.mobile) {
                this.mobile = true;
                this.changeView();
            } else if (window.innerWidth > 960 && this.mobile) {
                this.mobile = false;
                this.changeView();
            }
        };
    };

    NavManager.prototype.setupButtons = function() {
        this.closeBtn = document.getElementById('close');
        AnimationHelper.genericAnimations.fadeOutUp(this.closeBtn);
        this.closeBtn.onclick = this.onclose;
        this.hamburgerMenu = document.getElementById('hamburger');
        this.hamburgerMenu.onclick = () => {
            if (this.mobileNav.offsetHeight) {
                this.hideMobileNav();
            } else {
                this.showMobileNav();
            }
        };
        let del = 250;
        for (let i of BUTTONS) {
            let btn = DomHelper.createBtn(
                {
                    text: i.name,
                    click: () => {
                        if (i.controller) {
                            this.onclick(i.controller);
                        } else {
                            window.open(i.link, "_blank");
                        }
                    }
                });
            let mBtn = DomHelper.createBtn(
                {
                    text: i.name,
                    click: () => {
                        if (i.controller) {
                            this.onclick(i.controller);
                        } else {
                            window.open(i.link, "_blank");
                        }
                        this.hideMobileNav();
                    }
                });
            btn.controller = i.controller;
            mBtn.controller = i.controller;
            this.nav.appendChild(btn);
            this.mobileNav.appendChild(mBtn);
            AnimationHelper.genericAnimations.fadeOutUp(btn);
            AnimationHelper.applyAnimation(btn, {delay: del, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
            del += 250;
            this.buttons.push(btn);
        }
    };

    window.Managers.NavManager = NavManager;
})();