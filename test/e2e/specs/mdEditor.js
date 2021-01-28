// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

describe('MDEditor.ui', () => {
    beforeEach((browser) => {
        browser
            .url("http://localhost:8080")
            .waitForElementVisible('#app', 5000)

            // Remove all blocks
            .elements('css selector', '.MDEditor__button--delete', (elements) => {
                elements.value.forEach((elt) => {
                    for (const [key, value] of Object.entries(elt)) {
                        browser.elementIdClick(value);
                    }
                })
            })
            // Insert the first block
            .click('.MDEditor__no-content > button')
            .waitForElementPresent('.MDEditor__content')
    });

    it('should allow user to remove block', (browser) => {
         browser
            // Click on remove button
            .click('.MDEditor__button--delete')

            // Check that the block was removed
            .waitForElementVisible('.MDEditor__no-content')
            .waitForElementNotPresent('.MDEditor__content')
            .end();
    });

    it('should allow user to add text inside a <p> block', (browser) => {
        browser
            // Select the first block
            .click('.MDEditor__content')

            // Write something on it
            .keys('Hello world !')

            // Check the HTML result
            .element('css selector', '.MDEditor__content', (element) => {
                browser.elementIdText(element.value.ELEMENT, (text) => {
                    browser.assert.equal(text.value, 'Hello World !')
                })
            })
            .end();
    });

    // xit('should allow user to change block type', (browser) => {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible('#app', 5000)
    //         .end();
    // });
    //
    // xit('should allow user to select block', (browser) => {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible('#app', 5000)
    //         .end();
    // });
    //
    // xit('should allow user to switch block with arrow key', (browser) => {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible('#app', 5000)
    //
    //
    //         .end();
    // });
    //
    // xit('should allow user to split block with Enter key', (browser) => {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible('#app', 5000)
    //         .end();
    // });
    //
    // xit('should allow user to merge block with Backspace key', (browser) => {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible('#app', 5000)
    //         .end();
    // });
});