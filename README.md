# lexie

Este é um projeto para automação de orçamentos em E-commerces de lojas de construção e acabamentos.

O intuito é fazer um *Webscrapping* percorrendo uma lista de e-commerces configurados e efetuando a pesquisa do produto em questão para utilização futura como por exemplo salvar essas informações em um banco de dados ou outros tipos de aplicações.

## Configurando os e-commerces

A configuração dos e-commerces é feita em uma parte separada do repositório(recomenda-se o diretório config para tal), onde deverá constar um arquivo JSON nomeado como config.json.
Eis um exemplo de configuração válida e funcional para um e-commerce chamado Othon de carvalho.

```JSON
{
    "Othon": {
        "name": "Othon de Carvalho",
        "link": "https://www.othondecarvalho.com.br/",
        "handleInputSelector": "input",
        "notFoundSearchSelector": "div.search__empty",
        "loadButtonSelector": "button.btn.btn_carregarMais",
        "loadButtonContent": "CARREGAR MAIS PRODUTOS",
        "nodeSelectorName": "div.product_name-items",
        "nodeSelectorPrice": "h5.best__price",
        "nodeSelectorPath": "div.product_name-items"
    }

}
```

1 . Temos primeiramente o nome pelo qual nos referenciamos ao e-commerce na importação do arquivo de configuração:

```js
//primeira forma de importação

const {Othon} = require('./diretorioDaConfiguração/config.json')
console.log(Othon.name) //Othon de Carvalho

//segunda forma de importação

const config = require('./diretorioDaConfiguração/config.json')
console.log(config.Othon.name) //Othon de Carvalho


```

2 . Em seguida temos propriedades básicas como nome do E-commerce e seu link que são auto-explicativos.

3 . Já `handleInputSelector` é o seletor utilizado para o campo de entrada que efetua a pesquisa dos produtos. Para determinar qual o seletor do e-commerce navegue até o link do e-commerce e clique em inspecionar no parâmetro de entrada da pesquisa.

![exemplo de handleInputSelector](/img/handlerInputSelector.png)

4 . A propriedade `notFoundSearchSelector`se trata do seletor que informa quando não existem produtos cadastrados com o nome pesquisado.

![exemplo de handleInputSelector](/img/notFoundSearchSelector.png)

5 . `loadButtonSelector` e `loadButtonSelectorContent` são respectivamente os seletores dos botões de carregar mais produtos e o texto que vem escrito no botão de carregar mais produtos.

![exemplo de handleInputSelector](/img/handlerInputSelector.png)

6 . `nodeSelectorName`, `nodeSelectorPrice` e `nodeSelectorPath` são os seletores dos nomes, preços e links dos produtos pesquisados.

![exemplo de handleInputSelector](/img/handlerInputSelector.png)
