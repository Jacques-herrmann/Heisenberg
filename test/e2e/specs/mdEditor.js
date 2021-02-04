// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

describe('MDEditor.ui', () => {
    beforeEach((browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;
        // Remove all blocks
        editor.api.elements('@removeButton', (btn) => {
            btn.result.value.forEach((value) => {
                browser.elementIdClick(value.ELEMENT)
            })
        });
        // Insert the first block
        editor.click('@emptyButton');
        editor.expect.element('@block').to.be.present
    });

    it('should allow user to switch block with arrow key', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

         // Select the first block
        editor.click('.MDEditor__content');
        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('I\'m a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('and i should allow user to switch block with arrow key')
            .pause(100)

        // Select the second block (End of block)
        editor.api.elements('@block', (blocks) => {
            console.log(blocks.result)
            browser.elementIdClick(blocks.result.value[1].ELEMENT)
        })
        // browser.assert.isSelectedBlock(1);
        // // Test simple Arrow navigation
        browser.keys(browser.Keys.LEFT_ARROW)
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
            })
        })
        browser.keys(browser.Keys.RIGHT_ARROW)
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
            })
        })
        // Test changing selected block with arrow
        browser.keys(browser.Keys.RIGHT_ARROW)
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[2].ELEMENT, block.value)
            })
        })
        browser.keys(browser.Keys.LEFT_ARROW)
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
            })
        })
        browser.end;
    });

    it('should allow user to split block with Enter key', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

         // Select the first block
        editor.click('.MDEditor__content');
        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.LEFT_ARROW)
            .keys(browser.Keys.ENTER)
            .pause(100)

        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 2);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world \n ')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' !\n ')
            })
        })
    });

    it('should allow user to merge block with Backspace key', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

        // Select the first block
        editor.click('.MDEditor__content');
        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys("I m a cool WYSIWYG markdown Editor")
            .pause(100)

        // Select the first block (End of block)
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT);
        })
        // Press right to go to the beginning of the second block and merge the blocks
        browser
            .keys(browser.Keys.RIGHT_ARROW)
            .keys(browser.Keys.BACK_SPACE)
            .pause(100)

        // Check the result
        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 1);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world !I m a cool WYSIWYG markdown Editor\n ')
            });
        })
    });

    it('should allow to replace selection with a character', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

        // Select the first block
        editor.click('.MDEditor__content');

        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('Im a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('and i should allow user to switch block with arrow key')
            .pause(100)

        // Select Text and replace by a character
        editor.api.elements('@block', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 270, 0)
                .mouseButtonUp(0)
                .keys('A');
        })

        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 3);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world !\n ')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Im a cool WYSIWYG markdown A\n ')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' and i should allow user to switch block with arrow key\n ')
            });
        })
    });

    it('should allow to replace selection with a \'newline\' character (Enter key)', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

        // Select the first block
        editor.click('.MDEditor__content');

        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('Im a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('and i should allow user to switch block with arrow key')
            .pause(100)

        // Select Text and replace by a character
        editor.api.elements('@block', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 300, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 270, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.ENTER)
                .pause(100)
        })

        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 4);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world !\n ')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Im a cool WYSIWYG markdown \n ')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' or\n ')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' and i should allow user to switch block with arrow key\n ')
            });
        })
    });

    it('should allow to remove selection with the \'Delete\' key', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

        // Select the first block
        editor.click('.MDEditor__content');

        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('Im a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('and i should allow user to switch block with arrow key')
            .pause(100)

        // Select Text and replace by a character
        editor.api.elements('@block', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 270, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.DELETE);
        })

        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 3);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world !\n ')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Im a cool WYSIWYG markdown \n ')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' and i should allow user to switch block with arrow key\n ')
            });
        })
    });

    it('should allow to remove selection with the \'BackSpace\' key', (browser) => {
        let page = browser.page.mdEditor();
        page.navigate().waitForElementVisible('@app', 5000);
        let editor = page.section.editor;

        // Select the first block
        editor.click('.MDEditor__content');

        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('Im a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('and i should allow user to switch block with arrow key')
            .pause(100)

        // Select Text and replace by a character
        editor.api.elements('@block', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 100, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.BACK_SPACE);
        })
        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 3);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' Hello world !\n ')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' ol WYSIWYG markdown Editor\n ')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, ' and i should allow user to switch block with arrow key\n ')
            });
        })
    });

    // xit('should allow user to drag and drop selected text', (browser) => {
    //     let page = browser.page.mdEditor();
    //     page.navigate().waitForElementVisible('@app', 5000);
    //     let editor = page.section.editor;
    //
    //     // Select the first block
    //     editor.click('.MDEditor__content');
    //
    //     // Write something on it
    //     browser
    //         .keys('Hello world !')
    //         .keys(browser.Keys.ENTER)
    //         .keys('Im a cool WYSIWYG markdown Editor')
    //         .keys(browser.Keys.ENTER)
    //         .keys('and i should allow user to switch block with arrow key');
    //
    //     // Select Text and replace by a character
    //     editor.api.elements('@block', (blocks) => {
    //         browser
    //             .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
    //             .pause(1000)
    //             .mouseButtonDown(0)
    //             .pause(1000)
    //             .moveTo(blocks.result.value[1].ELEMENT, 270, 0)
    //             .pause(1000)
    //             .mouseButtonUp(0)
    //             .moveTo(blocks.result.value[1].ELEMENT, 300, 0)
    //             .mouseButtonDown(0)
    //             .pause(1000)
    //             .moveTo(blocks.result.value[2].ELEMENT, 270, 100)
    //             .mouseButtonUp(0)
    //         // .pause(1000)
    //         // .mouseButtonClick(0)
    //         // .pause(1000)
    //         browser.elementIdClick(blocks.result.value[2].ELEMENT)
    //     })
    //
    //     editor.api.elements('@block', (blocks) => {
    //         browser.assert.equal(blocks.result.value.length, 3);
    //         editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
    //             browser.assert.equal(text.value, 'Hello world !')
    //         });
    //         editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
    //             browser.assert.equal(text.value, 'Im a cool WYSIWYG markdown')
    //         });
    //         editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
    //             browser.assert.equal(text.value, 'and i should allow user to switch block with arrow key')
    //         });
    //     })
    // })

    // xit('should allow user to change block type', (browser) => {
    //     browser
    //         .end();
    // });

});