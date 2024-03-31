import {Options, TComponentsObjects} from '@/index'
import {$} from '@core/dom'
import {Emitter} from '@/core/Emitter'
import {StoreSubscriber} from '@/core/StoreSubscriber'

/**
 * Class for page Excel
 * @class Excel
 */
export class Excel {
  private $element
  private listComponents
  private store
  private emitter
  private subscriber
  private components: TComponentsObjects
  /**
* Constructor
* @param {string} selector The selector for render.
* @param {Options} options The array of compontns page Excel.
*/
  constructor(selector: string, options: Options) {
    this.$element = $(selector)
    this.listComponents = options.components
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }
  /**
* @return {HTMLElement} Root Element which join components to the page Excel.
*/
  getRoot() {
    const $root = $.createElement('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }
    this.components = this.listComponents.map((Component) => {
      const $compontNode = $.createElement('div', Component.classContainer)
      const component = new Component($compontNode, componentOptions)
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
    this.$element.append(this.getRoot())
    this.components.forEach((component) => component.init())
    this.subscriber.subscribeComponents(this.components)
  }
  /**
* Function destroy page Excel.
*/
  destroy() {
    this.components.forEach((component) => component.destroy())
    this.subscriber.unsubscribeFromStore()
  }
}
