if (!window.Services) {
    window.Services = {};
}

(function () {
    function WebService() {

    }

    WebService.prototype.get = function(url) {
        return new Promise(resolve => {
            let req = new XMLHttpRequest();
            req.onload = function () {
                resolve(this.responseText);
            };
            req.open('get', url, true);
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