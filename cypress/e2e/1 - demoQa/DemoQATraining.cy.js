/// <reference types="cypress" />

import DemoQA from "../PageObject/DemoQAPOM/DemoQa";
import FormsDemoQA from "../PageObject/DemoQAPOM/Forms - demoQa";
import ListDemoQA from "../PageObject/DemoQAPOM/List - demoQa";
import TableDemoQA from "../PageObject/DemoQAPOM/Table - demoQa";
import UtilitiesDemoQA from "../PageObject/DemoQAPOM/Utilities - demoQa";

describe('DemoQA Tools', () => {
  const siteDemoQA = new DemoQA();
  const utilitiesDemoQA = new UtilitiesDemoQA();
  const formsDemoQA = new FormsDemoQA();
  const listDemoQA = new ListDemoQA();
  const tableDemoQA = new TableDemoQA();

  Cypress.on('uncaught:exception', (e, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    // console.log("error", e);
    console.log("error", e);
    console.log("runnable", runnable);
    return false
  })

  beforeEach('settings', () => {
    siteDemoQA.navigate();
  })

  it('Registration Form', () => {
    // Data
    const FirstName = "Luan";
    const LastName = "Almeida";
    const UserEmail = "luan_almeida@gmail.com";
    const Gender = "Male";
    const Phone = "4799909900";
    const dayDOB = "10";
    const monthDOB = "February";
    const yearDOB = "1955";
    const Subject1 = "Computer Science";
    const Hobbie1 = "Reading";
    const imageTest = 'testPassed.jpg';
    const Adress = "Rua Alexandre Dávila Baptista 633";
    const State = "Haryana";
    const City = "Panipat";

    siteDemoQA.acessButtonCard("Forms")
    siteDemoQA.acessLeftPanel("Practice Form")
    formsDemoQA.fillFirstName(FirstName)
    formsDemoQA.fillLastName(LastName)
    formsDemoQA.filluserEmail(UserEmail)
    formsDemoQA.fillGender(Gender)
    formsDemoQA.fillPhone(Phone)
    formsDemoQA.fillBirthday(dayDOB, monthDOB, yearDOB)
    formsDemoQA.fillSubjects(Subject1)
    formsDemoQA.fillHobbies(Hobbie1)
    utilitiesDemoQA.uploadPicture(imageTest)
    formsDemoQA.fillAddress(Adress)
    formsDemoQA.fillStateAndCity(State, City)
    formsDemoQA.submitForm()
  })

  it('Iteractions Form List via Text', () => {
    // Data
    const myLocator = '.tab-content ul';
    const myRepeatableElement = 'li';
    const listText = "Morbi leo risus";

    siteDemoQA.acessButtonCard("Interactions")
    siteDemoQA.acessLeftPanel("Selectable")
    listDemoQA.clickOnByText(myLocator, 
      myRepeatableElement, listText)
  })

  it('Iteractions Form via List Position', () => {
    // Data
    const myLocator = '.tab-content ul';
    const myRepeatableElement = 'li';
    const listPosition = 2;

    siteDemoQA.acessButtonCard("Interactions")
    siteDemoQA.acessLeftPanel("Selectable")
    listDemoQA.clickOnByPosition(myLocator, 
      myRepeatableElement, listPosition)
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

      siteDemoQA.acessButtonCard("Interactions")
      siteDemoQA.acessLeftPanel("Selectable")
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

      siteDemoQA.acessButtonCard("Elements")
      siteDemoQA.acessLeftPanel("Web Tables")
      tableDemoQA.clickOnTable(tableLocator, rowLocator, rowElementLocator, position, wantedData)
    })
  })
})
