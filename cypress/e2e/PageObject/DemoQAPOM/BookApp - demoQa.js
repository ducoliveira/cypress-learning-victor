import TableDemoQA from "./Table - demoQa"

const tableDemoQA = new TableDemoQA();

class BookAppDemoQA{

    // Acess DemoQA website and assert title
    login(username, password){
        cy.get('#login').click()
        cy.get('#userName').type(username)
        cy.get('#password').type(password)
        cy.get('#login').click()
        this.assertLogin(username)
    }

    assertLogin(username){
        cy.get('#userName-value').contains(username)
    }

    logout(username){
        this.assertLogin(username)
        cy.get('#submit').click();
    }

    searchBook(tableLocator, rowLocator, rowElementLocator, position, title){
        cy.get('#searchBox').type(title)
        return tableDemoQA.assertTableText(tableLocator, rowLocator, rowElementLocator, position, title)
    }

    addBookToProfile(tableLocator, rowLocator, rowElementLocator, position, title){
        this.searchBook(tableLocator, rowLocator, rowElementLocator, position, title).click()
        cy.get('.text-right > #addNewRecordButton').click({ force: true })
        //cy.on('window:alert',function (AlertText){expect(AlertText).eql('Book added to your collection.')}).wait(1000)
    }

    deleteBookFromProfile(tableLocator, rowLocator, rowElementLocator, positionBook1, title, positionDelete){
        this.searchBook(tableLocator, rowLocator, rowElementLocator, positionBook1, title)
        tableDemoQA.findColumn(tableLocator, rowLocator, rowElementLocator, positionDelete, title)
        .find('#delete-record-undefined').click()
        this.deleteBookPopup().find('#closeSmallModal-ok').click().wait(1000)
    }

    deleteBookPopup(){
        return cy.get('.modal-body').contains("Do you want to delete this book?").parent()
    }

    deleteAllBooksPopup(){
        return cy.get('.modal-body').contains("Do you want to delete all books?").parent()
    }

    deleteAllBooksFromProfile(){
        cy.get('.text-right.button > #submit').click({ force: true }).wait(1000)
        this.deleteAllBooksPopup().find('#closeSmallModal-ok').click().wait(1000)
        //cy.on('window:alert',function (AlertText){expect(AlertText).eql('All Books deleted.')}).wait(1000)
    }

    assertNoItemFound(){
        cy.get('.rt-noData').should('be.visible')
    }
}
    export default BookAppDemoQA