(function () {

    const DEF_HEIGHT = "3px";
    const DEF_COLOR = "#FFFFFF";
    const SPEED = 0.1;

    function createSlider(options) {
        options = options || {};
        let d = document.createElement("div");
        d.style.height = options.height || DEF_HEIGHT;
        d.style.backgroundColor = options.color || DEF_COLOR;
        d.style.position = "absolute";
        d.style.bottom = "0";
        d.style.zIndex = "100";
        d.style.willChange = "width, left";

        return d;
    }

    function getPosInRoot(root, item, pos) {
        pos = pos || 'left';
        let r = root.getBoundingClientRect();
        let i = item.getBoundingClientRect();
        return i[pos] - r[pos];
    }

    function MaterialSlider() {
        this.root = null;
        this.rootSize = {};
        this.slider = null;
        this.sliderPos = {left: 0, width: 0};
        this.buttons = [];
        this.snap = null;
    }

    MaterialSlider.prototype.setRoot = function (rootContainer) {
        this.root = rootContainer;
        this.root.style.position = "relative";
        this.rootSize.width = this.root.width;
        this.rootSize.height = this.root.height;
        return this;
    };

    MaterialSlider.prototype.addButton = function (button) {
        let self = this;
        button.onclick = function () {
            self.move(button);
        };
        this.buttons.push(button);
        return this;
    };

    MaterialSlider.prototype.build = function(options) {
        this.slider = createSlider(options);
        this.root.appendChild(this.slider);
        window.requestAnimationFrame(() => {this.update()});
        return this;
    };

    MaterialSlider.prototype.move = function(button) {
        let left = getPosInRoot(this.root, button, 'left');
        let sli = getPosInRoot(this.root, this.slider, 'left');
        let width = button.offsetWidth;
        this.sliderPos.left = Math.floor(left);
        this.sliderPos.width = Math.ceil(width);
    };

    MaterialSlider.prototype.show = function() {
        this.slider.style.display = 'block';
    };

    MaterialSlider.prototype.hide = function() {
        this.slider.style.display = 'none';
    };

    MaterialSlider.prototype.update = function () {
        let curLeft = getPosInRoot(this.root, this.slider, 'left');
        let nextLeft = this.sliderPos.left;
        let width = this.sliderPos.width;
        if (curLeft < nextLeft) {
            this.slider.style.left = (curLeft + ((nextLeft - curLeft) * SPEED)) + "px";
        } else if (curLeft > nextLeft) {
            this.slider.style.left = (curLeft - ((curLeft - nextLeft) * SPEED)) + "px";
        } else {
            this.slider.style.left = nextLeft + "px";
        }
        this.slider.style.width = width + "px";

        window.requestAnimationFrame(() => {this.update()});
    };

    window.MaterialSlider = MaterialSlider;

})();