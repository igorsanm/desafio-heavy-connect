import { users, url } from './Mock';
import { doSignIn, selectItem, seeItemDetails, addToCart, goToCart, checkItemInTheCart, getPricesFromElements} from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', ()=>{
    let item = 'Sauce Labs Backpack';
    selectItem(item);
    seeItemDetails(item);

    addToCart(item);

    goToCart();

    checkItemInTheCart(item);
    
  });
  
  it('Should sort products by price properly (high to low)', ()=>{

    cy.get('select').select('hilo');
    
    // Function to get item prices
    getPricesFromElements('.inventory_item_price').then((prices) => {
      // Verify if the prices are in descending order
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.gte(prices[i + 1]);
      }
    });
  });

  it('Should sort products by price properly (low to high)', ()=>{
  
    cy.get('select').select('lohi');
    
    getPricesFromElements('.inventory_item_price').then((prices) =>{
      // Verify if the prices are in ascending order
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.lte(prices[i + 1]); 
      }
    })
  });
  
});
