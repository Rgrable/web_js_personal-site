function DomHelper() {}

DomHelper.createElement = function(type, options) {
    options = options || {};
    let d = document.createElement(type);
    if (options.class) {
        if (options.class instanceof Array) {
            for (let i of options.class) {
                d.classList.add(i);
            }
        } else {
            d.classList.add(options.class);
        }
    }

    if (options.text) {
        d.innerText = options.text;
    }

    if (options.html) {
        d.innerHTML = options.html;
    }

    if (options.href) {
        d.href = options.href;
    }

    if (options.src) {
        d.src = options.src;
    }

    if (options.click) {
        d.onclick = options.click;
    }

    if (options.style) {
        for (let o of Object.keys(options.style)) {
            d.style[o] = options.style[o];
        }
    }
    return d;
};

DomHelper.createResizeEvent = function (el, event) {
    let sizeY = el.offsetHeight;
    let listener = setInterval(() => {
        if (sizeY !== el.offsetHeight) {
            sizeY = el.offsetHeight;
            event(sizeY);
        }
    }, 200);
    return listener;
};

DomHelper.createDiv = function(options) {
    return this.createElement('div', options);
};

DomHelper.createH1 = function (options) {
    return this.createElement('h1', options);
};

DomHelper.createImg = function(options) {
    return this.createElement('img', options);
};

DomHelper.createBtn = function (options) {
    return this.createElement('button', options);
};

DomHelper.createP = function(options) {
    return this.createElement('p', options);
};

DomHelper.createA = function (options) {
    return this.createElement('a', options);
};