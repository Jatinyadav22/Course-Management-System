describe("Update Student - Case 1", () => {
    it("should successfully update an existing student", () => {
      // Visit the student update page
      cy.visit("/updatestudent.html");
  
      // Fill out the form fields with updated information
      cy.get("input[name='name']").clear().type("Alllicceeeeee");
      cy.get("input[name='email']").clear().type("alice@example.com");
    //   cy.get("input[name='rollNumber']").clear().type("");
    //   cy.get("input[name='course']").clear().type("");
    //   cy.get("input[name='year']").clear().type("");
    //   cy.get("input[name='attendance']").clear().type("");
  
      // Submit the form
      cy.get("button[type='submit']").click();
  
      
  
      // Assert redirection to students list page (update if needed)
    //   cy.url().should("include", "/students");
    });
  });
  
  describe("Update Student - Case 2", () => {
    it("should successfully update another student", () => {
      // Visit the student update page
      cy.visit("/updatestudent.html");
  
      // Fill out the form fields with updated information
      cy.get("input[name='name']").clear().type("David Milerrrrrrrr");
      cy.get("input[name='email']").clear().type("david@example.com");
    //   cy.get("input[name='rollNumber']").clear().type("");
    //   cy.get("input[name='course']").clear().type("");
    //   cy.get("input[name='year']").clear().type("");
      cy.get("input[name='attendance']").clear().type("77");
  
      // Submit the form
      cy.get("button[type='submit']").click();

      // Assert redirection to students list page (update if needed)
    //   cy.url().should("include", "/students");
    });
  });
  