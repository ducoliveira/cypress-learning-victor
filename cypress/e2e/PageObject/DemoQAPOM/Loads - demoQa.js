class LoadsDemoQA{

    // Click to download the file
    clickToDownload(button){
        cy.get(button).click()
    }

    // Verify if file exists and is readable
    assertFile(file){
        cy.readFile(file)
    }

    // Proceed to download the file
    downloadFile(button, file){
        this.clickToDownload(button)
        this.assertFile(file);
    }

    // Delet a single file
    deleteDownloadedFile(downloadedFilePath){
        cy.exec('rm ' + downloadedFilePath)
    }

    // Empty a directory
    emptyDownloadDir(downloadsPath, allFiles){
        cy.exec('rm ' + downloadsPath + allFiles, { failOnNonZeroExit: false })
    }

    // Create a file (if doesn't exists) and write on it
    writeFile(file, text){
        cy.writeFile(file, text)
        cy.readFile(file).then((text) =>{
            expect(text).to.equal(text)
          })
    }
}
    export default LoadsDemoQA