import {ExcelComponents} from '@core/ExcelComponent';

/**
* Class for component Formula of page Excel
* @class Formula
* @implements {ExcelComponents}
*/
export class Formula extends ExcelComponents {
  static classContainer = 'excel__formula';

  /**
* @constructor
* @param {Dom} $root
*/
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }
  /**
* Get the container class name.
* @return {string}
*/
  // getClassContainer = () => {
  //   return this.#classContainer;
  // }
  /**
* Conversion to HTML.
* @return {string} The sum of the two numbers.
*/
  toHTML = () => {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  /**
* Event Input
* @param {Event} event
*/
  onInput(event) {
    console.log('Formula: onInput', event)
  }
}
