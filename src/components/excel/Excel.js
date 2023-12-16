// import {$} from "../../core/dom"
import {$} from '@core/dom'

/**
 * Class for page Excel
 * @class Excel
 */
export class Excel {
  /**
* Constructor
* @param {string} selector The selector for render.
* @param {Array<ExcelComponents>} options The array of compontns page Excel.
*/
  constructor(selector, options) {
    this.$element = $(selector)
    this.components = options.components || []
  }
  /**
* @return {HTMLElement} Root Element which join components to the page Excel.
*/
  getRoot() {
    const $root = $.createElement('div', 'excel')
    this.components = this.components.map((Component) => {
      const $compontNode = $.createElement('div', Component.classContainer)
      const component = new Component($compontNode)
      // component.name ? window['c' + component.name] = component : ''
      $compontNode.html(component.toHTML())
      $root.append($compontNode)

      return component
    })
    return $root
  }
  /**
* Function render page Excel.
*/
  render() {
    this.$element.append(this.getRoot());
    this.components.forEach((component) => component.init())
  }
  /**
* Function destroy page Excel.
*/
  destroy() {
    this.components.forEach((component) => component.destroy())
  }
}
