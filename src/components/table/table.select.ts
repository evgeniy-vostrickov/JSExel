import {$, Dom} from '@/core/dom'
import {rangeCellGroup} from './table.utils'
import {TableSelection} from './TableSelection'

/**
* Cell selected handler
* @param {Dom} $root The sum of the two numbers
* @param {TableSelection} tableSelection Middleware class between Table and View
* @param {Event} event The sum of the two numbers
*/
function selectCellHandler($root: Dom, tableSelection: TableSelection,
    event: Event) {
  const $cell = $(event.target as HTMLElement)
  const mouseEvent = event as MouseEvent

  if (mouseEvent.ctrlKey) {
    tableSelection.selectSomeCells($cell)
  } else if (mouseEvent.shiftKey) {
    // eslint-disable-next-line no-console, max-len
    const cellGroup = rangeCellGroup($root, $cell, tableSelection.getCurrentCell)
    tableSelection.selectGroupCells(cellGroup)
  } else {
    tableSelection.select($cell, true)
  }

  tableSelection.setCurrentCell = $cell
}

export default selectCellHandler
