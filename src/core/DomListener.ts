import {capitalize} from '@core/utils'
import {Dom} from './dom'

interface EventListenerSignatureInterface {
  onInput: EventListener
}
/**
 * Abstract Class for describes signature event listener
 */
abstract class ListenerSignature implements EventListenerSignatureInterface {
  /**
* Event Input
* @param {Event} event
*/
  onInput(event: Event): void {
    throw new Error(`Method onInput() is not implemented. Event: ${event}`)
  }
}

/**
 * Abstract Class for setting events
 */
export abstract class DomListener extends ListenerSignature {
  protected name: string
  /**
* @constructor
* @param {Dom} $root
* @param {Array<string>} listeners
*/
  constructor(protected $root: Dom,
    private listeners: Array<keyof HTMLElementEventMap> = []) {
    super()
  }

  /**
* Add new event listener for elements class ExcelComponent.
*/
  protected initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener)
      const methodListener = this[methodName]
      if (typeof methodListener !== 'function') {
        const name = this.name || ''
        throw new Error(`Method ${methodName} is not 
        implemented in ${name} Component`)
      }

      const newMethod = methodListener.bind(this)
      this[methodName] = newMethod

      this.$root.on(listener, this[methodName])
    })
  }

  /**
* Remove event listener for elements class ExcelComponent.
*/
  protected removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener)
      const methodListener = this[methodName]
      if (typeof methodListener !== 'function') {
        const name = this.name || ''
        throw new Error(`Method ${methodName} is not 
        implemented in ${name} Component`)
      }

      this.$root.off(listener, methodListener)
    })
  }

  /**
  * Event Input
  * @param {Event} event
  */
  // protected abstract onInput(event: Event): void
}

/**
* Convert event name to function name
* @param {HTMLElementEventMap} eventName
* @return {string}
*/
function getMethodName(eventName: keyof HTMLElementEventMap):
  keyof EventListenerSignatureInterface {
  return 'on' + capitalize(eventName) as keyof EventListenerSignatureInterface
}
