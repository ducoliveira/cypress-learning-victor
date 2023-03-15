/// <reference types="cypress" />

import FormsDemoQA from "../PageObject/DemoQAPOM/Forms - demoQa";
import ListDemoQA from "../PageObject/DemoQAPOM/List - demoQa";
import LoadsDemoQA from "../PageObject/DemoQAPOM/Loads - demoQa";
import TableDemoQA from "../PageObject/DemoQAPOM/Table - demoQa";
import UtilitiesDemoQA from "../PageObject/DemoQAPOM/Utilities - demoQa";
import BookAppDemoQA from "../PageObject/DemoQAPOM/BookApp - demoQa";

describe('DemoQA Tools', () => {
  const utilitiesDemoQA = new UtilitiesDemoQA();
  const formsDemoQA = new FormsDemoQA();
  const listDemoQA = new ListDemoQA();
  const tableDemoQA = new TableDemoQA();
  const loadsDemoQA = new LoadsDemoQA();
  const bookDemoQA = new BookAppDemoQA();

  Cypress.on('uncaught:exception', (e, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    // console.log("error", e);
    console.log("error", e);
    console.log("runnable", runnable);
    return false
  })

  // Login for each test
  beforeEach('settings', () => {
    cy.fixture('pages').then((pages) => {
      const homepage = pages.homepage;

      utilitiesDemoQA.navigate(homepage);
      utilitiesDemoQA.acessButtonCard("Book Store Application");
      bookDemoQA.login("luanalmeida", "10Fev1955*")
    })
  })

  // Logout after each test
  afterEach(() => {
    cy.fixture('pages').then((pages) => {
      const books = pages.books;

      utilitiesDemoQA.navigate(books);
      bookDemoQA.logout("luanalmeida");
    })
  })

  it('', () => {
  })


})
