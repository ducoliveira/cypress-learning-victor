/// <reference types="cypress" />

import Amazon from "../PageObject/amazon"

describe('Amazon Shopping', () => {
  const siteAmazon = new Amazon();

  beforeEach('adding a product in the cart', () => {
    cy.visit("https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A172541&ref=nav_em__nav_desktop_sa_intl_headphones_0_2_5_8")
  })

  it('remove an product from the cart', () => {
    // Verifica o primeiro item da tela e, se existir, clica nele;
    //cy.get('#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(2) > div > div > div > div > div > div > div.s-product-image-container.aok-relative.s-text-center.s-image-overlay-grey.s-padding-left-small.s-padding-right-small.puis-spacing-small.s-height-equalized > span > a > div > img')
    //.should('be.visible').click().wait(1000)

    // cy.get('[data-component-type="s-search-result')
    // cy.get('')
  })
})