exports.callback = async(page, marketPlace) => {

    const result = await page.evaluate(() => {
        class Produto {
            constructor(nome, path, preço) {

                this.nome = nome;
                this.path = path;
                this.preço = preço;
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
        const button = document.querySelectorAll('button.btn.btn_carregarMais')[0]; //marketPlace.loadButtonSelector
        let listNames = getProductNames('div.product_name-items'); //marketPlace.nodeSelectorName
        for (let i = 0; i < listNames.length; i++) {
            if (button.innerText == 'CARREGAR MAIS PRODUTOS') { //marketPlace.loadButtonContent
                button.click();
            }
        }
        listNames = getProductNames('div.product_name-items'); //marketPlace.nodeSelectorName
        let listPrices = getProductPrices('h5.best__price'); //marketPlace.nodeSelectorPrice
        let listedLinks = getProductLinks('div.product_name-items'); //marketPlace.nodeSelectorPath
        let productList = [];
        for (let index = 0; index < listNames.length; index++) {
            let nomeProduto = listNames[index];
            let precoProduto = listPrices[index];
            let hiperlinkReference = listedLinks[index];
            let productActual = new Produto(nomeProduto, hiperlinkReference, precoProduto);
            productList[index] = productActual;
        }
        return productList;
    });
    return result;
};