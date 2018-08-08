const HomeView = {
    main: (container) => {
        let header = DomHelper.createDiv();
        let title = DomHelper.createH1({text: "Home", class: "title"});
        let img = DomHelper.createImg({src: 'https://storage.googleapis.com/richardgrable-com/header.jpg', class: "header"});
        AnimationHelper.genericAnimations.fadeOutLeft(title);
        AnimationHelper.genericAnimations.fadeOutUp(img);
        header.appendChild(img);
        header.appendChild(title);
        container.appendChild(header);
        AnimationHelper.applyAnimation(title, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.65});
        AnimationHelper.applyAnimation(img, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.5});
    },
    blogCard: (container) => {

    }
};

const HomeAnimations = {

};