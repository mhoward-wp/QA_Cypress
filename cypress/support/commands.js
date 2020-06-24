// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// import { Cookie } from 'puppeteer'

let lastUserKey
function logInAndVisit(visitPath, userKey) {
  cy.getCookie('Arc-Token')
    .then((cookie) => {
      if (!cookie || userKey !== lastUserKey) {
        cy.log('Logging in user', userKey)

        if ((Cypress.config('baseUrl')).includes('localhost')) {
          // Local auth
          cy.request({
            method: 'POST',
            url: '/auth/form/local-users', // baseUrl is prepended to url
            form: true,
            body: {
              u: userKey,
              p: '',
            },
          })
        } else {
          // Okta auth
          cy.task('authenticate', { userKey }).then((cookies) => {
            (cookies).forEach((cookie) => {
              cy.setCookie(cookie.name, cookie.value)
            })
          })
        }
      }

      lastUserKey = userKey
    })
    .should('exist')

  cy.visit(visitPath)
}

Cypress.Commands.add('logInAndVisit', logInAndVisit)