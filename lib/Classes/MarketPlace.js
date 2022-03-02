const { trace } = require("console");

class MarketPlace {
    constructor(
        name,
        link,
        handleInputSelector,
        notFoundSearchSelector,
        loadButtonSelector,
        loadButtonContent,
        nodeSelectorName,
        nodeSelectorPrice,
        nodeSelectorPath,
        searchHandleInput


    ) {
        this.name = name;
        this.link = link;
        this.handleInputSelector = handleInputSelector;
        this.notFoundSearchSelector = notFoundSearchSelector;
        this.loadButtonSelector = loadButtonSelector;
        this.loadButtonContent = loadButtonContent;
        this.nodeSelectorName = nodeSelectorName;
        this.nodeSelectorPrice = nodeSelectorPrice;
        this.nodeSelectorPath = nodeSelectorPath;
        this.searchHandleInput = searchHandleInput || 'i.search';
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
            jsonObject.nodeSelectorPath
        );
        return marketPlace;
    }
    setContentSearch(callbackFunction) {
        this.getProductList = callbackFunction;
    }

}