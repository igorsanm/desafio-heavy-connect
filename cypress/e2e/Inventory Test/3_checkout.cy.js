import { users, url } from "./Mock";
import { doSignIn, selectItem, seeItemDetails, addToCart, backToProducts, continueShopping, goToCart, 
         checkItemInTheCart, fillCheckoutForm,
         goToCheckout, finishCheckout, continueCheckout, checkErrorMessage, fillFieldCheckout} from "./Utils";

describe("Inventory - Checkout", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it("Should do checkout with the correct flow", () => {
    const item = 'Sauce Labs Backpack';
    selectItem(item);
    seeItemDetails(item);
    addToCart(item);
    goToCart();
    checkItemInTheCart(item);

    goToCheckout();
    
    fillCheckoutForm(users.standard_user);
    
    checkItemInTheCart(item);

    finishCheckout();

  });

  it("Should select some products, go to cart, and go back to continue shopping", ()=>{
    const item1 = 'Sauce Labs Bike Light';
    const item2 = 'Sauce Labs Onesie';
    const item3 = 'Sauce Labs Bolt T-Shirt';

    selectItem(item1);
    seeItemDetails(item1);
    addToCart(item1);
    backToProducts();
    
    selectItem(item2);
    seeItemDetails(item2);
    addToCart(item2);
    backToProducts();
    
    selectItem(item3);
    seeItemDetails(item3);
    addToCart(item3);
  
    goToCart()

    checkItemInTheCart(item1);
    checkItemInTheCart(item2);
    checkItemInTheCart(item3);

    continueShopping()
    
    cy.contains('Products');
    
  });

  it("Should not continue checkout with empty delivery information", () =>{
    const item = 'Sauce Labs Backpack';
    selectItem(item);
    seeItemDetails(item);
    addToCart(item);
    goToCart();
    checkItemInTheCart(item);

    goToCheckout();
    continueCheckout();

    checkErrorMessage('#first-name', 'Error: First Name is required');
    
    fillFieldCheckout('#first-name', 'Test')
    continueCheckout();

    checkErrorMessage('#last-name', 'Error: Last Name is required');

    fillFieldCheckout('#last-name', 'User1');
    continueCheckout();

    checkErrorMessage('#postal-code', 'Error: Postal Code is required');

  });
});