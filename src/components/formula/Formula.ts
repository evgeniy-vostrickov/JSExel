import {$, Dom} from '@/core/dom'
import {ExcelComponents} from '@core/ExcelComponent'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'

/**
* Class for component Formula of page Excel
* @class Formula
* @implements {ExcelComponents}
*/
export class Formula extends ExcelComponents {
  static classContainer = 'excel__formula'

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  /**
  * Prepare for initialization.
  */
  public prepare() {}

  /**
  * Init the object.
  */
  public init() {
    super.init()
    const $formula = this.$root.findNode('#formula')
    this.$on('table:select', (text: string) => {
      $formula.setElementText = text
    })
    this.$on('table:input', (text: string) => {
      $formula.setElementText = text
    })
  }

  /**
  * Conversion to HTML.
  * @return {string} The sum of the two numbers.
  */
  public toHTML = () => {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  /**
  * Event Input
  * @param {Event} event
  */
  public onInput(event: Event) {
    const $formula = $(event.target as HTMLInputElement)
    this.$emit('formula:input', $formula.getElementText)
  }

  /**
  * Event MouseDown
  * @param {Event} event
  */
  public onKeydown(event: Event) {
    const keyEvent = (event as KeyboardEvent)
    const keyList = ['Enter', 'Tab']
    if (keyList.includes(keyEvent.key)) {
      keyEvent.preventDefault()
      this.$emit('formula:enter')
    }
  }
}
