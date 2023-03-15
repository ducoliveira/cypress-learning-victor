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
}
    export default BookAppDemoQA