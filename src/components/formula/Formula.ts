import {Dom} from '@/core/dom';
import {ExcelComponents} from '@core/ExcelComponent';

/**
* Class for component Formula of page Excel
* @class Formula
* @implements {ExcelComponents}
*/
export class Formula extends ExcelComponents {
  static classContainer = 'excel__formula'

  /**
* @constructor
* @param {Dom} $root
*/
  constructor($root: Dom) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  /**
* Conversion to HTML.
* @return {string} The sum of the two numbers.
*/
  public toHTML = () => {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  /**
* Event Input
* @param {Event} event
*/
  public onInput(event: Event) {
    console.log('Formula: onInput', event, this)
  }
}
