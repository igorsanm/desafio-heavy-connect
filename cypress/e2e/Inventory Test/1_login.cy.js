import { users, url } from "./Mock";
import { doSignIn, doLogout, invalidLogin, blockedUser } from "./Utils";

describe('Inventory - Login', () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it('Should login with valid credentials', () => {
      doSignIn(users.standard_user);

    });
    
    it('Should login with valid credentials and do logout', () => {
      doSignIn(users.standard_user);
      doLogout();

    });
    
    it('Should not login with invalid credentials', () =>{
      invalidLogin(users.invalid_user);
      
    });
    
    it('Should not allow "locked_out_user" do sign in', () =>{
      blockedUser(users.locked_out_user);
      
    });
    
    it('Should login with "performance_glitch_user" and wait the products page loads', () => {
      doSignIn(users.performance_glitch_user);
      
      cy.get('.inventory_item_name').should('be.visible');  
      
    });
  });