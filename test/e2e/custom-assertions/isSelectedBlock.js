/**
 * Assert the currently selected block index
 *
 * Example usage:
 *   browser.assert.isSelectedBlock(index)
 *
 * @param index
 */


exports.assertion = function isSelectedBlock (index) {

  // If the custom commands operates with DOM elements, this options should be set
  this.options = {
    elementSelector: true
  };

  /**
   * Returns the message format which will be used to output the message in the console and also
   *  the arguments which will be used for replace the place holders, used in the order of appearance
   *
   * The message format also takes into account whether the .not negate has been used
   *
   * @return {{args: [], message: string}}
   */
   this.formatMessage = function() {
     // Use this.negate to determine if ".not" is in use
     // Example:
     const message = `Testing if the selected block index ${this.negate ? 'doesn\'t equal to %s' : 'equals to %s'}`;

     return {
       message,
       args: [`'${index}'`]
     }
   };

  /**
    * Returns the expected value of the assertion which is displayed in the case of a failure
    *
    * @return {string}
    */
   this.expected = function() {
     return this.negate ? `is not '${index}'` : `is '${index}'`;
   };

   /**
    * Given the value, the condition used to evaluate if the assertion is passed
    * @param {*} value
    * @return {Boolean}
    */
   this.evaluate = function(selectedID, blocks) {
     return selectedID === blocks[index].ELEMENT;
   };

  /**
    * Called with the result object of the command to retrieve the value which is to be evaluated
    *
    * @param {Object} result
    * @return {*}
    */
   this.value = function(result) {
     return result.value;
   };

  /**
    * When defined, this method is called by the assertion runner with the command result, to determine if the
    *  value can be retrieved successfully from the result object
    *
    * @param result
    * @return {boolean|*}
    */
   // this.failure = function(result) {
   //   return result === false || result && result.status === -1;
   // };

   /**
    * When defined, this method is called by the assertion runner with the command result to determine the actual
    *  state of the assertion in the event of a failure
    *
    * @param {Boolean} passed
    * @return {string}
    */
   // this.actual = function(passed) {
   //   return passed ? `contains '${expectedText}'` : `does not contain '${expectedText}'`;
   // };

  /**
    * The command which is to be executed by the assertion runner; Nightwatch api is available as this.api
    * @param {function} callback
    */
  this.command = function(callback) {
      // Example: this.api.getText(definition, callback);
      let page = this.api.page.mdEditor();
      let editor = page.section.editor;
      editor.api.element('@selectedBlock', (block) => {
          editor.api.elements('@block', (blocks) => {
              this.api.execute(this.evaluate(block.value, blocks.result.value), [block.value, blocks.result.value], callback)
          })
      })
  };
};