/// <reference types="cypress" />

import Amazon from "../PageObject/amazon"

describe('Amazon Shopping', () => {
  const siteAmazon = new Amazon();

  beforeEach('adding a product in the cart', () => {
    // Acessa o site da Amazon
    siteAmazon.navigate()
    // Abre o menu All
    siteAmazon.openMenuAll();
    // Acessa o departamento de Electronics
    siteAmazon.selectDepartment("Electronics");
    // Acessa o departamento de Headphones
    siteAmazon.selectDepartment("Headphones");
    // Seleciona o primeiro produto da lista
    siteAmazon.openFirstProductFromList();
    // Adiciona o produto ao carrinho
    siteAmazon.addToCart();
    // Abre o carrinho
    siteAmazon.openCart();
  })

  it('proceed to checkout', () => {
    siteAmazon.proceedToCheckout();
    // Não implementado etapas posteriores por exigir dados reais de conta/pagamento
  })

  it('remove an product from the cart', () => {
    siteAmazon.removeProductFromCart();
  })
})
