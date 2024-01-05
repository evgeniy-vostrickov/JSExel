import {Dom} from '@/core/dom';
import {ExcelComponents} from '@core/ExcelComponent';

/**
 * Class for component Toolbar of page Excel
 * @class Toolbar
 * @implements {ExcelComponents}
 */
export class Toolbar extends ExcelComponents {
  static classContainer = 'excel__toolbar'

  /**
  * @constructor
  * @param {Dom} $root
  */
  constructor($root: Dom) {
    super($root, {
      name: 'Toolbar',
      listeners: [],
    })
  }

  /**
* Conversion to HTML.
* @return {string} The sum of the two numbers.
*/
  public toHTML = () => {
    return `
    <div class="button">
      <i class="material-icons">format_align_left</i>
    </div>

    <div class="button">
      <i class="material-icons">format_align_center</i>
    </div>

    <div class="button">
      <i class="material-icons">format_align_right</i>
    </div>

    <div class="button">
      <i class="material-icons">format_bold</i>
    </div>

    <div class="button">
      <i class="material-icons">format_italic</i>
    </div>

    <div class="button">
      <i class="material-icons">format_underlined</i>
    </div>
    `
  }
}
