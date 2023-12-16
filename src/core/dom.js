/**
 * Class for work with Dom
 * @class Dom
 */
class Dom {
  /**
* @constructor
* @param {string | HTMLElement} selector
*/
  constructor(selector) {
    this.$element = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  /**
   * Getter and setter for Node.
* @param {string | HTMLElement} html
* @return {Dom | string}
*/
  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }
    return this.$element.outerHTML.trim()
  }

  /**
* @return {Dom}
*/
  clear() {
    this.html('')
    return this
  }

  /**
* @param {string} eventType
* @param {Function} callback
*/
  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback)
  }

  /**
* @param {string} eventType
* @param {Function} callback
*/
  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback)
  }

  /**
* @param {HTMLElement} node
* @return {Dom}
*/
  append(node) {
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
export const $ = (selector) => {
  return new Dom(selector)
}

/**
* @param {string} tagName
* @param {string} className
* @return {HTMLElement}
*/
$.createElement = (tagName, className) => {
  const $el = document.createElement(tagName)
  $el.classList.add(className)
  return $($el)
}
