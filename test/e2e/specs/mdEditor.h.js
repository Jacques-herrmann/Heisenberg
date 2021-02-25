//
// // For authoring Nightwatch tests, see
// // http://nightwatchjs.org/guide#usage
//
// describe('MDEditor.ui.h', () => {
//     beforeEach((browser) => {
//         let page = browser.page.mdEditor();
//         page.navigate().waitForElementVisible('@app', 5000);
//         let editor = page.section.editor;
//
//         // Remove all blocks
//         editor.api.elements('@removeButton', (btn) => {
//             btn.result.value.forEach((value) => {
//                 browser.elementIdClick(value.ELEMENT).pause(50)
//             })
//         });
//
//         // Insert the first block
//         editor.click('@emptyButton');
//         editor.expect.element('@block').to.be.present;
//
//          // Select the first block
//         editor.click('.MDEditor__content');
//         // Write something on it
//         browser
//             .keys("Here is a First title block")
//             .keys(browser.Keys.ENTER)
//             .keys("Here is a Second title block")
//             .keys(browser.Keys.ENTER)
//             .keys("Here is a Third title block")
//             .keys(browser.Keys.ENTER)
//
//         // Format block
//         //H1
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[0].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[3].ELEMENT)
//         });
//         // H2
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[1].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[4].ELEMENT)
//         });
//         // H3
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[2].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[5].ELEMENT)
//         });
//
//         // Test Formula inside Title
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[2].ELEMENT, 160, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[2].ELEMENT, 220, 0)
//                 .mouseButtonUp(0)
//                 .pause(100)
//         });
//         // Click on Formula button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[5].ELEMENT)
//         });
//     });
//
//     it('should allow user to switch block with arrow key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select the first block (End of block)
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[0].ELEMENT)
//         });
//
//         // Test simple Arrow navigation
//         browser.keys(browser.Keys.LEFT_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[0].ELEMENT, block.value)
//             })
//         });
//         browser.pause(1000)
//         browser.keys(browser.Keys.RIGHT_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[0].ELEMENT, block.value)
//             })
//         });
//
//         // Test changing selected block with arrow
//         browser.keys(browser.Keys.RIGHT_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
//             })
//         });
//         browser.keys(browser.Keys.LEFT_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[0].ELEMENT, block.value)
//             });
//         });
//         browser.keys(browser.Keys.DOWN_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
//             });
//         });
//         browser.keys(browser.Keys.DOWN_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[2].ELEMENT, block.value)
//             });
//         });
//         browser.keys(browser.Keys.UP_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[1].ELEMENT, block.value)
//             });
//         });
//
//         // Test arrow navigation around formula
//        editor.api.elements('@block', (blocks) => {
//            browser
//                .elementIdClick(blocks.result.value[2].ELEMENT)
//         });
//         browser.keys(browser.Keys.LEFT_ARROW).pause(200);
//         editor.expect.element('@formulaEdit').to.be.present;
//         browser.keys(browser.Keys.LEFT_ARROW).pause(200);
//         editor.expect.element('@formulaEdit').to.not.be.present;
//
//         browser.end;
//     });
//
//     it('should allow user to split block with Enter key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select the second block and split it
//         editor.api.elements('@block', (blocks) => {
//             browser
//                 .elementIdClick(blocks.result.value[1].ELEMENT)
//                 .keys(browser.Keys.LEFT_ARROW)
//                 .keys(browser.Keys.ENTER).pause(2000)
//         });
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Second title bloc')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'k')
//             })
//             editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Third title block ')
//             });
//         })
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content", 'nodeName', 'H2');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(3) > .MDEditor__content", 'nodeName', 'P');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(4) > .MDEditor__content", 'nodeName', 'H3');
//     });
//
//     it('should allow user to merge block with Backspace key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select the first block (End of block)
//         editor.api.elements('@content', (blocks) => {
//             browser.elementIdClick(blocks.result.value[0].ELEMENT);
//         });
//         // Press right to go to the beginning of the second block and merge the blocks
//         browser
//             .keys(browser.Keys.RIGHT_ARROW)
//             .keys(browser.Keys.BACK_SPACE)
//             .pause(1000)
//
//         // Check the result
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 3);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a First title blockHere is a Second title block')
//             });
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(1) > .MDEditor__content", 'nodeName', 'H1');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content", 'nodeName', 'H3');
//
//     });
//
//     it('should allow to replace selection with a character (and not merging block if selection ended it)', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 160, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 220, 0)
//                 .mouseButtonUp(0)
//                 .keys('A');
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a First title block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a SeconAblock')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Third title block ')
//             });
//         })
//     });
//
//     it('should allow to correctly modify, add or remove Formula element', (browser) => {
//        let page = browser.page.mdEditor();
//        let editor = page.section.editor;
//
//        //Select the last block (Formula)
//        editor.api.elements('@block', (blocks) => {
//            browser
//                .elementIdClick(blocks.result.value[2].ELEMENT)
//        });
//
//        // Modify it
//        browser.keys(browser.Keys.ARROW_LEFT).pause(3000)
//        editor.expect.element('@formulaEdit').to.be.present;
//        editor.expect.element('@formulaButton').to.be.present;
//
//        editor.api.element('@formulaEdit', (input) => {
//            editor.api.elementIdClick(input.result.value.ELEMENT);
//        });
//        browser
//            .keys(browser.Keys.ARROW_RIGHT)
//            .keys(browser.Keys.BACK_SPACE)
//            .keys("cy");
//
//        editor.api.element('@formulaButton', (button) => {
//            editor.api.elementIdClick(button.result.value.ELEMENT);
//        });
//
//        editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerText' , (text) => {
//            browser.assert.equal(text.value, 'Here is a Third title bloccy ')
//        });
//        // and then remove it
//        editor.api.elements('@block', (blocks) => {
//            browser.elementIdClick(blocks.result.value[2].ELEMENT);
//        });
//        browser
//            .keys(browser.Keys.ARROW_LEFT)
//            .keys(browser.Keys.DELETE);
//
//        editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerHTML' , (html) => {
//            browser.assert.equal(html.value, 'Here is a Third title  ')
//        });
//
//        // Add a new one
//        editor.api.elements('@block', (blocks) => {
//            browser.elementIdClick(blocks.result.value[2].ELEMENT);
//        });
//        browser
//            .keys(browser.Keys.ARROW_LEFT)
//            .keys("f=ax+b")
//            .pause(100)
//
//        // Select Text
//        editor.api.elements('@content', (blocks) => {
//            browser
//                .moveTo(blocks.result.value[2].ELEMENT, 100, 0)
//                .mouseButtonDown(0)
//                .moveTo(blocks.result.value[2].ELEMENT, 150, 0)
//                .mouseButtonUp(0)
//        });
//
//        // Click on Formula button
//        editor.expect.element('@formatButton').to.be.present;
//        editor.api.elements('@formatButton', (buttons) => {
//            editor.api.elementIdClick(buttons.result.value[2].ELEMENT)
//        });
//        editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerText' , (text) => {
//            browser.assert.equal(text.value, 'Here is a Third title f=ax+b ')
//        });
//     });
//
//     it('should allow to replace selection with a \'newline\' character (Enter key)', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 130, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 190, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.ENTER)
//                 .pause(100)
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a First title block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Sec')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'tle block')
//             });
//         })
//     });
//
//     it('should allow to remove selection with the \'Delete\' key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 130, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 190, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.DELETE);
//
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a First title block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Sectle block')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Third title block ')
//             });
//         })
//     });
//
//     it('should allow to remove selection with the \'BackSpace\' key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 130, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 190, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.BACK_SPACE);
//
//         })
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a First title block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Sectle block')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a Third title block ')
//             });
//         })
//     });
//
//     it('should allow to change selection format', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[0].ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[0].ELEMENT, 100, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on bold button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
//         });
//
//         // Select Text
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 100, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on underline button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[2].ELEMENT)
//         });
//
//         // Select Text
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 110, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 140, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on strike button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[3].ELEMENT)
//         });
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'He<b>re is</b> a First title block')
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here<u> is a </u>Second title block')
//         })
//
//        // Select Text
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[0].ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[0].ELEMENT, 100, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on bold button to remove format
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
//         });
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here is a First title block')
//         })
//
//     });
//
//     it('should allow to slit and merge formatted text between block', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text
//         editor.api.elements('@content', (blocks) => {
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.result.value[1].ELEMENT, 120, 0)
//                 .mouseButtonUp(0)
//                 .pause(100)
//
//             // Click on bold button to format text (italic)
//             editor.expect.element('@formatButton').to.be.present;
//             editor.api.elements('@formatButton', (buttons) => {
//                 editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
//             })
//
//             browser
//                 .moveTo(blocks.result.value[1].ELEMENT, 90, 0)
//                 .mouseButtonClick(0)
//                 .keys(browser.Keys.ENTER)
//                 .pause(100)
//         });
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'Here is a')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, ' Second title block')
//             });
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here<i> is a</i>')
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, '<i> Se</i>cond title block')
//         })
//
//         browser.keys(browser.Keys.BACK_SPACE)
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here<i> is a Se</i>cond title block')
//         })
//     });
//
//     it('should allow to switch between block type', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//          // Select the first block (End of block)
//         editor.api.elements('@content', (blocks) => {
//             browser.elementIdClick(blocks.result.value[0].ELEMENT);
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[2].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(1) > .MDEditor__content", 'nodeName', 'P');
//
//         editor.api.elements('@content', (blocks) => {
//             browser.elementIdClick(blocks.result.value[1].ELEMENT);
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[3].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content", 'nodeName', 'H1');
//
//         editor.api.elements('@content', (blocks) => {
//             browser.elementIdClick(blocks.result.value[2].ELEMENT);
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[14].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(3) > .MDEditor__content", 'nodeName', 'OL');
//
//     });
//
// });
