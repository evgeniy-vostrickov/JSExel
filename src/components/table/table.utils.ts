import {Dom} from '@/core/dom'
import {COL_COUNT, ROW_COUNT} from './table.resources'

export const isRowResize = (resizeElement: HTMLElement) => {
  return resizeElement.dataset['resize'] === 'row'
}

export const isColumnResize = (resizeElement: HTMLElement) => {
  return resizeElement.dataset['resize'] === 'column'
}

export const isResize = (event: Event) => {
  const target = event.target as HTMLElement
  return target.dataset['resize'] === 'column' ||
    target.dataset['resize'] === 'row'
}

export const isSelectCell = (event: Event) => {
  const target = event.target as HTMLElement
  return target.dataset['type'] === 'cell'
}

export const getColumnSelector = (indexColumn: string) => {
  return `[data-col="${indexColumn}"]`
}

export const getCellSelector = (rowIndex: number, columnIndex: number) => {
  return `[data-id="${rowIndex}:${columnIndex}"]`
}

/*
* @return {[number:number]} Return [rowId:colId]
*/
export const getCellIds = ($cell: Dom) => {
  return $cell.getElement.dataset['id'].split(':').map((id) => parseInt(id))
}

/*
* Get left-top and right-bottom cell
* @return {[number, number]} Return [rowIdLT, colIdLT, rowIdRB, colIdRB]
*/
export const getRangeLimit = ($start: Dom, $end: Dom) => {
  const startCell = getCellIds($start)
  const endCell = getCellIds($end)

  return [
    Math.min(startCell[0], endCell[0]), Math.min(startCell[1], endCell[1]),
    Math.max(startCell[0], endCell[0]), Math.max(startCell[1], endCell[1]),
  ]
}

/*
* Get cells selected group
* @param {Dom} $root Root for find cells
* @param {Dom} $start First cell
* @param {Dom} $end Second cell
* @return {Array<Dom>} List cells selected
*/
export const rangeCellGroup = ($root: Dom, $start: Dom, $end: Dom) => {
  const [startRow, startCol, endRow, endCol] = getRangeLimit($start, $end)
  const cellGroup: Dom[] = []

  for (let indexRow = startRow; indexRow <= endRow; indexRow++) {
    for (let indexCol = startCol; indexCol <= endCol; indexCol++) {
      const $cell = $root.findNode(getCellSelector(indexRow, indexCol))
      cellGroup.push($cell)
    }
  }

  return cellGroup
}

export const isWithinTable = (rowId: number, colId: number) => {
  return (rowId >= 0 && rowId < ROW_COUNT && colId >= 0 && colId < COL_COUNT)
}
