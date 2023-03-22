class UtilitiesDemoQA{

    // Acess DemoQA website and assert title
    navigate(page){
        cy.visit(page)
    }

    // Select a card to acess
    acessButtonCard(cardName){
        cy.get('#app div.home-body div div')
        .contains(cardName)
        .should('be.visible').click().wait(1000)
    }

    // Select a panel to acess
    acessLeftPanel(panelName){
        cy.get('ul li span')
        .contains(panelName)
        .should('be.visible').click().wait(1000)
    }

    // Upload selected imageFile on the input
    uploadPicture(imageFile){
        cy.get('input[type=file]').selectFile(imageFile).wait(2000)
    }

    // Click on the selected locator
    clickOnLocator(locator){
        cy.get(locator).click()
    }

    waitProgressBar(targetValue){
        for(var i = 0; i <= 100; i = i+10){
            cy.get('#progressBar > div').should('have.attr', 'aria-valuenow', i)
            if(i == targetValue){i = 100}
        }
    }
}
    export default UtilitiesDemoQA