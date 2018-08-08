function AnimationHelper() {}

/***
 * applies an animation to a DOM element
 * @param el
 * @param options : {delay,anim,length,[onfinished],[onstart]}
 */
AnimationHelper.applyAnimation = function (el, options) {
    options = options || {};
    setTimeout(() => {
        if (options.onstart) {
            options.onstart();
        }
        setTimeout(() => {
            if (options.onfinished) {
                options.onfinished();
            }
        }, options.anim(el, options.length));
    }, options.delay || 0);
};

AnimationHelper.genericAnimations = {
    fadeOutUp: (el, t, opt) => {
        t = t || 0.25;
        opt = opt || {};
        opt.y = opt.y || "-40px";
        el.style.position = "relative";
        el.style.willChange = 'transform, opacity';
        el.style.opacity = '0';
        el.style.transform = `translateY(${opt.y})`;
        el.style.transition = `transform ease-in-out ${t}s, opacity ease-in-out ${t}s`;
        return t * 1000;
    },
    fadeOutLeft: (el, t, opt) => {
        t = t || 0.25;
        opt = opt || {};
        opt.x = opt.x || "-40px";
        el.style.position = "relative";
        el.style.willChange = 'transform, opacity';
        el.style.opacity = '0';
        el.style.transform = `translateX(${opt.x})`;
        el.style.transition = `transform ease-in-out ${t}s, opacity ease-in-out ${t}s`;
        return t * 1000;
    },
    fadeOutRight: (el, t, opt) => {
        t = t || 0.25;
        opt = opt || {};
        opt.x = opt.x || "-40px";
        el.style.position = "relative";
        el.style.willChange = 'transform, opacity';
        el.style.opacity = '0';
        el.style.transform = `translateX(${opt.x})`;
        el.style.transition = `transform ease-in-out ${t}s, opacity ease-in-out ${t}s`;
        return t * 1000;
    },
    fadeOutDown: (el, t, opt) => {
        t = t || 0.25;
        opt = opt || {};
        opt.y = opt.y || "40px";
        el.style.position = "relative";
        el.style.willChange = 'transform, opacity';
        el.style.opacity = '0';
        el.style.transform = `translateY(${opt.y})`;
        el.style.transition = `transform ease-in-out ${t}s, opacity ease-in-out ${t}s`;
        return t * 1000;
    },
    fadeIn: (el, t, opt) => {
        t = t || 0.25;
        opt = opt || {};
        opt.y = opt.y || "0";
        el.style.position = "relative";
        el.style.willChange = 'transform, opacity';
        el.style.opacity = '1';
        el.style.transform = `none`;
        el.style.transition = `transform ease-in-out ${t}s, opacity ease-in-out ${t}s`;
        return t * 1000;
    }
};