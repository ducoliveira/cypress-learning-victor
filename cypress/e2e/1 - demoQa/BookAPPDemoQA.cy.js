/// <reference types="cypress" />

import FormsDemoQA from "../PageObject/DemoQAPOM/Forms - demoQa";
import ListDemoQA from "../PageObject/DemoQAPOM/List - demoQa";
import LoadsDemoQA from "../PageObject/DemoQAPOM/Loads - demoQa";
import TableDemoQA from "../PageObject/DemoQAPOM/Table - demoQa";
import UtilitiesDemoQA from "../PageObject/DemoQAPOM/Utilities - demoQa";
import BookAppDemoQA from "../PageObject/DemoQAPOM/BookApp - demoQa";

describe('DemoQA Tools', () => {
  const utilitiesDemoQA = new UtilitiesDemoQA();
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

  // Delete all books on profile and logout after each test
  afterEach(() => {
    cy.fixture('bookAPP').then((bookAPP) => {
      const books = bookAPP.books
      const submenuProfile = bookAPP.submenuProfile

      utilitiesDemoQA.acessLeftPanel(submenuProfile)
      bookDemoQA.deleteAllBooksFromProfile()
      utilitiesDemoQA.navigate(books);
      bookDemoQA.logout("luanalmeida");
    })
  })

  it('TC3 - Searching Books', () => {
    cy.fixture('bookAPP').then((bookAPP) => {
      // Data
      const tableLocator = bookAPP.tableLocator
      const rowLocator = bookAPP.rowLocator
      const rowElementLocator = bookAPP.rowElementLocator
      const title = bookAPP.wantedBook1
      const positionBook1 = bookAPP.positionBook1
      const books = bookAPP.books

      utilitiesDemoQA.navigate(books)
      bookDemoQA.searchBook(tableLocator, rowLocator, rowElementLocator, positionBook1, title)
    })
  })

  it('TC4 - Adding Book to Profile', () => {
    cy.fixture('bookAPP').then((bookAPP) => {
      // Data
      const tableLocator = bookAPP.tableLocator
      const rowLocator = bookAPP.rowLocator
      const rowElementLocator = bookAPP.rowElementLocator
      const wantedBook1 = bookAPP.wantedBook1
      const positionBook1 = bookAPP.positionBook1
      const books = bookAPP.books
      const submenuProfile = bookAPP.submenuProfile

      utilitiesDemoQA.navigate(books)
      bookDemoQA.addBookToProfile(tableLocator, rowLocator, rowElementLocator, positionBook1, wantedBook1)
    })
  })

  it('TC5 - Deleting profile book', () => {
    cy.fixture('bookAPP').then((bookAPP) => {
      // Data
      const tableLocator = bookAPP.tableLocator
      const rowLocator = bookAPP.rowLocator
      const rowElementLocator = bookAPP.rowElementLocator
      const wantedBook1 = bookAPP.wantedBook1
      const positionBook1 = bookAPP.positionBook1
      const positionDelete = bookAPP.positionDelete
      const books = bookAPP.books
      const submenuProfile = bookAPP.submenuProfile

      utilitiesDemoQA.navigate(books)
      bookDemoQA.addBookToProfile(tableLocator, rowLocator, rowElementLocator, positionBook1, wantedBook1)
      utilitiesDemoQA.acessLeftPanel(submenuProfile)
      bookDemoQA.deleteBookFromProfile(tableLocator, rowLocator, rowElementLocator, positionBook1, wantedBook1, positionDelete)
      bookDemoQA.assertNoItemFound()
    })
  })

  it('TC6 - Deleting all profile books', () =>{
    cy.fixture('bookAPP').then((bookAPP) => {
      // Data
      const tableLocator = bookAPP.tableLocator
      const rowLocator = bookAPP.rowLocator
      const rowElementLocator = bookAPP.rowElementLocator
      const wantedBook1 = bookAPP.wantedBook1
      const positionBook1 = bookAPP.positionBook1
      const wantedBook2 = bookAPP.wantedBook2
      const positionBook2 = bookAPP.positionBook2
      const positionDelete = bookAPP.positionDelete
      const books = bookAPP.books
      const submenuProfile = bookAPP.submenuProfile

      utilitiesDemoQA.navigate(books)
      bookDemoQA.addBookToProfile(tableLocator, rowLocator, rowElementLocator, positionBook1, wantedBook1)
      utilitiesDemoQA.navigate(books)
      bookDemoQA.addBookToProfile(tableLocator, rowLocator, rowElementLocator, positionBook2, wantedBook2)
      utilitiesDemoQA.acessLeftPanel(submenuProfile)
      bookDemoQA.deleteAllBooksFromProfile()
      bookDemoQA.assertNoItemFound()
    })
  })

})
