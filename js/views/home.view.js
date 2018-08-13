const HomeView = {
    main: () => {
        let header = DomHelper.createDiv();
        let title = DomHelper.createH1({text: "Home", class: "title"});
        let img = DomHelper.createImg({src: 'https://storage.googleapis.com/richardgrable-com/header.jpg', class: "header"});
        AnimationHelper.genericAnimations.fadeOutLeft(title);
        AnimationHelper.genericAnimations.fadeOutUp(img);
        header.appendChild(img);
        header.appendChild(title);
        AnimationHelper.applyAnimation(title, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.65});
        AnimationHelper.applyAnimation(img, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.5});
        return header;
    },
    blogCard: (data) => {
        let card = DomHelper.createDiv({class: "blog-card"});
        let title = DomHelper.createH1({text: data.title});
        let time = DomHelper.createP({text: data.timestamp});
        let a = DomHelper.createA({text: "[Read More]", href: "#", click: () => {
                let req = new XMLHttpRequest();
                req.onreadystatechange = () => {
                    if (req.readyState === 4 && req.status === 200) {
                        let converter = new showdown.Converter(),
                            text = req.responseText,
                            html = converter.makeHtml(text);
                        console.log(text);
                    }
                };
                req.open('get', data.sourceLink);
                req.send();
        }});
        let p = DomHelper.createP({text: data.text});
        card.appendChild(title);
        card.appendChild(time);
        card.appendChild(p);
        card.appendChild(a);
        AnimationHelper.genericAnimations.fadeOutLeft(card);
        AnimationHelper.applyAnimation(card, {delay: data.delay, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
        return card;
    }
};

const HomeAnimations = {

};