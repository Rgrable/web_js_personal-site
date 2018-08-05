if (!window.Managers) {
    window.Managers = {};
}

(function () {
    function NavManager() {
        this.nav = document.getElementById('nav');
        this.setEvents();
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

    window.Managers.NavManager = new NavManager();
})();