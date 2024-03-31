import {Dom} from '@/core/dom'
import {TState} from '@/models/TState'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'
import {actions} from '@/redux/rootReducer'
import {ExcelComponents} from '@core/ExcelComponent'
import {getTableTitle} from './table.utils'
import {debounce} from '@/core/utils'

/**
 * Class for component Header of page Excel
 * @class Header
 * @implements {ExcelComponents}
 */
export class Header extends ExcelComponents {
  static classContainer = 'excel__header'

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: [],
      ...options,
    })
  }

  /**
  * Prepare for initialization.
  */
  public prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  /**
  * Conversion to HTML.
  * @return {string} The sum of the two numbers.
  */
  public toHTML = () => {
    const title = getTableTitle(this.store.getState())
    return `
        <input type="text" id="table-titile" class="excel__header-input" 
          value="${title}" />

        <div>

          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>

        </div>
    `
  }

  /**
  * Function  called when store changed and component monitor changes
  * @param {TState} slice
  */
  public storeChanged = (slice: TState) => {
    console.log('Header', slice)
  }

  /**
  * Function called when an user changes a table title
  * @param {Event} event
  */
  onInput(event: Event): void {
    const title = (event.target as HTMLInputElement).value
    this.$dispatch(actions.changeTableTitle(title))
    console.log('onInput')
  }
}
