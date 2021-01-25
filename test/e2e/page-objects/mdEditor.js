/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/',
  commands: [],

  // Main App element
  elements: {
    appContainer: '#app'
  },

  // Home section
  sections: {
    home: {
      selector: '.home',

      sections: {
        usersList: {
          selector: '.UserList',

          elements: {
            searchInput: {
              selector: '__search-textfield label'
            }
          }
        },
        usersForm: {
          selector: '.usersForm',

          elements: {

          }
        },
      }
    }
  }
};
