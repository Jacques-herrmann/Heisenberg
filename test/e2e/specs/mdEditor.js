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
                browser.elementIdClick(value.ELEMENT).pause(50)
            })
        });

        // Insert the first block
        editor.click('@emptyButton');
        editor.expect.element('@block').to.be.present;

         // Select the first block
        editor.click('.MDEditor__content');
        // Write something on it
        browser
            .keys('Hello world !')
            .keys(browser.Keys.ENTER)
            .keys('Im a cool WYSIWYG markdown Editor')
            .keys(browser.Keys.ENTER)
            .keys('Here is a list')
            .keys(browser.Keys.ENTER)
            .keys('First Item')
            .pause(100);
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[14].ELEMENT)
        });
        // Select the last block (End of block)
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[3].ELEMENT)
        });
        browser
            .keys(browser.Keys.ENTER)
            .keys('Second Item')
            .keys(browser.Keys.ENTER)
            .keys('Third Item')
            .keys(browser.Keys.ENTER)
            .keys(browser.Keys.ENTER)
            .keys('End of the list !')
            .keys(browser.Keys.ENTER)
            .keys('And Here is a formula : f(x) = ax^2 + b')
            .pause(100)
        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[5].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[5].ELEMENT, 100, 0)
                .mouseButtonUp(0).pause(1000)
        });
        // Click on Formula button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[5].ELEMENT)
        });
    });

    it('should allow user to switch block with arrow key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select the third block (End of block)
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[2].ELEMENT).pause(1000)
        });
        // Test simple Arrow navigation
        browser.keys(browser.Keys.LEFT_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[2].ELEMENT, block.value)
            })
        });
        browser.keys(browser.Keys.RIGHT_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[2].ELEMENT, block.value)
            })
        });
        // Test changing selected block with arrow
        browser.keys(browser.Keys.RIGHT_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[3].ELEMENT, block.value)
            })
        });
        browser.keys(browser.Keys.DOWN_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[3].ELEMENT, block.value)
            })
        });
        browser.keys(browser.Keys.DOWN_ARROW);
        browser.keys(browser.Keys.DOWN_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[4].ELEMENT, block.value)
            })
        });
        browser.keys(browser.Keys.UP_ARROW);
        browser.keys(browser.Keys.UP_ARROW);
        browser.keys(browser.Keys.UP_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[3].ELEMENT, block.value)
            })
        });

        browser.keys(browser.Keys.LEFT_ARROW);
        editor.api.element('@selectedBlock', (block) => {
            editor.api.elements('@block', (blocks) => {
                browser.assert.equal(blocks.result.value[2].ELEMENT, block.value)
            });
        });
        browser.end;
    });

    it('should allow user to split block with Enter key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select the third block and split it
        editor.api.elements('@block', (blocks) => {
            browser
                .elementIdClick(blocks.result.value[2].ELEMENT).pause(1000)
                .keys(browser.Keys.LEFT_ARROW)
                .keys(browser.Keys.ENTER)
        });

        // Select the fifth block and slit item on it
        editor.api.elements('@block', (blocks) => {
            browser
                .elementIdClick(blocks.result.value[4].ELEMENT).pause(1000)
                .keys(browser.Keys.LEFT_ARROW)
                .keys(browser.Keys.ENTER)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 6);
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a lis')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 't')
            })
            editor.api.elementIdText(blocks.result.value[4].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First Item\nSecond Ite\nm\nThird Item')
            });
        })
    });

    it('should allow user to merge block with Backspace key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select the first block (End of block)
        editor.api.elements('@content', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT);
        });
        // Press right to go to the beginning of the second block and merge the blocks
        browser
            .keys(browser.Keys.RIGHT_ARROW)
            .keys(browser.Keys.BACK_SPACE)
            .pause(1000)

        // Select the last block (End of block) and merge it with the precedent list block
        editor.api.elements('@content', (blocks) => {
            browser
                .elementIdClick(blocks.result.value[3].ELEMENT)
                .keys(browser.Keys.HOME)
                .keys(browser.Keys.BACK_SPACE).pause(2000);
        });

        // Check the result
        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 3);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !Im a cool WYSIWYG markdown Editor')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First Item\nSecond Item\nThird ItemEnd of the list !')
            });
        });

        // Select the last block (list block) and merge it with the precedent text block
        editor.api.elements('@content', (blocks) => {
            browser
                .elementIdClick(blocks.result.value[2].ELEMENT)
                .keys(browser.Keys.UP_ARROW)
                .keys(browser.Keys.HOME)
                .keys(browser.Keys.BACK_SPACE).pause(2000);
        });
        // Check the result
        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 2);
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a listFirst ItemSecond ItemThird ItemEnd of the list !')
            });
        });
    });

    it('should allow to replace selection with a character (and not merging block if selection ended it)', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text and replace by a character
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 230, 0)
                .mouseButtonUp(0)
                .keys('A');

            // Inside list block
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 150, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 50, 0)
                .mouseButtonUp(0)
                .keys('B');
        })

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Im a cool WYSIWYG markdown A')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a list')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'FB\nSecond Item\nThird Item')
            });
            editor.api.elementIdText(blocks.result.value[4].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'End of the list !')
            });
        })
    });

    it('should allow to replace selection with a \'newline\' character (Enter key)', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text and replace by a character
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 260, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 230, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.ENTER)
                .pause(100)

            // Inside list block
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 150, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 50, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.ENTER)
                .keys("New Item").pause(2000)
        })

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 6);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Im a cool WYSIWYG markdown ')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'r')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a list')
            });
            editor.api.elementIdText(blocks.result.value[4].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'F\nNew Item\nSecond Item\nThird Item')
            });
        })
    });

    it('should allow to remove selection with the \'Delete\' key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text and replace by a character
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 0, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.DELETE);

            // Inside list block
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 150, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 40, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.DELETE).pause(2000)
        })

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, '')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a list')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Second Item\nThird Item')
            });
            editor.api.elementIdText(blocks.result.value[4].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'End of the list !')
            });
        })
    });

    it('should allow to remove selection with the \'BackSpace\' key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text and replace by a character
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 320, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 0, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.BACK_SPACE);

            // Inside list block
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 150, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 40, 0)
                .mouseButtonUp(0)
                .keys(browser.Keys.BACK_SPACE).pause(2000)
        })
        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !')
            });
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, '')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Here is a list')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Second Item\nThird Item')
            });
            editor.api.elementIdText(blocks.result.value[4].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'End of the list !')
            });
})
    });

    it('should allow to change selection format', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on bold button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
        });

        // Select List Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on italic button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Im a cool WYSIWYG markdown Editor')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First Item\nSecond Item\nThird Item')
            });
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Im a c<b>ool WY</b>SIWYG markdown Editor')
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'F<i>irst Item</i>')
        })

        // Select List Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 80, 0)
                .mouseButtonUp(0)
        });
        // Click on italic button to remove format
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
        });

        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'First I<i>tem</i>')
        })

    });

    it('should allow to slit and merge formatted text between block', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 100, 0)
                .mouseButtonUp(0)
                .pause(100)

            // Click on bold button to format text (italic)
            editor.expect.element('@formatButton').to.be.present;
            editor.api.elements('@formatButton', (buttons) => {
                editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
            })

            browser
                .moveTo(blocks.result.value[1].ELEMENT, 90, 0)
                .mouseButtonClick(0)
                .keys(browser.Keys.ENTER)
                .pause(100)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 6);
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Im a cool W')
            });
            editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'YSIWYG markdown Editor')
            });
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Im a c<i>ool W</i>')
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, '<i>Y</i>SIWYG markdown Editor')
        })

        browser.keys(browser.Keys.BACK_SPACE)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Im a c<i>ool WY</i>SIWYG markdown Editor')
        })
    });

    it('should allow to slit and merge formatted text between item of list block', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[3].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[3].ELEMENT, 100, 0)
                .mouseButtonUp(0)
                .pause(100)

            // Click on bold button to format text (italic)
            editor.expect.element('@formatButton').to.be.present;
            editor.api.elements('@formatButton', (buttons) => {
                editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
            })

            browser
                .moveTo(blocks.result.value[3].ELEMENT, 80, 0)
                .mouseButtonClick(0)
                .keys(browser.Keys.ENTER)
                .pause(1000)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First I\ntem\nSecond Item\nThird Item')
            });
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'F<i>irst I</i>')
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li:nth-child(2)', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, '<i>tem</i>')
        })

        browser.keys(browser.Keys.BACK_SPACE)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'F<i>irst Item</i>')
        })
    });

    it('should allow to switch between block type', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

         // Select the first block (End of block)
        editor.api.elements('@content', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT);
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[14].ELEMENT)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Hello world !')
            });
        });
        editor.api.getElementProperty('.MDEditor__md-block > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Hello world !')
        })


        // Select the List block
        editor.api.elements('@content', (blocks) => {
            browser.elementIdClick(blocks.result.value[3].ELEMENT);
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[2].ELEMENT)
        });

        editor.api.elements('@content', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 5);
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First ItemSecond ItemThird Item')
            });
        });
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'First ItemSecond ItemThird Item')
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
    //     editor.api.elements('@content', (blocks) => {
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
    //     editor.api.elements('@content', (blocks) => {
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