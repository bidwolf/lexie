exports.getProductList = async function(page) {

    const result = await page.evaluate(() => {
        class Produto {
            constructor(name, path, price) {

                this.name = name;
                this.path = path;
                this.price = price;
            }
        }

        function getProductNames(nodelistNamesSelector) {
            const productNameNode = Array.from(document.querySelectorAll(nodelistNamesSelector));
            const productNames = productNameNode.map((product) => product.textContent);

            return productNames;
        }

        function getProductLinks(nodelistNamesSelector) {
            const productNameNode_1 = Array.from(document.querySelectorAll(nodelistNamesSelector));
            const productLinks = productNameNode_1.map((product_1) => product_1.childNodes[2].href);
            return productLinks;
        }

        function getProductPrices(nodelistPricesSelector) {
            const productPriceNode = Array.from(document.querySelectorAll(nodelistPricesSelector));
            const productPrices = productPriceNode.map((product_2) => product_2.innerText);
            return productPrices;
        }

        function loadMoreProducts(LoadButton, loadButtonContent) {
            if (LoadButton.innerText == loadButtonContent) { //marketPlace.loadButtonContent
                LoadButton.click();
            }
        }

        function saveProducts(listNames, listedLinks, listPrices) {
            let productList = [];
            for (let index = 0; index < listNames.length; index++) {
                let nomeProduto = listNames[index];
                let precoProduto = listPrices[index];
                let hiperlinkReference = listedLinks[index];
                productList[index] = new Produto(nomeProduto, hiperlinkReference, precoProduto);
            }
            return productList;
        }
        const loadButton = document.querySelectorAll('button.btn.btn_carregarMais')[0]; //marketPlace.loadButtonSelector
        let listNames = getProductNames('div.product_name-items'); //marketPlace.nodeSelectorName
        for (let i = 0; i < listNames.length; i++) {
            loadMoreProducts(loadButton, 'CARREGAR MAIS PRODUTOS');
        }

        listNames = getProductNames('div.product_name-items'); //marketPlace.nodeSelectorName
        let listPrices = getProductPrices('h5.best__price'); //marketPlace.nodeSelectorPrice
        let listedLinks = getProductLinks('div.product_name-items'); //marketPlace.nodeSelectorPath
        return saveProducts(listNames, listedLinks, listPrices);
    });
    return result;
};