class ListDemoQA{

    // Search for line that contains the text on the list and return it
    getListByText(locator, repeatableElement, text){
        return cy.get(locator).contains(repeatableElement, text)
    }
    
    // Search for line in a position on the list and return it
    getListByPosition(locator, repeatableElement, position){
        return cy.get(locator).find(repeatableElement).eq(position - 1)
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

}
    export default ListDemoQA