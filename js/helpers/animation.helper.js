function AnimationHelper() {}

/***
 * applies an animation to a DOM element
 * @param id
 * @param options : {delay,anim,onfinished,onstart,length} || null
 */
AnimationHelper.applyAnimation = function (id, options) {
    options = options || {};
    let d = document.getElementById(id);
    if (d) {
        setTimeout(() => {
            d.classList.add(options.anim);
            if (options.onstart) {
                options.onstart();
            }
            setTimeout(() => {
                if (options.onfinished) {
                    options.onfinished();
                }
            }, options.length || 0);
        }, options.delay || 0);
    }
};


AnimationHelper.injectAnimation = function (id, anim) {
    let d = document.getElementById(id);
    if (d) {
        anim(d);
    }
};