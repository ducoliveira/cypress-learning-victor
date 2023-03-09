class UtilitiesDemoQA{
    
    // Upload selected imageFile on the input
    uploadPicture(imageFile){
        cy.get('input[type=file]').selectFile(imageFile).wait(2000)
    }

    // Search for line that contains the text on the list and return it
    getListByText(locator, repeatableElement, text){
        return cy.get(locator).contains(repeatableElement, text)
    }
    
    // Search for line in a position on the list and return it
    getListByPosition(locator, repeatableElement, position){
        return cy.get(locator).find(repeatableElement).eq(position - 1)
    }

    // Click on the selected locator
    clickOnLocator(locator){
        cy.get(locator).click()
    }

    // Click on the selected text
    clickOnByText(locator, repeatableElement, text){
        this.getListByText(locator, repeatableElement, text)
        .click()
    }

    // Click on the selected position
    clickOnByPosition(locator, repeatableElement, position){
        this.getListByPosition(locator, repeatableElement, position)
        .click()
    }

    findRow(locator, element, column, text){
        return cy.get(locator).find(element).contains(column, text).parent()
    }
        
    findColumn(locator, element, column, position, text){
        return this.findRow(locator, element, column, text)
        .find(column).eq(position -1)
    }
        
    assertTableText(locator, element, column, position, text){
        return this.findColumn(locator, element, column, position, text).should('have.text', text)
    }

    clickOnTable(locator, element, column, position, text){
        this.assertTableText(locator, element, column, position, text).click()
    }
}
    export default UtilitiesDemoQA