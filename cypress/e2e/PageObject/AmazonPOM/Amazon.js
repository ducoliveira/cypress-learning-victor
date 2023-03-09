class Amazon{

    navigate(){
        cy.visit('https://amazon.com/')
        cy.title().should('eq', 'Amazon.com. Spend less. Smile more.')
    }

    openMenuAll(){
        // Verifica se existe o menu All e, se existir, clica nele;
        cy.get('[data-csa-c-slot-id="HamburgerMenuDesktop"')
        .should('be.visible').click()

        // Verifica se o menu All abriu
        cy.get('#hmenu-content').should('be.visible').wait(1000)
    }

    selectDepartment(department){
        // Verifica se se existe o departamento e, se existir, clica nele;
        cy.get('#hmenu-content ul.hmenu-visible li')
        .contains(department)
        .should('be.visible').click().wait(1000)
    }

    openFirstProductFromList(){
        // Verifica o primeiro item da tela e, se existir, clica nele;
        cy.get('#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t1.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(2) > div > div > div > div > div > div > div.s-product-image-container.aok-relative.s-text-center.s-image-overlay-grey.s-padding-left-small.s-padding-right-small.puis-spacing-small.s-height-equalized > span > a > div > img')
        .should('be.visible').click().wait(1000)
    }

    addToCart(){
        // Verifica se existe o botão de adicionar ao carrinho e, se existir, clica nele;
        cy.get('#add-to-cart-button')
        .should('be.visible').click().wait(1000)
    }

    openCart(){
        // Verifica se existe o carrinho e, se existir, clica nele;
        cy.get('#nav-cart')
        .should('be.visible').click().wait(1000)
    }

    removeProductFromCart(){
        // Verifica se existe item no carrinho e, se existir, clica para remover-lo;
        cy.get('#activeCartViewForm span input').contains("Delete")
        .should('be.visible').click().wait(1000)

        //#activeCartViewForm .sc-list-item-removed-msg div[data-action="delete"] > span

        // Confirma se o produto foi removido do carrinho
        cy.get('#activeCartViewForm div div div span')
        .should('contain.text', 'was removed from Shopping Cart.')
    }

    proceedToCheckout(){
        // Verifica se existe item no carrinho e, se existir, clica para prosseguir com pagamento;
        cy.get('#sc-buy-box-ptc-button > span > input')
        .should('be.visible').click().wait(1000)
    }
}
    export default Amazon