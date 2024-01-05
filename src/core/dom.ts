

/**
 * Class for work with Dom
 * @class Dom
 */
export class Dom {
  private $element
  /**
* @constructor
* @param {string | HTMLElement} selector
*/
  constructor(selector: string | HTMLElement) {
    this.$element = typeof selector === 'string' ?
      document.querySelector(selector) as HTMLElement :
      selector as HTMLElement
  }

  /**
   * Getter and setter for Node.
* @param {string | HTMLElement} html
* @return {Dom | string}
*/
  public html(html: string | HTMLElement): Dom | string {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }
    return this.$element.outerHTML.trim()
  }

  /**
* @return {Dom}
*/
  public clear() {
    this.html('')
    return this
  }

  /**
* @param {string} eventType
* @param {Function} listener
*/
  public on(eventType: keyof HTMLElementEventMap,
      listener: EventListener) {
    this.$element.addEventListener(eventType, listener)
  }

  /**
* @param {string} eventType
* @param {Function} listener
*/
  public off(eventType: keyof HTMLElementEventMap,
      listener: EventListener) {
    this.$element.removeEventListener(eventType, listener)
  }

  /**
* @param {HTMLElement} node
* @return {Dom}
*/
  public append(node: HTMLElement | Dom) {
    if (node instanceof Dom) {
      node = node.$element
    }

    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }

    return this
  }
}

/**
* @param {string} selector
* @return {Dom}
*/
export const $ = (selector: string | HTMLElement) => {
  return new Dom(selector)
}

/**
* @param {string} tagName
* @param {string} className
* @return {HTMLElement}
*/
$.createElement = (tagName: string, className: string) => {
  const $el = document.createElement(tagName)
  $el.classList.add(className)
  return $($el)
}
