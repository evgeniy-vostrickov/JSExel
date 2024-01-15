import {ExcelComponents} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {$, Dom} from '@/core/dom'
import resizeHandler from './table.resize'
import {TableSelection} from './TableSelection'
import {selectorCellFirst} from './table.resources'
import {getCellIds, getCellSelector, isResize, isSelectCell,
  isWithinTable, rangeCellGroup} from './table.utils'
import TypeOptionsComponent from '@/models/TypeOptionsComponent'

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
      listeners: ['mousedown', 'keydown', 'input'],
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
  * Init the object.
  */
  public init() {
    super.init()
    const $firstCell = this.$root.findNode(selectorCellFirst)
    this.selectCell($firstCell)

    this.$on('formula:input', (text: string) => {
      this.tableSelection.getCurrentCell.setElementText = text
    })
    this.$on('formula:enter', () => {
      this.tableSelection.getCurrentCell.focus()
    })
  }

  /**
  * Conversion to HTML.
  * @return {string}
  */
  public toHTML = () => {
    return createTable()
  }

  /**
  * Function select the cell.
  * @param {Dom} $cell
  * @param {false} isCleanGroup
  */
  public selectCell = ($cell: Dom, isCleanGroup = false) => {
    this.tableSelection.select($cell, isCleanGroup)
    this.$emit('table:select', $cell.getElementText)
    this.tableSelection.setCurrentCell = $cell
    $cell.focus()
  }

  /**
  * Change dimension row or column.
  * @param {Event} event
  */
  public onMousedown = (event: Event) => {
    if (isResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isSelectCell(event)) {
      const $cell = $(event.target as HTMLElement)
      const mouseEvent = event as MouseEvent

      if (mouseEvent.ctrlKey) {
        this.tableSelection.selectSomeCells($cell)
      } else if (mouseEvent.shiftKey) {
        // eslint-disable-next-line no-console, max-len
        const cellGroup = rangeCellGroup(this.$root, $cell, this.tableSelection.getCurrentCell)
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
    const input = $(event.target as HTMLInputElement)
    this.$emit('table:input', input.getElementText)
  }
}
