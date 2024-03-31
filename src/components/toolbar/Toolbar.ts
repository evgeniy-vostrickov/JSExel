import {$, Dom} from '@/core/dom'
import {TState} from '@/models/TState'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'
import {createToolbar} from './toolbar.template'
import {PartialButtonStyle, TButtonOption,
  TButtonStyle} from '@/models/TButtonOption'
import {ExcelComponentsState} from '@/core/ExcelComponentState'
import {actions} from '@/redux/rootReducer'
import {getToolbarInitialState, setToolbarInitialState} from './toolbar.utils'
import {checkForStyles, convertStringToStyleObject} from '../table/table.utils'
import {getFirstCell, isEmptyObject} from '@/core/utils'

/**
 * Class for component Toolbar of page Excel
 * @class Toolbar
 * @implements {ExcelComponents}
 */
export class Toolbar extends ExcelComponentsState<TButtonStyle> {
  static classContainer = 'excel__toolbar'

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  /**
  * Prepare for initialization.
  */
  public prepare() {
    const firstCell = getFirstCell(this.store.getState())
    if (checkForStyles(firstCell)) {
      const styleObjectFirstCell = convertStringToStyleObject(firstCell.style)
      this.initialState(setToolbarInitialState(styleObjectFirstCell))
    } else {
      this.initialState(getToolbarInitialState())
    }
  }

  /**
  * Template return HTML.
  * @return {string}
  */
  protected template(): string {
    const buttons = <TButtonOption[]>[
      {
        typeButton: 'format_align_left',
        active: this.state.textAlign === 'left',
        value: {
          textAlign: 'left',
        },
      },
      {
        typeButton: 'format_align_center',
        active: this.state.textAlign === 'center',
        value: {
          textAlign: this.state.textAlign === 'center' ?
          'left' :
          'center',
        },
      },
      {
        typeButton: 'format_align_right',
        active: this.state.textAlign === 'right',
        value: {
          textAlign: this.state.textAlign === 'right' ?
          'left' :
          'right',
        },
      },
      {
        typeButton: 'format_bold',
        active: this.state.fontWeight === 'bold',
        value: {
          fontWeight: this.state.fontWeight === 'normal' ?
          'bold' :
          'normal',
        },
      },
      {
        typeButton: 'format_italic',
        active: this.state.fontStyle === 'italic',
        value: {
          fontStyle: this.state.fontStyle === 'normal' ?
          'italic' :
          'normal',
        },
      },
      {
        typeButton: 'format_underlined',
        active: this.state.textDecoration === 'underline',
        value: {
          textDecoration: this.state.textDecoration === 'none' ?
          'underline' :
          'none',
        },
      },
    ]
    return createToolbar(buttons)
  }

  /**
  * Conversion to HTML.
  * @return {string} The sum of the two numbers.
  */
  public toHTML = () => {
    return this.template()
  }

  /**
  * Init the component (add listeners).
  */
  init() {
    super.init()
  }

  /**
  * Function  called when store changed and component monitor changes
  * @param {TState} slice
  */
  public storeChanged = (slice: TState) => {
    if (isEmptyObject(slice.currentStyles)) {
      this.setState<PartialButtonStyle>(getToolbarInitialState())
    } else {
      this.setState<PartialButtonStyle>({...getToolbarInitialState(),
        ...slice.currentStyles})
    }
  }

  /**
  * The button on the toolbar click handling
  * @param {Dom | null} button
  */
  public handlerButtonClick = (button: Dom | null) => {
    if (button) {
      const style = convertStringToStyleObject(button.getDataAttribute('value'))
      button.toggleStyleClasses('active')
      this.setState<PartialButtonStyle>(style)
      this.$dispatch(actions.changeStyles(style))
    }
  }

  /**
  * Function  called when store changed and component monitor changes
  * @param {Event} event
  */
  public onClick = (event: Event) => {
    const target = $(event.target as HTMLElement)
    const button = target.closest('[data-type="button"]')
    this.handlerButtonClick(button)
  }
}
