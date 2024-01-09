import {ExcelComponents} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {Dom} from '@/core/dom'
import resizeHandler from './table.resize'

/**
 * Class for component Table of page Excel
 * @class Table
 * @implements {ExcelComponents}
 */
export class Table extends ExcelComponents {
  static classContainer = 'excel__table'

  /**
  * @constructor
  * @param {Dom} $root
  */
  constructor($root: Dom) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  /**
  * Conversion to HTML.
  * @return {string} The sum of the two numbers.
  */
  public toHTML = () => {
    return createTable()
  }

  /**
  * Change dimension row or column.
  * @param {Event} event The sum of the two numbers.
  */
  public onMousedown = (event: Event) => {
    resizeHandler(this.$root, event)
  }

  /**
  * Change dimension row or column.
  * @param {Event} event The sum of the two numbers.
  */
  // public onMouseup = (event: Event) => {
  // }

  /**
  * Change dimension row or column.
  * @param {Event} event The sum of the two numbers.
  */
  // public onMousemove = (event: Event) => {
  // }
}
