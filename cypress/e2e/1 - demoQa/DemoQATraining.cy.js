/// <reference types="cypress" />

import FormsDemoQA from "../PageObject/DemoQAPOM/Forms - demoQa";
import ListDemoQA from "../PageObject/DemoQAPOM/List - demoQa";
import LoadsDemoQA from "../PageObject/DemoQAPOM/Loads - demoQa";
import TableDemoQA from "../PageObject/DemoQAPOM/Table - demoQa";
import UtilitiesDemoQA from "../PageObject/DemoQAPOM/Utilities - demoQa";

describe('DemoQA Tools', () => {
  const utilitiesDemoQA = new UtilitiesDemoQA();
  const formsDemoQA = new FormsDemoQA();
  const listDemoQA = new ListDemoQA();
  const tableDemoQA = new TableDemoQA();
  const loadsDemoQA = new LoadsDemoQA();

  Cypress.on('uncaught:exception', (e, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    // console.log("error", e);
    console.log("error", e);
    console.log("runnable", runnable);
    return false
  })

  // Acess DemoQA website for test
  beforeEach('settings', () => {
    utilitiesDemoQA.navigate();
  })

  // Empty the directory after tests
  afterEach(() => {
    cy.fixture('loadfile').then((loadfile) => {
      // Data
      const downloadsPath = loadfile.downloadsPath
      const allFiles = loadfile.allFiles

      loadsDemoQA.emptyDownloadDir(downloadsPath, allFiles)
    })
  })

  it('Registration Form', () => {
    cy.fixture('userRegister').then((userRegister) => {
      // Data
      const FirstName = userRegister.FirstName
      const LastName = userRegister.LastName
      const UserEmail = userRegister.UserEmail
      const Gender = userRegister.Gender
      const Phone = userRegister.Phone
      const dayDOB = userRegister.dayDOB
      const monthDOB = userRegister.monthDOB
      const yearDOB = userRegister.yearDOB
      const Subject1 = userRegister.Subject1
      const Hobbie1 = userRegister.Hobbie1
      const imageTest = userRegister.imageTest
      const Address = userRegister.Address
      const State = userRegister.State
      const City = userRegister.City

      utilitiesDemoQA.acessButtonCard("Forms")
      utilitiesDemoQA.acessLeftPanel("Practice Form")
      formsDemoQA.fillFirstName(FirstName)
      formsDemoQA.fillLastName(LastName)
      formsDemoQA.filluserEmail(UserEmail)
      formsDemoQA.fillGender(Gender)
      formsDemoQA.fillPhone(Phone)
      formsDemoQA.fillBirthday(dayDOB, monthDOB, yearDOB)
      formsDemoQA.fillSubjects(Subject1)
      formsDemoQA.fillHobbies(Hobbie1)
      utilitiesDemoQA.uploadPicture(imageTest)
      formsDemoQA.fillAddress(Address)
      formsDemoQA.fillStateAndCity(State, City)
      formsDemoQA.submitForm()
    })
  })

  it('Iteractions Form List via Text', () => {
    cy.fixture('list').then((list) => {
      // Data
      const listLocator = list.listLocator;
      const repeatableElement = list.repeatableElement;
      const listContent = list.listContent;

      utilitiesDemoQA.acessButtonCard("Interactions")
      utilitiesDemoQA.acessLeftPanel("Selectable")
      listDemoQA.clickOnByText(listLocator, 
        repeatableElement, listContent)
    })
  })

  it('Iteractions Form via List Position', () => {
    cy.fixture('list').then((list) => {
      // Data
      const listLocator = list.listLocator;
      const repeatableElement = list.repeatableElement;
      const listPosition = list.listPosition;

      utilitiesDemoQA.acessButtonCard("Interactions")
      utilitiesDemoQA.acessLeftPanel("Selectable")
      listDemoQA.clickOnByPosition(listLocator, 
        repeatableElement, listPosition)
    })
  })

  it('Interactions Form via Grid Text', () => {
    cy.fixture('grid').then((grid) => {
      // Data
      const gridLocator = grid.gridLocator
      const tableLocator = grid.tableLocator
      const rowLocator = grid.rowLocator
      const rowElementLocator = grid.rowElementLocator
      const wantedData = grid.wantedData
      const position = grid.position

      utilitiesDemoQA.acessButtonCard("Interactions")
      utilitiesDemoQA.acessLeftPanel("Selectable")
      utilitiesDemoQA.clickOnLocator(gridLocator)
      tableDemoQA.clickOnTable(tableLocator, rowLocator, rowElementLocator, position, wantedData)
    })
  })

  it('WebTables', () => {
    cy.fixture('webtable').then((webtable) => {
      // Data
      const tableLocator = webtable.tableLocator
      const rowLocator = webtable.rowLocator
      const rowElementLocator = webtable.rowElementLocator
      const wantedData = webtable.wantedData
      const position = webtable.position

      utilitiesDemoQA.acessButtonCard("Elements")
      utilitiesDemoQA.acessLeftPanel("Web Tables")
      tableDemoQA.clickOnTable(tableLocator, rowLocator, rowElementLocator, position, wantedData)
    })
  })

  it('Download SampleFile', () => {
    cy.fixture('loadfile').then((loadfile) => {
      // Data
      const downloadButton = loadfile.downloadButton
      const downloadsPath = loadfile.downloadsPath
      const downloadedFile = loadfile.downloadedFile
      const downloadedFilePath = downloadsPath+downloadedFile

      utilitiesDemoQA.acessButtonCard("Elements")
      utilitiesDemoQA.acessLeftPanel("Upload and Download")
      loadsDemoQA.downloadFile(downloadButton, downloadedFilePath)
    })
  })

  it('Creating and Editing a file', () => {
    cy.fixture('loadfile').then((loadfile) => {
      // Data
      const downloadsPath = loadfile.downloadsPath
      const createdFile = loadfile.txtTest
      const createdFilePath = downloadsPath+createdFile

      loadsDemoQA.writeFile(createdFilePath, 'Test passed!')
    })
  })

  // Not a good validation, should be optimized
  it('Upload file', () =>{
    cy.fixture('loadfile').then((loadfile) => {
      // Data
      const imageTest = loadfile.imageTest

      utilitiesDemoQA.acessButtonCard("Elements")
      utilitiesDemoQA.acessLeftPanel("Upload and Download")
      utilitiesDemoQA.uploadPicture(imageTest)
      cy.get('#uploadedFilePath').should('be.visible')
    })
  })
})
