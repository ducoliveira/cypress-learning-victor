/// <reference types="cypress" />

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

  let bookData
  let pageData

  // Login for each test
  beforeEach('settings', () => {
    cy.fixture('pages').then((data) => {
      pageData = data;
      utilitiesDemoQA.navigate(data.homepage)
    })
    cy.fixture('bookAPP').then((data) => {
      bookData = data;
    })
    //utilitiesDemoQA.navigate(data.homepage) // DON'T WORK HERE IDK WHY
    utilitiesDemoQA.acessButtonCard("Book Store Application")
    bookDemoQA.login("luanalmeida", "10Fev1955*")
  })

  // Delete all books on profile and logout after each test
  afterEach(() => {
    utilitiesDemoQA.acessLeftPanel(bookData.submenuProfile)
    bookDemoQA.deleteAllBooksFromProfile()
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.logout("luanalmeida")
  })

  it('TC3 - Searching Books', () => {
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.searchBook(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator,
       bookData.positionBook1, bookData.wantedBook1)
  })

  it('TC4 - Adding Book to Profile', () => {
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.addBookToProfile(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator,
      bookData.positionBook1, bookData.wantedBook1)
  })

  it('TC5 - Deleting profile book', () => {
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.addBookToProfile(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator,
      bookData.positionBook1, bookData.wantedBook1)
    utilitiesDemoQA.acessLeftPanel(bookData.submenuProfile)
    bookDemoQA.deleteBookFromProfile(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator,
      bookData.positionBook1, bookData.wantedBook1, bookData.positionDelete)
    bookDemoQA.assertNoItemFound()
  })

  it('TC6 - Deleting all profile books', () =>{
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.addBookToProfile(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator, 
      bookData.positionBook1, bookData.wantedBook1)
    utilitiesDemoQA.navigate(bookData.books)
    bookDemoQA.addBookToProfile(bookData.tableLocator, bookData.rowLocator, bookData.rowElementLocator, 
      bookData.positionBook2, bookData.wantedBook2)
    utilitiesDemoQA.acessLeftPanel(bookData.submenuProfile)
    bookDemoQA.deleteAllBooksFromProfile()
    bookDemoQA.assertNoItemFound()
  })

})
