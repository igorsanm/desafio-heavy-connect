// -------------- LOGIN FUNCTIONS -------------- //
function performLogin(user){
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();
}

export function doSignIn(user){
    performLogin(user);
    
    cy.contains('Products');
}

export function doLogout(){
    cy.get('.bm-burger-button').should('be.visible').click();
    cy.contains('Logout').click();
    cy.get('[data-test="login-button"]').should('be.visible');
}

export function invalidLogin(user){
    performLogin(user);
    
    cy.get('[data-test="error"]').should('exist')
    .and('be.visible')
    .and('have.text', 'Epic sadface: Username and password do not match any user in this service');
}

export function blockedUser(user){
    performLogin(user);
    
    cy.get('[data-test="error"]').should('exist')
    .and('be.visible')
    .and('have.text', 'Epic sadface: Sorry, this user has been locked out.');
}

// -------------- PRODUCTS FUNCTIONS -------------- //
export function selectItem(item_name){
    // Select item on the Products Page
    cy.contains(item_name).click();
}    

export function seeItemDetails(item_name){
    // Verify item and its details
    cy.contains(item_name)
    cy.get('[data-test="inventory-item-desc"]').should('be.visible');
}

export function addToCart(item_name){    
    cy.contains(item_name).parent().parent().contains('button', 'Add to cart').click();
    cy.contains(item_name).parent().parent().contains('button', "Remove");  
// The structure of the Products page and the specific Item page is different, which is why we use parent() twice to accommodate both pages
}

export function goToCart(){    
    cy.get('.shopping_cart_link').click();
    cy.contains('Your Cart');
    
}

export function backToProducts(){    
    cy.get('#back-to-products').click();
    cy.contains('Products');
}

export function continueShopping(){    
    cy.get('#continue-shopping').click();
    cy.contains('Products');
}

// Convert prices texts to numbers
export const getPricesFromElements = (object) => {
    return cy.get(object).then(($prices) => {
        return $prices.toArray().map((el) => {
            return parseFloat(el.innerText.replace('$', '')); // Remove $ and convert to number
        });
    });
}

export function checkItemInTheCart(item_name){    
    cy.contains(item_name).parent().find('.inventory_item_desc').should('be.visible');   
}

export function removeItem(item_name){    
    cy.contains(item_name).parent().find('button').click();   
}

export function checkItemRemovedFromCart(item_name){    
    cy.contains(item_name).should('not.exist');   
}

// -------------- CHECKOUT FUNCTIONS --------------//
export function goToCheckout(){    
    cy.get('#checkout').click();
    cy.contains('Checkout: Your Information');
}

export function continueCheckout(){    
    cy.get('#continue').click();
}

export function cancelCheckout(){    
    cy.get('#cancel').click();
    cy.contains('Products');
}

export function finishCheckout(){    
    cy.get('#finish').click();
    cy.contains('Checkout: Complete!')
    cy.contains('Thank you for your order!')
    cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
}

export function fillCheckoutForm(user){
    cy.get('#first-name').type(user.first_name);
    cy.get('#last-name').type(user.last_name);
    cy.get('#postal-code').type(user.zip_code);
    cy.get('#continue').click();
    cy.contains('Checkout: Overview');

}

export function fillFieldCheckout(field, value) {
  cy.get(field).type(value);
}

export function checkErrorMessage(field, message) {
    cy.get(field).parent().find('svg').should('be.visible'); // Verify error icon
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', message); // Verify error message
  }
  