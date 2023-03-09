class TableDemoQA{

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
    export default TableDemoQA