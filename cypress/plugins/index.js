/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const getCookies = require('../support/get-cookies')

module.exports = async (on, config) => { 
    
    on('task', {
        // Log to node console - useful for headless / CI runs
        // cy.task('log', { message: string, data: any })
        
        log({ message, data }) {
            console.log(message, data)
            return null
        },

        authenticate: ({ userKey }) => {
            
            return getCookies({

                baseUrl: config.baseUrl,
                username: userKey,
                password: config.env.TEST_USER_PASSWORD,
            })
        }
    })
    return config
}