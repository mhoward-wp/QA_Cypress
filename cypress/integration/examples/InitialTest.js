/// <reference types="Cypress" />

describe('Setup Test', function() {

    it('Visit main page', function() {

        // cy.visit('https://sandbox.staging.arcpublishing.com')

        cy.logInAndVisit(
            
            'https://staging.arcpublishing.com/auth/SAML2/admin',
            'arccomposertest+admin@gmail.com'
        )
    })
})