if (!window.Services) {
    window.Services = {};
}

(function () {
    const URL = "https://backend.richardgrable.com/";
    const ACCESS = "";
    const CONTROLLER = "web";

    function WebService() {
        this.onBegin = undefined;
        this.onFinish = undefined;
    }

    WebService.prototype.get = function(query) {
        if (!query.startsWith("?")) {
            query = "?" + query;
        }

        query += `&access=${ACCESS}&controller=${CONTROLLER}`;
        return new Promise(resolve => {
            if (this.onBegin) {
                this.onBegin();
            }
            let req = new XMLHttpRequest();
            req.onload = () => {
                if (this.onFinish) {
                    this.onFinish();
                }
                resolve(req.responseText);
            };
            req.open('get', URL + query, true);
            req.send();
        });
    };

    WebService.prototype.setEvents = function(onBegin, onFinish) {
        this.onBegin = onBegin;
        this.onFinish = onFinish;
    };

    WebService.prototype.post = function(url, postData) {
        return new Promise(resolve => {
            if (this.onBegin) {
                this.onBegin();
            }
            let req = new XMLHttpRequest();
            req.onload = () => {
                if (this.onFinish) {
                    this.onFinish();
                }
                resolve(req.responseText);
            };
            req.open('post', url, true);
            req.send(postData);
        });
    };

    window.Services.WebService = new WebService();
})();