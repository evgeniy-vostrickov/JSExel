import {ExcelComponents} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {Dom} from '@/core/dom'

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
      listeners: [],
    })
  }

  /**
  * Conversion to HTML.
  * @return {string} The sum of the two numbers.
  */
  public toHTML = () => {
    return createTable()
  }
}
