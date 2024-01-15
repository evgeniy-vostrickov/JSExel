import {Options} from '@/index'
import {$} from '@core/dom'
import {Header} from '../header/Header'
import {Toolbar} from '../toolbar/Toolbar'
import {Formula} from '../formula/Formula'
import {Table} from '../table/Table'
import {Emitter} from '@/core/Emitter'

/**
 * Class for page Excel
 * @class Excel
 */
export class Excel {
  private $element
  private listComponents
  private emitter
  private components: (Header | Toolbar | Formula | Table)[]
  /**
* Constructor
* @param {string} selector The selector for render.
* @param {Options} options The array of compontns page Excel.
*/
  constructor(selector: string, options: Options) {
    this.$element = $(selector)
    this.listComponents = options.components
    this.emitter = new Emitter()
  }
  /**
* @return {HTMLElement} Root Element which join components to the page Excel.
*/
  getRoot() {
    const $root = $.createElement('div', 'excel')
    this.components = this.listComponents.map((Component) => {
      const $compontNode = $.createElement('div', Component.classContainer)
      const component = new Component($compontNode, {emitter: this.emitter})
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
