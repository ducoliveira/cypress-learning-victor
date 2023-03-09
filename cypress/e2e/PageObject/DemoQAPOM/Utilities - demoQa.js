class UtilitiesDemoQA{

    // Upload selected imageFile on the input
    uploadPicture(imageFile){
        cy.get('input[type=file]').selectFile(imageFile).wait(2000)
    }

    // Click on the selected locator
    clickOnLocator(locator){
        cy.get(locator).click()
    }
}
    export default UtilitiesDemoQA