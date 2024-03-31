import {ExcelComponents} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {$, Dom} from '@/core/dom'
import resizeHandler from './table.resize'
import {TableSelection} from './TableSelection'
import {FORMULA_ENTER, selectorCellFirst} from './table.resources'
import {getCellIds, getCellSelector, getColumnSelector, getRowSelector,
  isResize, isSelectCell, isWithinTable, rangeCellGroup} from './table.utils'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'
import {actions} from '@/redux/rootReducer'
import {TABLE_ROW_RESIZE, TABLE_COL_RESIZE} from '@/redux/types'
import {TState} from '@/models/TState'
import {convertFormulaToValue} from '@/core/utils'

/**
 * Class for component Table of page Excel
 * @class Table
 * @implements {ExcelComponents}
 */
export class Table extends ExcelComponents {
  static classContainer = 'excel__table'
  private tableSelection: TableSelection

  /**
  * @constructor
  * @param {Dom} $root
  * @param {TypeOptionsComponent} options
  */
  constructor($root: Dom, options: TypeOptionsComponent) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'change'],
      subscribe: ['formulaText', 'currentStyles'],
      ...options,
    })
  }

  /**
  * Prepare for initialization.
  */
  public prepare() {
    this.tableSelection = new TableSelection()
  }

  /**
  * Get data from localStorage and change table.
  */
  public changeTableFromState() {
    const rowState = this.store.getState().rowState
    for (const [idRow, heightRow] of Object.entries(rowState)) {
      const $row = this.$root.findNode(getRowSelector(idRow))
      $row.addStyles({height: `${heightRow}px`})
    }
    const colState = this.store.getState().colState
    for (const [idCol, widthCol] of Object.entries(colState)) {
      const $col = this.$root.findNode(getColumnSelector(idCol))
      $col.addStyles({width: `${widthCol}px`})

      const listCell = this.$root.findAllNode(getColumnSelector(idCol))
      listCell.forEach((cell) => $(cell).addStyles({width: `${widthCol}px`}))
    }
  }

  /**
  * Get the active cells.
  * @return {Dom | Dom[]}
  */
  public getActiveCells(): Dom | Dom[] {
    return this.tableSelection.getSelectionCells()
  }

  /**
  * Init the object.
  */
  public init() {
    super.init()
    const $firstCell = this.$root.findNode(selectorCellFirst)
    this.selectCell($firstCell)

    // this.$on('formula:input', (text: string) => {
    //   this.tableSelection.getCurrentCell.setElementText = text
    // })

    // this.store.subscribe((state: TState) => {
    //   this.tableSelection.getCurrentCell.setElementText =
    //     state.cellChangeText.text
    //   this.tableSelection.getCurrentCell.focus()
    // })
    this.$on(FORMULA_ENTER, () => {
      this.tableSelection.getCurrentCell.focus()
    })

    this.changeTableFromState()
  }

  /**
  * Function  called when store changed and component monitor changes
  * @param {TState} slice
  */
  public storeChanged = (slice: TState) => {
    if (slice.formulaText) {
      this.tableSelection.getCurrentCell.setElementText =
        slice.formulaText.value
    } else if (slice.currentStyles) {
      this.tableSelection.addStylesInSelectedCells(slice.currentStyles)
    }
  }

  /**
  * Conversion to HTML.
  * @return {string}
  */
  public toHTML = () => {
    return createTable(this.store.getState().cellState)
  }

  /**
  * Function select the cell.
  * @param {Dom} $cell
  * @param {false} isCleanGroup
  */
  public selectCell = ($cell: Dom, isCleanGroup = false) => {
    this.tableSelection.select($cell, isCleanGroup)
    // this.$emit('table:select', $cell.getElementText)
    this.tableSelection.setCurrentCell = $cell
    if ($cell.isDataAttribute('value')) {
      $cell.setElementText = $cell.getDataAttribute('value')
    }

    $cell.focus()

    this.store.dispatch(
        actions.changeText(
            {
              cellId: $cell.getDataAttribute('id'),
              text: $cell.getElementText,
              isChangeText: false,
            },
        ),
    )
  }

  /**
  * @param {Event} event
  */
  public tableResize = async (event: Event) => {
    const data = await resizeHandler(this.$root, event)
    const {type, id, value} = data

    if (type === TABLE_COL_RESIZE) {
      this.$dispatch(actions.colResize(id, value))
    } else if (type === TABLE_ROW_RESIZE) {
      this.$dispatch(actions.rowResize(id, value))
    }
  }

  /**
  * @param {Event} event
  */
  public handlerPrevCellData = () => {
    const cellText = this.tableSelection.getCurrentCell.getElementText
    const result = convertFormulaToValue(cellText)
    this.tableSelection.getCurrentCell.setDataAttribute('data-value', cellText)
    this.tableSelection.getCurrentCell.setElementText = result
  }

  /**
  * Change dimension row or column.
  * @param {Event} event
  */
  public onMousedown = (event: Event) => {
    if (isResize(event)) {
      this.tableResize(event)
    } else if (isSelectCell(event)) {
      this.handlerPrevCellData()
      const $cell = $(event.target as HTMLElement)
      const mouseEvent = event as MouseEvent
      let cellGroup = []

      if (mouseEvent.ctrlKey) {
        this.tableSelection.selectSomeCells($cell)
      } else if (mouseEvent.shiftKey) {
        // eslint-disable-next-line no-console, max-len
        cellGroup = rangeCellGroup(this.$root, $cell, this.tableSelection.getCurrentCell)
        this.tableSelection.selectGroupCells(cellGroup)
      } else {
        this.selectCell($cell, true)
      }

      this.tableSelection.setCurrentCell = $cell
    }
  }

  /**
  * Change dimension row or column.
  * @param {Event} event
  */
  public onKeydown = (event: Event) => {
    const keyEvent = event as KeyboardEvent
    const key = keyEvent.key
    const listKeys = [
      'Enter', 'Tab', 'ArrowDown',
      'ArrowUp', 'ArrowLeft', 'ArrowRight',
    ]

    if (listKeys.includes(key) && !keyEvent.shiftKey) {
      event.preventDefault()
      let [rowId, colId] = getCellIds(this.tableSelection.getCurrentCell)

      switch (key) {
        case 'Enter':
        case 'ArrowDown':
          rowId++
          break
        case 'Tab':
        case 'ArrowRight':
          colId++
          break
        case 'ArrowUp':
          rowId--
          break
        case 'ArrowLeft':
          colId--
          break
      }

      if (isWithinTable(rowId, colId)) {
        const $cell = this.$root.findNode(getCellSelector(rowId, colId))
        this.selectCell($cell, true)
      }
    }
  }

  /**
  * Input data in cell.
  * @param {Event} event
  */
  public onInput = (event: Event) => {
    const $input = $(event.target as HTMLInputElement)
    this.store.dispatch(
        actions.changeText(
            {
              cellId: this.store.getState().cellChangeText.cellId,
              text: $input.getElementText,
              isChangeText: true,
            },
        ),
    )
    // this.$emit('table:input', $input.getElementText)
  }

  /**
  * Change data in cell.
  * @param {Event} event
  */
  // public onChange = (event: Event) => {
  //   console.log(event.target.value)
  // }
}
