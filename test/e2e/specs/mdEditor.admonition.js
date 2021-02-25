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
//         // Select the first block
//         editor.click('.MDEditor__content');
//         // Write something on it
//         browser
//             .keys("Here is an info block")
//             .keys(browser.Keys.ENTER)
//             .keys("Here is a warning block")
//             .keys(browser.Keys.ENTER)
//             .keys("Here is a danger block")
//             .keys(browser.Keys.ENTER)
//
//         // Format block
//         //INFO
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[0].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[17].ELEMENT)
//         });
//         // WARNING
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[1].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[18].ELEMENT)
//         });
//         // DANGER
//         editor.api.elements('@block', (blocks) => {
//             browser.elementIdClick(blocks.result.value[2].ELEMENT)
//         });
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[19].ELEMENT)
//         });
//
//         // Test Formula inside Admonition
//
//
//         browser.element('css selector', '.MDEditor__md-block:nth-child(3) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 120, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 150, 0)
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
//         browser.click('.MDEditor__md-block:nth-child(1) > .MDEditor__content > p')
//
//         // Test simple Arrow navigation
//         browser.keys(browser.Keys.LEFT_ARROW);
//         editor.api.element('@selectedBlock', (block) => {
//             editor.api.elements('@block', (blocks) => {
//                 browser.assert.equal(blocks.result.value[0].ELEMENT, block.value)
//             })
//         });
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
//         browser.click('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p')
//
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
//         browser
//             .click('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p')
//             .keys(browser.Keys.LEFT_ARROW)
//             .keys(browser.Keys.ENTER).pause(2000)
//
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a warning bloc')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'k')
//             })
//             editor.api.elementIdText(blocks.result.value[3].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'DANGER\n Here is a danger block ')
//             });
//         })
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content > div", 'innerText', 'WARNING');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(3) > .MDEditor__content", 'nodeName', 'P');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(4) > .MDEditor__content > div", 'innerText', 'DANGER');
//     });
//
//     it('should allow user to merge block with Backspace key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select the second block (End  of block) and press right to go to the beginning of the second block and merge the blocks
//         browser
//             .click('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p')
//             .keys(browser.Keys.RIGHT_ARROW).pause(1000)
//             .keys(browser.Keys.BACK_SPACE).pause(1000)
//
//         // Check the result
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 3);
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a warning blockHere is a danger block ')
//             });
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(1) > .MDEditor__content > div", 'innerText', 'INFO');
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content > div", 'innerText', 'WARNING');
//
//     });
//
//     it('should allow to replace selection with a character (and not merging block if selection ended it)', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 110, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 220, 0)
//                 .mouseButtonUp(0)
//                 .keys('A');
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'INFO\n Here is an info block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a warninA')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'DANGER\n Here is a danger block ')
//             });
//         })
//     });
//
//     it('should allow to correctly modify, add or remove Formula element', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         //Select the last block (Formula)
//         browser
//             .click('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p')
//             .keys(browser.Keys.ARROW_LEFT)
//
//         editor.expect.element('@formulaEdit').to.be.present;
//         editor.expect.element('@formulaButton').to.be.present;
//
//         editor.api.element('@formulaEdit', (input) => {
//             editor.api.elementIdClick(input.result.value.ELEMENT);
//         });
//         browser
//             .keys(browser.Keys.ARROW_RIGHT)
//             .keys(browser.Keys.BACK_SPACE)
//             .keys("cy");
//
//         editor.api.element('@formulaButton', (button) => {
//             editor.api.elementIdClick(button.result.value.ELEMENT);
//         });
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p', 'innerText' , (text) => {
//             browser.assert.equal(text.value, 'Here is a danger bloccy ')
//         });
//
//         // and then remove it
//        browser
//             .click('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p')
//             .keys(browser.Keys.ARROW_LEFT)
//             .keys(browser.Keys.DELETE).pause(3000);
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p', 'innerHTML' , (html) => {
//             browser.assert.equal(html.value, 'Here is a danger  ')
//         });
//
//         // Add a new one
//         browser
//             .click('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p')
//             .keys(browser.Keys.ARROW_LEFT)
//             .keys("f=ax+b")
//             .pause(100)
//
//         // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(3) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 110, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 150, 0)
//                 .mouseButtonUp(0)
//         });
//
//         // Click on Formula button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[2].ELEMENT)
//         });
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p', 'innerText' , (text) => {
//             browser.assert.equal(text.value, 'Here is a danger f=ax+b ')
//         });
//     });
//
//     it('should allow to replace selection with a \'newline\' character (Enter key)', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 90, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 130, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.ENTER)
//                 .pause(100)
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'INFO\n Here is an info block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a wa')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'lock')
//             });
//         })
//     });
//
//     it('should allow to remove selection with the \'Delete\' key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 90, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 130, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.DELETE)
//                 .pause(100)
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'INFO\n Here is an info block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a walock')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'DANGER\n Here is a danger block ')
//             });
//         })
//     });
//
//     it('should allow to remove selection with the \'BackSpace\' key', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text and replace by a character
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 90, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 130, 0)
//                 .mouseButtonUp(0)
//                 .keys(browser.Keys.BACK_SPACE)
//                 .pause(100)
//         })
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 4);
//             editor.api.elementIdText(blocks.result.value[0].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'INFO\n Here is an info block')
//             });
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a walock')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'DANGER\n Here is a danger block ')
//             });
//         })
//     });
//
//     it('should allow to change selection format', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(1) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 110, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on bold button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
//         });
//
//         // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 100, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on underline button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[2].ELEMENT)
//         });
//
//         // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 110, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 140, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on strike button
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[3].ELEMENT)
//         });
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content > p', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here <b>is an info </b>block')
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here <u>is a warn</u>ing block')
//         })
//
//        // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(1) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 110, 0)
//                 .mouseButtonUp(0)
//         });
//         // Click on bold button to remove format
//         editor.expect.element('@formatButton').to.be.present;
//         editor.api.elements('@formatButton', (buttons) => {
//             editor.api.elementIdClick(buttons.result.value[0].ELEMENT)
//         });
//
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(1) > .MDEditor__content > p', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here is an info block')
//         })
//
//     });
//
//     it('should allow to slit and merge formatted text between block', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//         // Select Text
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 45, 0)
//                 .mouseButtonDown(0)
//                 .moveTo(blocks.value.ELEMENT, 120, 0)
//                 .mouseButtonUp(0)
//                 .pause(100)
//
//             // Click on bold button to format text (italic)
//             editor.expect.element('@formatButton').to.be.present;
//             editor.api.elements('@formatButton', (buttons) => {
//                 editor.api.elementIdClick(buttons.result.value[1].ELEMENT)
//             })
//         });
//         browser.click('.MDEditor__md-block:nth-child(1) > .MDEditor__content > p').pause(500)
//         browser.element('css selector', '.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', (blocks) => {
//             browser
//                 .moveTo(blocks.value.ELEMENT, 90, 0)
//                 .mouseButtonClick(0)
//                 .keys(browser.Keys.ENTER)
//                 .pause(1000)
//         });
//
//
//         editor.api.elements('@content', (blocks) => {
//             browser.assert.equal(blocks.result.value.length, 5);
//             editor.api.elementIdText(blocks.result.value[1].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'WARNING\n Here is a wa')
//             });
//             editor.api.elementIdText(blocks.result.value[2].ELEMENT, (text) => {
//                 browser.assert.equal(text.value, 'rning block')
//             });
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here <i>is a wa</i>')
//         })
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(3) > .MDEditor__content', 'innerHTML' ,(html) => {
//             console.log(html);
//             browser.assert.equal(html.value, '<i>rning</i> block')
//         })
//
//         browser.keys(browser.Keys.BACK_SPACE)
//         editor.api.getElementProperty('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p', 'innerHTML' ,(html) => {
//             browser.assert.equal(html.value, 'Here <i>is a warning</i> block')
//         })
//     });
//
//     it('should allow to switch between block type', (browser) => {
//         let page = browser.page.mdEditor();
//         let editor = page.section.editor;
//
//          // Select the first block (End of block)
//         browser.click('.MDEditor__md-block:nth-child(1) > .MDEditor__content > p')
//
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[2].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(1) > .MDEditor__content", 'nodeName', 'P');
//
//         browser.click('.MDEditor__md-block:nth-child(2) > .MDEditor__content > p')
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[3].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(2) > .MDEditor__content", 'nodeName', 'H1');
//
//        browser.click('.MDEditor__md-block:nth-child(3) > .MDEditor__content > p')
//         editor.api.elements('@controls', (button) => {
//             browser.elementIdClick(button.result.value[14].ELEMENT)
//         });
//         browser.assert.domPropertyEquals(".MDEditor__md-block:nth-child(3) > .MDEditor__content", 'nodeName', 'OL');
//
//     });
//
// });