import {$, Dom} from '@/core/dom'
import {ExcelComponents} from '@core/ExcelComponent'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'
import {TState} from '@/models/TState'
import {actions} from '@/redux/rootReducer'
import {getFirstCell} from '@/core/utils'
import {getCellText} from '../table/table.utils'
import {FORMULA_ENTER} from '../table/table.resources'
import {FORMULA_ID} from './formula.resources'

/**
* Class for component Formula of page Excel
* @class Formula
* @implements {ExcelComponents}
*/
export class Formula extends ExcelComponents {
  static classContainer = 'excel__formula'
  private $formula: Dom

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['cellChangeText'],
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
    this.$formula = this.$root.findNode(FORMULA_ID)
    const firstCell = getFirstCell(this.store.getState())
    this.$formula.setElementText = getCellText(firstCell)
    // this.$on('table:select', (text: string) => {
    //   $formula.setElementText = text
    // })
    // this.$on('table:input', (text: string) => {
    //   $formula.setElementText = text
    // })

    // this.store.subscribe((state: TState) => {
    //   $formula.setElementText = state.cellChangeText.text
    // })
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
  * Function  called when store changed and component monitor changes
  * @param {TState} slice
  */
  public storeChanged = (slice: TState) => {
    this.$formula.setElementText = slice.cellChangeText.text
  }

  /**
  * Event Input
  * @param {Event} event
  */
  public onInput(event: Event) {
    const $formula = $(event.target as HTMLInputElement)
    // this.$emit('formula:input', $formula.getElementText)
    // this.store.dispatch(
    //     actions.changeText(
    //         {
    //           cellId: this.store.getState().cellChangeText.cellId,
    //           text: $formula.getElementText,
    //         },
    //     ),
    // )
    this.store.dispatch(
        actions.formulaChangeText($formula.getElementText),
    )
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
      this.$emit(FORMULA_ENTER)
    }
  }
}
