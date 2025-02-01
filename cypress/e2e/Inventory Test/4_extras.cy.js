import { users, url } from "./Mock";
import { doSignIn, selectItem, seeItemDetails, addToCart, backToProducts, goToCart, 
         checkItemInTheCart, fillCheckoutForm, removeItem, checkItemRemovedFromCart,
         goToCheckout, cancelCheckout} from "./Utils";

describe("Inventory - Extras", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it("Should remove an item from the cart before checkout", () => {
    const item1 = 'Sauce Labs Backpack';
    const item2 = 'Sauce Labs Onesie';
    
    selectItem(item1);
    seeItemDetails(item1);
    addToCart(item1);
    backToProducts();
    
    selectItem(item2);
    seeItemDetails(item2);
    addToCart(item2);
    
    goToCart()
    checkItemInTheCart(item1);
    checkItemInTheCart(item2);
    
    removeItem(item2);
    
    checkItemInTheCart(item1);
    checkItemRemovedFromCart(item2);
    
  });
  
  it("Should cancel the checkout process and return to products page", () => {
    const item = 'Sauce Labs Backpack';
    
    selectItem(item);
    seeItemDetails(item);
    addToCart(item);
    goToCart();
    checkItemInTheCart(item);
    goToCheckout();
    fillCheckoutForm(users.standard_user);
    checkItemInTheCart(item);
    cancelCheckout();
    
  });

  it("Should add items to the cart directly from the products page", () => {
    const item1 = 'Sauce Labs Bike Light';
    const item2 = 'Sauce Labs Onesie';
    const item3 = 'Sauce Labs Bolt T-Shirt';
    const item4 = 'Sauce Labs Fleece Jacket';

    addToCart(item1);
    addToCart(item2);
    addToCart(item3);
    addToCart(item4);

    goToCart();

    checkItemInTheCart(item1);
    checkItemInTheCart(item2);
    checkItemInTheCart(item3);
    checkItemInTheCart(item4);
  });

});