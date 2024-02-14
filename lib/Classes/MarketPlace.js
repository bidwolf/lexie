module.exports = class MarketPlace {



    constructor(args) {
        args = [...arguments];
        this.siteName = args.siteName || args[0];
        this.link = args.link || args[1];
        this.handleInputSelector = args.handleInputSelector || args[2];
        this.notFoundSearchSelector = args.notFoundSearchSelector || args[3];
        this.loadButtonSelector = args.loadButtonSelector || args[4];
        this.loadButtonContent = args.loadButtonContent || args[5];
        this.nodeSelectorName = args.nodeSelectorName || args[6];
        this.nodeSelectorPrice = args.nodeSelectorPrice || args[7];
        this.nodeSelectorPath = args.nodeSelectorPath || args[8];
        this.searchHandleInput = args.searchHandleInput || args[9] || 'i.search';
        this.getProductList = args.getProductList || args[10];
    }

    JSONToMarketPlace(jsonObject) {
        let marketPlace = new MarketPlace(
            jsonObject.name,
            jsonObject.link,
            jsonObject.handleInputSelector,
            jsonObject.notFoundSearchSelector,
            jsonObject.loadButtonSelector,
            jsonObject.loadButtonContent,
            jsonObject.nodeSelectorName,
            jsonObject.nodeSelectorPrice,
            jsonObject.nodeSelectorPath,
            jsonObject.searchHandleInput,

        );
        return marketPlace;
    }
    setContentSearch(callbackFunction) {
        this.getProductList = callbackFunction;
    }

};