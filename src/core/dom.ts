interface IStyles {
  [key: string]: string | number;
}

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
  * Getter $element.
  * @return {HTMLElement}
  */
  get getElement(): HTMLElement {
    return this.$element
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
  public clear(): Dom {
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
  public append(node: HTMLElement | Dom): Dom {
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

  /**
* Find parent element by selector
* @param {string} selector
* @return {Dom}
*/
  public closest(selector: string): Dom {
    return $(this.$element.closest<HTMLElement>(selector))
  }

  /**
* Get coords $element
* @return {DOMRect}
*/
  getCoords(): DOMRect {
    return this.$element.getBoundingClientRect()
  }

  /**
  * Get data-attribute
  * @param {string} attribute
  * @return {string}
  */
  public getDataAttribute(attribute: string): string {
    return this.$element.dataset[attribute]
  }

  /**
  * Get data-attribute
  * @param {string} selector
  * @return {Array<HTMLElement>}
  */
  public findAllNode(selector: string): Array<HTMLElement> {
    return Array.from(this.$element.querySelectorAll<HTMLElement>(selector))
  }

  /**
  * Get data-attribute
  * @param {string} styles
  */
  public addStyles(styles: IStyles) {
    for (const [property, value] of Object.entries(styles)) {
      if (styles.hasOwnProperty(property)) {
        this.$element.style[property as keyof CSSStyleDeclaration] = value
      }
    }
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
