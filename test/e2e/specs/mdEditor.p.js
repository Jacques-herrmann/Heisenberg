
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

describe('MDEditor.ui.p', () => {
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
            .keys('And Here is a formula f = ax + b')
            .pause(100)
        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[5].ELEMENT, 155, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[5].ELEMENT, 250, 0)
                .mouseButtonUp(0)
                .pause(100)
        });
        // Click on Formula button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[5].ELEMENT)
        });

        // Select the last block (End of block)
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[5].ELEMENT)
        });

        // Create content for each block
        browser
            .keys(browser.Keys.ENTER)
            .keys("Here is a H1 title block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a H2 title block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a H3 title block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a quote block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a info block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a warning block")
            .keys(browser.Keys.ENTER)
            .keys("Here is a danger block")
            .keys(browser.Keys.ENTER)

        // Format block
        //H1
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[6].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[3].ELEMENT)
        });
        // H2
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[7].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[4].ELEMENT)
        });
        // H3
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[8].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[5].ELEMENT)
        });
        // QUOTE
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[9].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[16].ELEMENT)
        });
        // INFO
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[10].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[17].ELEMENT)
        });
        // WARNING
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[11].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[18].ELEMENT)
        });
        // DANGER
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[12].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[19].ELEMENT)
        });
    });

    it('should allow user to switch block with arrow key', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;

        // Select the third block (End of block)
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[2].ELEMENT)
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

        // Test arrow navigation around formula
       editor.api.elements('@block', (blocks) => {
           browser
               .elementIdClick(blocks.result.value[5].ELEMENT)
        });
        browser.keys(browser.Keys.LEFT_ARROW).pause(2000);
        editor.expect.element('@formulaEdit').to.be.present;
        browser.keys(browser.Keys.LEFT_ARROW).pause(2000);
        editor.expect.element('@formulaEdit').to.not.be.present;

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
            browser.assert.equal(blocks.result.value.length, 15);
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
            browser.assert.equal(blocks.result.value.length, 12);
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
            browser.assert.equal(blocks.result.value.length, 11);
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
            browser.assert.equal(blocks.result.value.length, 14);
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

    it('should allow to correctly modify, add or remove Formula element', (browser) => {
       let page = browser.page.mdEditor();
       let editor = page.section.editor;

       //Select the last block (Formula)
       editor.api.elements('@block', (blocks) => {
           browser
               .elementIdClick(blocks.result.value[5].ELEMENT)
       });

       // Modify it
       browser.keys(browser.Keys.ARROW_LEFT)
       editor.expect.element('@formulaEdit').to.be.present;
       editor.expect.element('@formulaButton').to.be.present;

       editor.api.element('@formulaEdit', (input) => {
           editor.api.elementIdClick(input.result.value.ELEMENT);
       });
       browser
           .keys(browser.Keys.ARROW_RIGHT)
           .keys(browser.Keys.BACK_SPACE)
           .keys("cy");

       editor.api.element('@formulaButton', (button) => {
           editor.api.elementIdClick(button.result.value.ELEMENT);
       });

       editor.api.getElementProperty('.MDEditor__md-block:nth-child(6) > .MDEditor__content', 'innerText' , (text) => {
           browser.assert.equal(text.value, 'And Here is a formula f=ax+cy ')
       });
       // and then remove it
       editor.api.elements('@block', (blocks) => {
           browser.elementIdClick(blocks.result.value[5].ELEMENT);
       });
       browser
           .keys(browser.Keys.ARROW_LEFT)
           .keys(browser.Keys.DELETE);

       editor.api.getElementProperty('.MDEditor__md-block:nth-child(6) > .MDEditor__content', 'innerHTML' , (html) => {
           browser.assert.equal(html.value, 'And Here is a formula  ')
       });

       // Add a new one
       editor.api.elements('@block', (blocks) => {
           browser.elementIdClick(blocks.result.value[5].ELEMENT);
       });
       browser
           .keys(browser.Keys.ARROW_LEFT)
           .keys("f=ax+b")
           .pause(100)

       // Select Text
       editor.api.elements('@content', (blocks) => {
           browser
               .moveTo(blocks.result.value[5].ELEMENT, 100, 5)
               .mouseButtonDown(0)
               .moveTo(blocks.result.value[5].ELEMENT, 150, 0)
               .mouseButtonUp(0)
       });

       // Click on Formula button
       editor.expect.element('@formatButton').to.be.present;
       editor.api.elements('@formatButton', (buttons) => {
           editor.api.elementIdClick(buttons.result.value[5].ELEMENT)
       });
       editor.api.getElementProperty('.MDEditor__md-block:nth-child(6) > .MDEditor__content', 'innerText' , (text) => {
           browser.assert.equal(text.value, 'And Here is a formula f=ax+b ')
       });
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
            browser.assert.equal(blocks.result.value.length, 15);
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
            browser.assert.equal(blocks.result.value.length, 14);
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
            browser.assert.equal(blocks.result.value.length, 14);
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
                .moveTo(blocks.result.value[0].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[0].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on bold button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
        });

        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[1].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on underline button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[2].ELEMENT)
        });

        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[4].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[4].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on strike button
        editor.expect.element('@formatButton').to.be.present;
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[3].ELEMENT)
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
            browser.assert.equal(blocks.result.value.length, 14);
            editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'Im a cool WYSIWYG markdown Editor')
            });
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First Item\nSecond Item\nThird Item')
            });
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Hello<b> world !</b>')
        });
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'Im a c<u>ool WY</u>SIWYG markdown Editor')
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(5) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'End o<s>f the list</s> !')
        })
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content > li', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'F<i>irst Item</i>')
        });

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
            browser.assert.equal(blocks.result.value.length, 15);
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
            browser.assert.equal(blocks.result.value.length, 14);
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
            browser.assert.equal(blocks.result.value.length, 14);
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
            browser.assert.equal(blocks.result.value.length, 14);
            editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
                browser.assert.equal(text.value, 'First ItemSecond ItemThird Item')
            });
        });
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(4) > .MDEditor__content', 'innerHTML' ,(html) => {
            browser.assert.equal(html.value, 'First ItemSecond ItemThird Item')
        })

    });

    it('should allow user to undo and redo components states', (browser) => {
        let page = browser.page.mdEditor();
        let editor = page.section.editor;
        // Select Formula
        browser.click('.katex')
        // Click on Formula button
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[11].ELEMENT)
        });

        //-----------------------
        // Adding/Remove formula
        //-----------------------
        // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT);
        });
        browser.pause(100)
        browser.assert.elementPresent('.katex'); // Formula present

        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(6) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'And Here is a formula f = ax + b ')
        });

        //-----------------------
        // Adding/Remove text
        // ----------------------
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT)
        });
        browser.keys('A');
        browser.pause(100);
        // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT)
        });
        browser.pause(100);
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello world !')
        });
        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        browser.pause(100);
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello world !A')
        });

        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT)
        });
        browser.pause(100);
        browser.keys(browser.Keys.BACK_SPACE);
        // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT)
        });
        browser.pause(100);
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello world !A')
        });
        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        browser.pause(100);
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello world !')
        });

        //-----------------------
        // Formatting text
        //-----------------------
        // Select Text
        editor.api.elements('@content', (blocks) => {
            browser
                .moveTo(blocks.result.value[0].ELEMENT, 45, 0)
                .mouseButtonDown(0)
                .moveTo(blocks.result.value[0].ELEMENT, 100, 0)
                .mouseButtonUp(0)
        });
        // Click on bold button
        editor.expect.element('@formatButton').to.be.present;
        browser.pause(100);
        editor.api.elements('@formatButton', (buttons) => {
            editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
        });

        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT)
        });
        // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT)
        });
        browser.pause(100)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello world !')
        });
        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        browser.pause(100)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content ', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Hello<b> world !</b>')
        });


        //-----------------------
        // Adding/Remove Block
        //-----------------------
        editor.api.elements('@removeButton', (btn) => {
            browser.elementIdClick(btn.result.value[0].ELEMENT)
        });
        browser.pause(100)
        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 13);
        });

         // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT)
        });
        browser.pause(100)
        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 14);
        });
        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        browser.pause(100)
        editor.api.elements('@block', (blocks) => {
            browser.assert.equal(blocks.result.value.length, 13);
        });
        //-----------------------
        // Changing Block type
        //-----------------------
        editor.api.elements('@block', (blocks) => {
            browser.elementIdClick(blocks.result.value[0].ELEMENT)
        });
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[14].ELEMENT)
        });
        browser.pause(100)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content > li', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Im a cool WYSIWYG markdown Editor')
        });

        // Undo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[0].ELEMENT)
        });
        browser.pause(3000)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Im a cool WYSIWYG markdown Editor')
        });
        //Redo
        editor.api.elements('@controls', (button) => {
            browser.elementIdClick(button.result.value[1].ELEMENT)
        });
        browser.pause(100)
        editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content > li', 'innerHTML' , (html) => {
            browser.assert.equal(html.value, 'Im a cool WYSIWYG markdown Editor')
        });
        browser
            .end();
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
    //
    // xit('should allow user to change block type', (browser) => {
    //     browser
    //         .end();
    // });
    //
});
