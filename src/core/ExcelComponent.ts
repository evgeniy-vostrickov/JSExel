import {DomListener} from '@core/DomListener';
import {Dom} from './dom';

type TypeOptions = {
  name: string
  listeners: Array<keyof HTMLElementEventMap>
}

/**
 * Abstract Class for defining general behavior of components.
 *
 * @interface ExcelComponents
 * @since 1.0.0
 */
export abstract class ExcelComponents extends DomListener {
  /**
* @constructor
* @param {Dom} $root
* @param {Object} options
*/
  constructor($root: Dom, options: TypeOptions) {
    super($root, options.listeners)
    this.name = options.name
  }

  /**
* Conversion to HTML.
* @return {string}
*/
  public abstract toHTML(): string

  /**
* Init the object.
*/
  public init() {
    this.initDOMListeners()
  }

  /**
* Delete the object.
*/
  public destroy() {
    this.removeDOMListeners()
  }
}
