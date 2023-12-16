import {ExcelComponents} from '@core/ExcelComponent';

/**
 * Class for component Toolbar of page Excel
 * @class Toolbar
 * @implements {ExcelComponents}
 */
export class Toolbar extends ExcelComponents {
  static classContainer = 'excel__toolbar';
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
