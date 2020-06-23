/// <reference types="Cypress" />

describe('Setup Test', function() {

    it('Visit main page', function() {

        cy.visit('https://sandbox.staging.arcpublishing.com')
    })
})