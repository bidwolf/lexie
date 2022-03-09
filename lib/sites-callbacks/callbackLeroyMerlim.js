const Product = require('../Classes/Product');
exports.getProductList = async function(page, marketPlace) {
    async function getProductNames(nodelistNamesSelector) {
        return await page.$$eval(nodelistNamesSelector,
            product => product.map(products => products.textContent));

    }

    async function getProductLinks(nodelistLinksSelector) {
        return await page.$$eval(nodelistLinksSelector,
            product => product.map(product => product.src));
    }
    async function getProductPrices(nodelistPricesSelector) {
        return await page.$$eval(nodelistPricesSelector,
            product => product.map(product => product.innerText));
    }
    async function getProducts() {

        let arr = [];
        arr.push(await getProductNames(marketPlace.nodeSelectorName));
        arr.push(await getProductLinks(marketPlace.nodeSelectorPath));
        arr.push(await getProductPrices(marketPlace.nodeSelectorPrice));
        let result = [];
        for (index = 0; index < arr[0].length; index++) {
            result.push(new Product(arr[0][index], arr[1][index], arr[2][index]));
        }
        return result;
    }
    async function getNewPage(nextButtonHandler) {

        page.$eval(nextButtonHandler, button => button.click());
    }
    let hasNext;
    let result = [];
    do {
        await page.waitForTimeout(2000);
        result = result.concat(await getProducts());
        console.log(result.length);
        hasNext = await page.$(marketPlace.loadButtonContent);
        if (hasNext)
            await getNewPage(marketPlace.loadButtonContent);
        await page.waitForTimeout(2000);
    } while (hasNext);

    return result;
};