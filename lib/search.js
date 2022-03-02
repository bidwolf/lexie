const puppeteer = require('puppeteer');

exports.searchProduct = async(productName, marketPlace) => {
    async function deleteInputValue(handleInput, inputValue) {
        let inputJsonValue = inputValue;
        do {
            await handleInput.press('Delete');
            inputJsonValue = JSON.parse(JSON.stringify(await handleInput.jsonValue()))._value;

        } while (inputJsonValue != '');
    }
    // instanciando o navegador

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 10
    });

    //Acessando página
    const page = await browser.newPage();
    await page.goto(marketPlace.link, { 'waitUntil': 'networkidle2', 'timeout': 30000 });

    //Iniciando processo de pesquisa

    const handleButton = await page.$(marketPlace.searchHandleInput);

    await handleButton.click()
        .then(() => console.log(`EM: ${productName}\n ------------------------\nBotão Encontrado`));

    const handleInput = await page.$(marketPlace.handleInputSelector);

    await handleInput.type(productName, { delay: 300 })
        .then(() => console.log(`EM: ${productName}\n ------------------------\n Produto inserido`));

    let inputJsonValue = JSON.parse(JSON.stringify(await handleInput.jsonValue()))._value;

    //Checar se o Valor Inserido Confere com o nome do produto

    if (inputJsonValue != productName) {
        await deleteInputValue(handleInput, inputJsonValue);
        await handleInput.type(productName, { delay: 300 });
    } else console.log(`EM: ${productName}\n ------------------------\nEntrada VÁLIDA`);

    //Iniciando pesquisa

    await handleInput.press('Enter', { delay: 3000 })
        .then(() => console.log(`EM: ${productName}\n ------------------------\nIniciando pesquisa`));

    const notFoundSearchHandle = await page.$$(marketPlace.notFoundSearchSelector);

    let productList = [];

    //verifica se o resultado da pesquisa obteve algum resultado

    if (notFoundSearchHandle.length == 0) {

        await page.waitForSelector(marketPlace.loadButtonSelector, { 'visible': true }) //espera o botão de carregamento aparecer
            .then(() => console.log(`EM: ${productName}\n ------------------------\nCarregando Produtos`), () => console.log(`EM: ${productName}\n ------------------------\nBotão não encontrado`));

        productList = Array.from(await marketPlace.getProductList(page)); //captura a lista de produtos de acordo com a função de callback configurada

        await page.close().then(() => console.log(`EM: ${productName}\n ------------------------\nPagina fechada`),
            (err) => console.error(err));
        await browser.close().then(() => console.log(`EM: ${productName}\n ------------------------\nNavegador fechado`),
            (err) => console.error(err));

    } else {
        await page.close().then(() => console.log(`EM: ${productName}\n ------------------------\nPagina fechada : Nenhum resultado encontrado`),
            (err) => console.error(err));
        await browser.close().then(() => console.log(`EM: ${productName}\n ------------------------\nNavegador fechado`),
            (err) => console.error(err));

    }
    return productList;
};
exports.searchList = async(productList, marketPlace) => {

    for (let index = 0; index < productList.length; index++) {

        let products = Array.from(await this.searchProduct(productList[index].name, marketPlace));
        for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {

            console.log(products[indexProduct].name);

            console.log(products[indexProduct].price);

            console.log(products[indexProduct].path);
        }
    }
};
exports.searchMarkets = async(productName, marketPlaces) => {
    for (let index = 0; index < marketPlaces.length; index++) {
        let products = Array.from(await this.searchProduct(productName, marketPlaces[index]));
        console.log("A Pesquisa de preços feita no Site: " + marketPlaces.siteName + " Retornou:");
        for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {

            console.log(products[indexProduct].name);

            console.log(products[indexProduct].price);

            console.log(products[indexProduct].path);
        }

    }
};