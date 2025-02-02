describe('UI Tests for Homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load home page and display correct elements', () => {
        cy.get('[data-testid="home-page"]').should('be.visible');
        cy.get('[data-testid="home-title"]').should('have.text', 'Welcome to Task Manager');
        cy.get('[data-testid="home-description"]').should('have.text', 'Manage your tasks efficiently');
    });
});
