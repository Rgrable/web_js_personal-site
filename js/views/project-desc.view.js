const ProjectDescriptionView = {
    main: (data) => {
        let cont = DomHelper.createDiv();
        let title = DomHelper.createA({class: "title", text: `[${data.title}]`, href: data.link});
        let desciption = DomHelper.createP({html: `<strong>Description:</strong> ${data.description || "N/A"}`});
        let exp = DomHelper.createP({html: `<strong>Experience:</strong> ${data.experience || "N/A"}`});
        cont.appendChild(title);
        cont.appendChild(desciption);
        cont.appendChild(exp);
        return cont;
    }
};