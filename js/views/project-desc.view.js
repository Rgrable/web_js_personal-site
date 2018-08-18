const ProjectDescriptionView = {
    main: (data) => {
        let cont = DomHelper.createDiv();
        let img = DomHelper.createImg({src: data.icon, style: {display: "block", marginBottom: "20px"}});
        let title = DomHelper.createA({class: "title", text: `[${data.title}]`, href: data.link, target: "_blank"});
        let desciption = DomHelper.createP({html: `<strong>Description:</strong><br>${data.description || "N/A"}`});
        let exp = DomHelper.createP({html: `<strong>Experience:</strong><br>${data.experience || "N/A"}`});
        let role = DomHelper.createP({html: `<strong>Role:</strong><br>${data.role || "N/A"}`});
        let team = DomHelper.createP({html: `<strong>Team Size:</strong><br>${data.team || "N/A"}`});
        let length = DomHelper.createP({html: `<strong>Length:</strong><br>${data.length || "N/A"}`});
        let languages = DomHelper.createDiv({html: `<strong>Languages Used:</strong><br>`});
        for (let i of data.languages) {
            let l = DomHelper.createImg({class: "icon", src: AssetHelper.instance.getAsset(i)});
            languages.appendChild(l);
        }
        let tech = DomHelper.createDiv({html: `<strong>Technology Used:</strong><br>`});
        for (let i of data.tech) {
            let t = DomHelper.createImg({class: "icon", src: AssetHelper.instance.getAsset(i)});
            tech.appendChild(t);
        }
        AnimationHelper.genericAnimations.fadeOutLeft(cont);
        cont.appendChild(img);
        cont.appendChild(title);
        cont.appendChild(desciption);
        cont.appendChild(exp);
        cont.appendChild(role);
        cont.appendChild(team);
        cont.appendChild(length);
        cont.appendChild(languages);
        cont.appendChild(tech);
        AnimationHelper.applyAnimation(cont, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
        return cont;
    }
};