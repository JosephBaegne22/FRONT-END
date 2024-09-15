describe("GameScreen", () => {
  beforeEach(() => {
    // Mock the WebSocket connection
    cy.window().then((win) => {
      win.WebSocket = class {
        constructor() {}
        send() {}
        close() {}
      };
    });

    // Visit the GameScreen (you may need to adjust the route)
    cy.visit("/game");
  });

  it("should display the timer", () => {
    cy.get(".timerText").should("exist");
    cy.get(".timerIcon").should("exist");
  });

  it("should have a settings button", () => {
    cy.get('[data-testid="settings-button"]').should("exist");
  });

  it("should display camera controls", () => {
    cy.contains("Reset").should("exist");
    cy.get('[data-icon="upcircleo"]').should("exist");
    cy.get('[data-icon="downcircleo"]').should("exist");
    cy.get('[data-icon="leftcircleo"]').should("exist");
    cy.get('[data-icon="rightcircleo"]').should("exist");
  });

  it("should display speed controls", () => {
    cy.get('[data-icon="pluscircle"]').should("exist");
    cy.get('[data-icon="minuscircle"]').should("exist");
  });

  it("should display the speedometer", () => {
    cy.get(".speedometerImage").should("exist");
    cy.get(".speed").should("exist");
  });

  describe("Manual mode", () => {
    it("should display manual controls", () => {
      cy.get('[data-testid="left-button"]').should("exist");
      cy.get('[data-testid="right-button"]').should("exist");
      cy.get('[data-testid="forward-button"]').should("exist");
      cy.get('[data-testid="backward-button"]').should("exist");
      cy.get('[data-testid="brake-button"]').should("exist");
    });
  });

  describe("Auto mode", () => {
    beforeEach(() => {
      // You may need to add a way to switch to auto mode
      // For example, by adding a query parameter to the URL
      cy.visit("/game?mode=auto");
    });

    it("should display auto mode controls", () => {
      cy.contains("Démarrer").should("exist");
      cy.contains("Arrêter").should("exist");
    });
  });
});
