import {capitalize} from '@core/utils'

/**
 * Class for setting events
 */
export class DomListener {
  /**
* @constructor
* @param {Dom} $root
* @param {Array<String>} listeners
*/
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  /**
* Add new event listener for elements class ExcelComponent.
*/
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not 
        implemented in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  /**
* Remove event listener for elements class ExcelComponent.
*/
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not 
        implemented in ${name} Component`)
      }
      this.$root.off(listener, this[method])
    })
  }
}

/**
* Convert event name to function name
* @param {string} eventName
* @return {string}
*/
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
