if (!window.Services) {
    window.Services = {};
}

(function () {
    const URL = "https://backend.richardgrable.com/";
    const ACCESS = "";
    const CONTROLLER = "web";

    function WebService() {

    }

    WebService.prototype.get = function(query) {
        if (!query.startsWith("?")) {
            query = "?" + query;
        }

        query += `&access=${ACCESS}&controller=${CONTROLLER}`;
        return new Promise(resolve => {
            let req = new XMLHttpRequest();
            req.onload = function () {
                resolve(this.responseText);
            };
            req.open('get', URL + query, true);
            req.send();
        });
    };


    WebService.prototype.post = function(url, postData) {
        return new Promise(resolve => {
            let req = new XMLHttpRequest();
            req.onload = function () {
                resolve(this.responseText);
            };
            req.open('post', url, true);
            req.send(postData);
        });
    };

    window.Services.WebService = new WebService();
})();