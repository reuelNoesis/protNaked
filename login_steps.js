'use strict';

const config = require('../../files/conf.json')
const { Given, When, Then } = require('cucumber')

const Dsl = require('../../page_objects/dsl')
const Common = require('../../page_objects/common_po')

const solicitante = config.userSolicitante.user
const password = config.userSolicitante.password
const prot = require('protractor')

const dsl = new Dsl()
const common = new Common()

Given('que acesso a pagina de parcerias', async () => {
    await common.openUrl()
});

When('me logo como SOLICITANTE', async () => {
    await common.loginSolicitante(solicitante, password)
});

Then('devo visualizar a lista de pedidos', () =>{
    let listaPedidos = prot.element(common.verificacaoSolicitanteListaPedidos).getText
    console.log("LISTA: ",listaPedidos.getText)
})