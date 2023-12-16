import {ExcelComponents} from '@core/ExcelComponent';

/**
 * Class for component Header of page Excel
 * @class Header
 * @implements {ExcelComponents}
 */
export class Header extends ExcelComponents {
  static classContainer = 'excel__header';
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
        <input type="text" class="excel__header-input" value="Новая таблица" />

        <div>

          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>

        </div>
    `
  }
}
