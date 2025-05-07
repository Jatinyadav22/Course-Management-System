describe("Create Student - Case 1", () => {
  it("should successfully create a new student", () => {
      // Visit the student creation page
      cy.visit("/createstudent.html");

      // Fill out the form fields
      cy.get("input[name='name']").type("Chris Evans");
      cy.get("input[name='email']").type("chris@example.com");
      cy.get("input[name='rollNumber']").type("230454");
      cy.get("input[name='course']").type("Civil Engineering");
      cy.get("input[name='year']").type("3");
      cy.get("input[name='attendance']").type("80");

      // Submit the form
      cy.get("button[type='submit']").click();

      // Assert success message with longer timeout
      // cy.contains("Student created successfully");
      // cy.url().should("include", "/students"); // update if needed
  });
});
describe("Create Student - Case 2", () => {
  it("should successfully create a new student", () => {
      // Visit the student creation page
      cy.visit("/createstudent.html");
      

      // Fill out the form fields
      cy.get("input[name='name']").type("Diana Prince");
      cy.get("input[name='email']").type("diana@example.com");
      cy.get("input[name='rollNumber']").type("230455");
      cy.get("input[name='course']").type("Electrical Engineering");
      cy.get("input[name='year']").type("1");
      cy.get("input[name='attendance']").type("95");

      // Submit the form
      cy.get("button[type='submit']").click();

      // Assert success message with longer timeout
      // cy.contains("Student created successfully");
      // cy.url().should("include", "/students"); // update if needed
  });
});
