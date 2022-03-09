const puppeteer = require('puppeteer');

exports.searchProduct = async(productName, marketPlace) => {

    async function deleteInputValue(handleInput, inputValue) {
        let count = inputValue.length;
        do {
            await handleInput.press('Backspace');
            count--;
        } while (count != 0);
    }
    // instanciando o navegador

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 10
    });

    //Acessando página

    const page = await browser.newPage();

    try {
        await page.goto(marketPlace.link, { 'waitUntil': 'networkidle2', 'timeout': 30000 })
            .then(() => {

                if (page.url() != marketPlace.link && page.url() != marketPlace.link + 'localizacao') throw new Error('Falha no carregamento da página');
                else if (page.url() === marketPlace.link) console.log("Página carregada com sucesso");
                else throw new Error('Requisição de localização detectada');

            });
    } catch (err) {
        if (err.message == 'Requisição de localização detectada') {
            await (await page.$('input#textfield-2')).type('32415436', { delay: 300 }).then(() => {});
            await page.click('[data-cy="confirm-button"]').then(() => console.log("Localização inserida.... Prosseguindo com a pesquisa"));
        } else console.error(err);
    }

    //Iniciando processo de pesquisa
    try {

        await page.waitForSelector(marketPlace.searchHandleInput, { visible: true });
        const handleButton = await page.$(`${marketPlace.searchHandleInput}`);
        await handleButton.click().then(() => console.log(`EM: ${productName}\n ------------------------\nBotão Encontrado`), err => { throw new Error(err); });
    } catch (err) { console.error(err); }
    const handleInput = await page.$(marketPlace.handleInputSelector);

    //Checar se o Valor Inserido Confere com o nome do produto

    try {
        await handleInput.type(productName, { delay: 300 })
            .then(() => {
                console.log(`EM: ${productName}\n ------------------------\nNome do produto Inserido`);

            });
        if (productName == await page.$eval(marketPlace.handleInputSelector, el => el.value)) {
            console.log('Nome do produto ok!');
        } else {
            throw new Error("O produto inserido é diferente do pretendido");
        }

    } catch (err) {
        if (err.message == "O produto inserido é diferente do pretendido") {

            let inputValue = await page.$eval(marketPlace.handleInputSelector, el => el.value);
            console.log(inputValue);
            Promise.all([await deleteInputValue(handleInput, inputValue),
                await handleInput.type(productName)

            ]);
        } else console.error(err);

    }


    //Iniciando pesquisa
    await handleInput.press('Enter', { delay: 30 }).then(() => {
        console.log(`EM: ${productName}\n ------------------------\nIniciando pesquisa`);
    });
    // const notFoundSearchHandle = await page.$$(marketPlace.notFoundSearchSelector) || [0];

    //console.log(notFoundSearchHandle.length);

    let productList = [];

    //verifica se o resultado da pesquisa obteve algum resultado

    //  if (notFoundSearchHandle.length == 0 || notFoundSearchHandle[0] == 0) {
    //  console.log('Resultados encontrados');
    await page.waitForSelector(marketPlace.loadButtonSelector, { 'visible': true }) //espera o botão de carregamento aparecer
        .then(() => console.log(`EM: ${productName}\n ------------------------\nCarregando Produtos`), () => console.log(`EM: ${productName}\n ------------------------\nBotão não encontrado`));
    productList = (await marketPlace.getProductList(page, marketPlace));
    /*
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
          */
    //  }
    console.log("PESQUISA FINALIZADA");
    try {

        await page.close();
    } catch (error) {

    }
    try {
        await browser.close();
    } catch (error) {}
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