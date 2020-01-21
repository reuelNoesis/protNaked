const expect = require('chai').use(require('chai-as-promised')).expect
const Dsl = require('../page_objects/dsl')

const dsl = new Dsl()

class CommonPage{
    constructor() {
        this.titleEntrar = dsl.webElement("xpath","/div[contains(text(),'Entrar')]")
        this.inputEmailUser = dsl.webElement('name','loginfmt')
        this.btnAvancar = dsl.webElement('id','idSIButton9')
        this.inputPassUser = dsl.webElement('name', 'passwd')
        this.verificacaoSolicitanteListaPedidos = dsl.webElement("xpath", "//*[@id='pagination']/div[1]/div")
    }

    openUrl() {
        return dsl.openUrl('https://parceriacomercial-dev.entretenimento.tvglobo.com.br/auth')
    }
    
    loginSolicitante(user, pass){
        this.titleEntrar.isPresent().then((result) => {
            if(!result) {
                dsl.sendKeys(this.inputEmailUser, user, 'Não encontrei o elemento de Login: User')
                this.btnAvancar.click()
                dsl.sendKeys(this.inputPassUser, pass, 'Não encontrei o elemento de Login: Password')
                this.btnAvancar.click()
                dsl.sleep(2000)
                this.btnAvancar.click()
            }
        });
        return dsl.waitVisibilityOf(this.verificacaoSolicitanteListaPedidos, 5000)
    }
}



module.exports = CommonPage