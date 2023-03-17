class TableDemoQA{

    // Find row that contains the searched cell
    findRow(locator, element, column, text){
        return cy.get(locator).find(element).contains(column, text).parent()
    }
        
    // Find specified column/cell on that row found by findRow
    findColumn(locator, element, column, position, text){
        return this.findRow(locator, element, column, text)
        .find(column).eq(position -1)
    }
    
    // Assert that the found column/cell has the specified value
    assertTableText(locator, element, column, position, text){
        return this.findColumn(locator, element, column, position, text).contains(text)
    }
    
    // Click on that column/cell
    clickOnTable(locator, element, column, position, text){
        this.assertTableText(locator, element, column, position, text).click()
    }
    
}
    export default TableDemoQA