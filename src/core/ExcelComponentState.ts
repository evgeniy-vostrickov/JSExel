import {ExcelComponents} from './ExcelComponent'
import {Dom} from './dom'
import TypeOptionsExcelComponent from '@/models/TypeOptionsExcelComponent'

/**
 * Class for component Toolbar of page Excel
 * @class Toolbar
 * @extends {ExcelComponents}
 */
export abstract class ExcelComponentsState<T> extends ExcelComponents {
  protected state: T
  /**
  * @constructor
  * @param {Dom} $root
  * @param {Object} options
  */
  constructor($root: Dom, options: TypeOptionsExcelComponent) {
    super($root, options)
  }

  /**
  * Prepare for initialization.
  * @param {unknown} state
  */
  protected initialState(state: T) {
    this.state = {...state}
  }

  /**
  * Template return HTML.
  */
  protected abstract template(): string

  /**
  * Update current state.
  * @param {any} newValueState
  */
  protected setState<T>(newValueState: T) {
    this.state = {...this.state, ...newValueState}
    this.$root.html(this.toHTML())
  }
}
