import {DomListener} from '@core/DomListener';

/**
 * Abstract Class for defining general behavior of components.
 *
 * @interface ExcelComponents
 * @since 1.0.0
 */
export class ExcelComponents extends DomListener {
  /**
* @constructor
* @param {Dom} $root
* @param {Object} options
*/
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  /**
* Get the container class name.
*/
  getClassContainer = () => {
    throw new Error('Method getClassContainer() must be implemented.');
  }

  /**
* Conversion to HTML.
*/
  toHTML = () => {
    throw new Error('Method toHTML() must be implemented.');
  }

  /**
* Init the object.
*/
  init() {
    this.initDOMListeners()
  }

  /**
* Delete the object.
*/
  destroy() {
    this.removeDOMListeners()
  }
}
