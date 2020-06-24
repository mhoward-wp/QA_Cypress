// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Cookies.defaults({

  whitelist: ['Arc-Token', 'Arc-Client-Info'],
})
  
before(() => {

  cy.log(

    'This should run only once before the entire test, which clears Arc-Token cookie.'
  )

  cy.clearCookie('Arc-Token')

  Cypress.on('window:before:load', (win) => {

    // Clear fetch to activate the polyfill which uses XHRs for network requests.
    // This allows for capturing & stubbing of network requests until fetch is supported by Cypress.

    win.fetch = null
  })  
})
