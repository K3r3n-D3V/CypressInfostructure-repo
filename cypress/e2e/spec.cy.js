describe("Login and Place Order", () => {
  beforeEach(() => {
    // Navigate to the home page
    cy.visit("/"); 

    // Step 1: Click the cart icon in the navbar on the home page
    cy.get(".cart-icon").click(); 
    cy.url().should('include', '/login'); // Verify login URL

    // Step 2: Fill in user credentials to log in
    cy.get('input[name="email"]')
      .should('be.visible') // Ensure email input is visible
      .type("kerenbotombe125@gmail.com");

    cy.get('input[name="password"]')
      .should('be.visible') // Ensure password input is visible
      .type("12345");

      
      // Login Assertions
      cy.get('h2').should('contain', 'Login'); // Page heading
      cy.get('label').should('contain', 'Email Address'); 
      cy.get('label').should('contain', 'Password'); 
      cy.get('p').should('contain', 'Do not have an account? Sign Up'); 
      cy.get('button[type="submit"]').should('be.visible'); // Submit button visible
      // Step 3: Click login button to log in
      cy.get('button[type="submit"]').click();
  });

  it("should place an order successfully", () => {
    // Step 1: Navigate to the product screen
   

    cy.contains('button', "Back to Product Screen").click();
    
    
    // Product Screen Assertions
    cy.get('.product').should('have.length.at.least', 1); // Ensure products are displayed
    
    // Step 2: Add products to the cart
    cy.get('.addToCartBtn').eq(0).click().should('be.visible');
    cy.get('.addToCartBtn').eq(1).click().should('be.visible');
    cy.get('.addToCartBtn').eq(2).click().should('be.visible');
    cy.get('.addToCartBtn').eq(3).click().should('be.visible');

    // Cart Assertions
    cy.get('.cart-tag').should('contain', '3'); // Verify cart counter updates
    cy.get('.addToCartBtn').should('contain', 'Add To Cart').and('be.visible');

    // Step 3: Navigate to the cart page
    cy.get('.cart-icon')
      .should('be.visible') // Ensure cart icon is visible
      .click();
    cy.url().should('include', '/cart'); // Verify cart URL
    cy.contains("Shopping Cart").should('exist'); // Cart page heading
    cy.contains("Items").should('exist'); 
    cy.contains("SHIPPING").should('exist'); 

    // Step 4: Adjust product quantities
    cy.get('.increase').eq(0).click();
    cy.get('.increase').eq(1).click();
    cy.get('.increase').eq(2).click();
    cy.get('.decrease').eq(1).click();

    // Quantity Adjustment Assertions
    cy.get('.increase').eq(1).should('contain', '+');
    cy.get('.increase').eq(2).should('contain', '+');

    // Step 5: Select shipping method
    cy.get('select[name="deliveryMethod"]').select('Express Delivery - $25').should('have.value', 'Express Delivery');;

    // Step 6: Click Proceed to Checkout
    cy.contains("button", "Proceed to Checkout").click();
    cy.url().should('include', '/checkout'); // Verify checkout URL

    // Step 7: Fill in checkout form
    // Personal Information Section
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type("Gunball");
    cy.get('input[name="lastName"]')
      .should('be.visible')
      .type("Watterson");
    cy.contains('button', 'Next').click();

    // Address Information Section
    cy.get('input[name="address"]')
      .should('be.visible')
      .type("12 Amazing Road");
    cy.get('input[name="city"]')
      .should('be.visible')
      .type("JOHANNESBURG");
    cy.get('input[name="state"]')
      .should('be.visible')
      .type("Gauteng");
    cy.get('input[name="zip"]')
      .should('be.visible')
      .type("2199");
    cy.contains('button', 'Next').click();

    // Payment Method Section
    cy.get('select[name="paymentMethod"]')
      .should('be.visible')
      .select("Credit Card");
    cy.contains('button', 'Next').click();

    // Final Step: Place Order
    cy.contains('button', 'Place Order').should('be.visible').click();

    // Order Placement Assertions
    cy.url().should('include', '/checkout'); // Verify redirection to summary page
    cy.contains("Your order has been placed successfully!").should('be.visible');
    cy.contains(".popup", "✔").should('be.visible'); // Verify success popup
    cy.get('.order').should('exist'); // Verify order summary is displayed
    cy.get('.order').should('not.be.empty'); // Verify order ID is generated
  });
});
