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
  url: 'http://localhost:8080',
  commands: [],

  // Main App element
  elements: {
    app: '#app',
  },
  sections: {
    editor: {
      selector: '.MDEditor',
      locateStrategy: 'css selector',
      elements: {
        controls: {
          selector: '.MDEditor__button',
          locateStrategy: 'css selector',
        },
        formatButton: {
          selector: '.MDEditor__format-text-button',
          locateStrategy: 'css selector',
        },
        block: {
          selector: '.MDEditor__md-block',
          locateStrategy: 'css selector',
        },
        content: {
          selector: '.MDEditor__content',
          locateStrategy: 'css selector',
        },
        removeButton: {
          selector: '.MDEditor__button--delete',
          locateStrategy: 'css selector',
        },
        selectedBlock: {
          selector: '.MDEditor__md-block--selected',
          locateStrategy: 'css selector',
        },
        emptyButton: {
          selector: '.MDEditor__no-content > button',
          locateStrategy: 'css selector',
        }
      }
    },
  },
};
