import {ExcelComponents} from '@core/ExcelComponent'
import {createTable} from './table.template'

/**
 * Class for component Table of page Excel
 * @class Table
 * @implements {ExcelComponents}
 */
export class Table extends ExcelComponents {
  static classContainer = 'excel__table';
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
    return createTable()
  }
}
