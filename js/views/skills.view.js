const SkillsView = {
    main: () => {
        let header = DomHelper.createDiv();
        let title = DomHelper.createH1({text: "Skills", class: "title"});
        AnimationHelper.genericAnimations.fadeOutLeft(title);
        header.appendChild(title);
        AnimationHelper.applyAnimation(title, {delay: 100, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.65});
        return header;
    },
    skillCard: (data) => {
        let card = DomHelper.createDiv({class: "skill-card"});
        let info = DomHelper.createDiv({class: "info"});
        let name = DomHelper.createP({text: data.name, class: 'title'});
        let badge = DomHelper.createImg({class: "badge", src: AssetHelper.instance.getAsset(data.asset)});
        let exp = DomHelper.createImg({src: `http://backend.richardgrable.com/?controller=progress-bar&width=150px&rx=5&height=20px&progress=${data.exp}&bg=444&text=${data.expName}`});
        AnimationHelper.genericAnimations.fadeOutUp(card);
        info.appendChild(name);
        info.appendChild(exp);
        card.appendChild(badge);
        card.appendChild(info);
        AnimationHelper.applyAnimation(card, {delay: data.delay, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onfinished: () => {
            AnimationHelper.clearAnimation(card);
        }});
        return card;
    }
};