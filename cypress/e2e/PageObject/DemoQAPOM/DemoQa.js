class DemoQA{

    navigate(){
        cy.visit('https://demoqa.com/')
        cy.title().should('eq', 'DEMOQA')
    }

    acessButtonCard(cardName){
        cy.get('#app div.home-body div div')
        .contains(cardName)
        .should('be.visible').click().wait(1000)
    }

    acessLeftPanel(panelName){
        cy.get('ul li span')
        .contains(panelName)
        .should('be.visible').click().wait(1000)
    }
}
    export default DemoQA