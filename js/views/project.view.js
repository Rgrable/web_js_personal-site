const ProjectView = {
    main: () => {

    },
    job: (data) => {
        let cont = DomHelper.createDiv();
        let name = DomHelper.createP({text: data.name});
        let projects = DomHelper.createDiv();

        cont.appendChild(name);
        cont.appendChild(projects);
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
            link: data.link
        };

        let imgCont = DomHelper.createDiv({style: {display: "inline-block", overflow: "hidden", borderRadius: "5px", width: "100px", height: "100px", position: "relative"}, click: () => {
            onclick(opt);
        }});
        let img = DomHelper.createImg({src: data.icon, style: {transform: "translate(-50%, -50%)", position: "absolute", left: "50%", top: "50%"}});
        imgCont.appendChild(img);

        return imgCont;
    }
};