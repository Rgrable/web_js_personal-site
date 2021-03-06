function AssetHelper() {
    this.assets = {};
    this.fetching = false;
}

AssetHelper.prototype.wait = function() {
    if (!this.fetching && !this.assets) {
        this.fetchAssets(window.Services.WebService);
        this.fetching = true;
    }

    while(this.fetching) {}
    return Promise.resolve();
};

AssetHelper.prototype.fetchAssets = function (webService) {
    return new Promise(resolve => {
        webService.get(`?action=fetchAssets`).then(res => {
            this.assets = {};
            let json = JSON.parse(res);
            for (let r of json.result) {
                this.assets[r.name] = r.src;
            }
            this.fetching = false;
            resolve();
        });
    });
};


AssetHelper.prototype.getAsset = function (name) {
    return this.assets[name] || "";
};


AssetHelper.instance = new AssetHelper();