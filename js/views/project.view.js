const ProjectView = {
    main: () => {
        let title = DomHelper.createH1({text: "Projects", class: "title"});
        AnimationHelper.genericAnimations.fadeOutLeft(title);
        AnimationHelper.applyAnimation(title, {anim: AnimationHelper.genericAnimations.fadeIn, length: 0.5});
        return title;
    },
    job: (data) => {
        let cont = DomHelper.createDiv({style: {marginTop: "40px"}});
        let desc = DomHelper.createP({text: data.description});
        let name = DomHelper.createA({html: `<h2>${data.name}</h2>`, href: data.link, target: "_blank"});
        let timeline = DomHelper.createP({html: `<strong>${data.timeline || ""}</strong>`});
        let projects = DomHelper.createDiv({style: {padding: "10px", textAlign: "center"}});

        AnimationHelper.genericAnimations.fadeOutLeft(cont);
        cont.appendChild(name);
        cont.appendChild(timeline);
        cont.appendChild(desc);
        cont.appendChild(projects);
        AnimationHelper.applyAnimation(cont, {delay: data.delay, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25});
        return {
            job: cont,
            projects: projects
        };
    },
    project: (data, onclick) => {
        let opt = {
            title: data.name,
            description: data.description,
            experience: data.experience,
            icon: data.icon,
            link: data.link,
            boxColor: data.boxColor,
            fontColor: data.fontColor,
            role: data.role,
            team: data.team,
            length: data.length,
            languages: data.languages,
            tech: data.tech
        };

        let imgCont = DomHelper.createDiv({class: "img-container", title: data.name, click: () => {
            onclick(opt);
        }});
        AnimationHelper.genericAnimations.fadeOutUp(imgCont);
        let img = DomHelper.createImg({src: data.icon, style: {transform: "translate(-50%, -50%)", position: "absolute", left: "50%", top: "50%"}});
        imgCont.appendChild(img);
        AnimationHelper.applyAnimation(imgCont, {delay: data.delay, anim: AnimationHelper.genericAnimations.fadeIn, length: 0.25, onfinished: () => {
            AnimationHelper.clearAnimation(imgCont);
        }});
        return imgCont;
    }
};