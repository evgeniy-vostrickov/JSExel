import {Dom} from '@/core/dom';
import TypeOptionsComponent from '@/models/TypeOptionsComponent';
import {ExcelComponents} from '@core/ExcelComponent';

/**
 * Class for component Header of page Excel
 * @class Header
 * @implements {ExcelComponents}
 */
export class Header extends ExcelComponents {
  static classContainer = 'excel__header'

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options,
    })
  }

  /**
  * Prepare for initialization.
  */
  public prepare() {}

  /**
* Conversion to HTML.
* @return {string} The sum of the two numbers.
*/
  public toHTML = () => {
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
