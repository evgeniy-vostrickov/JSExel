import {Dom} from '@/core/dom'
import {COL_COUNT, ROW_COUNT} from './table.resources'
import {TCellValues} from '@/models/TAction'
import {PartialButtonStyle} from '@/models/TButtonOption'

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

export const getRowSelector = (indexRow: string) => {
  return `[data-row="${indexRow}"]`
}

export const getColumnSelector = (indexColumn: string) => {
  return `[data-col="${indexColumn}"]`
}

export const getCellSelector = (rowIndex: number, columnIndex: number) => {
  return `[data-id="${rowIndex}:${columnIndex}"]`
}

export const getCellID = (rowId: number, colId: number) => `${rowId}:${colId}`

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

export const convertStringToStyleObject = (str: string): PartialButtonStyle =>
  str ? JSON.parse(str) : {}

export const isEmptyCell = (cell: TCellValues, isStyle = false) =>
  !cell || cell?.text === '' || (isStyle && cell?.style === '')

export const checkForStyles = (cell: TCellValues) => !isEmptyCell(cell, true)

export const getCellText = (cell: TCellValues) => {
  return !isEmptyCell(cell) ? cell.text : ''
}

const camelToDashCase = (str: string) => {
  return str.replace(/([A-Z])/g, (g: string) => `-${g[0].toLowerCase()}`)
}

export const styleObjectToString = (cell: TCellValues): string => {
  if (!isEmptyCell(cell, true)) {
    const styles = convertStringToStyleObject(cell?.style)
    return Object.entries(styles).map(([key, val]) =>
      `${camelToDashCase(key)}:${val}`).join(';')
  }
  return ''
}
