class FormsDemoQA{

    fillFirstName(firstName){
        cy.get('#firstName').type(firstName)
    }

    fillLastName(lastName){
        cy.get('#lastName').type(lastName)
    }

    filluserEmail(userEmail){
        cy.get('#userEmail').type(userEmail)
    }

    fillGender(gender){
        cy.get('input[value=' + gender + ']').check({force:true})
    }

    fillPhone(phoneNumber){
        cy.get('#userNumber').type(phoneNumber)
    }

    fillBirthday(day, month, year){
        // Open the dropdown datepicker
        cy.get('#dateOfBirthInput').click()

        // Select year
        cy.get('.react-datepicker__year-select')
        .select(year).invoke("val").should("eq", year)

        // Select month
        cy.get('.react-datepicker__month-select')
        .select(month)

        // Asserts that the calendar is correctly visible
        cy.get('.react-datepicker__current-month')
        .contains(month + " " + year)
        .should('be.visible')

        // Select day 
        cy.get('[class="react-datepicker__day react-datepicker__day--0'+ day)
        .should('be.visible')
        .click().wait(1000)

        // Close the dropdown datepicker
        cy.get('#dateOfBirthInput').focus().type('{esc}')
    }

    fillSubjects(subject){
        // Add the subject
        cy.get('#subjectsContainer').type(subject + "{enter}")
        // Assert that the subject is selected
        cy.get('#subjectsContainer').contains(subject).should('be.visible')
    }

    fillHobbies(hobbie){
        cy.get('#hobbiesWrapper > div > div > label')
        .contains(hobbie)
        .parent().click().wait(1000)
    }

    fillAddress(address){
        cy.get('#currentAddress').type(address)
    }

    fillStateAndCity(state, city){
        // Add the state
        cy.get('#state').type(state + "{enter}")
        // Assert that the state is selected
        cy.get('#state').contains(state).should('be.visible')
        // Add the city
        cy.get('#city').type(city + "{enter}")
        // Assert that the city is selected
        cy.get('#city').contains(city).should('be.visible')
    }

    submitForm(){
        cy.get('#submit').click({ force : true }).wait(1000)
        cy.get('#example-modal-sizes-title-lg')
        .contains("Thanks for submitting the form")
        .should('be.visible')
    }
}
    export default FormsDemoQA