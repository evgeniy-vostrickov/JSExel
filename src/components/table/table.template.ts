import {CODES, COL_COUNT, ROW_COUNT} from './table.resources'
import {TCellState} from '@/models/TAction'
import {getCellID, getCellText, styleObjectToString} from './table.utils'
import {convertFormulaToValue} from '@/core/utils'

/**
* Function name column to column HTML conversion.
* @param {number} row
* @param {number} col
* @param {TCellState} cellState
* @return {string}
*/
function createCell(row: number, col: number, cellState: TCellState) {
  const cellId = getCellID(row, col)
  const cell = cellState[cellId]
  const cellDataText = getCellText(cell)
  const cellDataStyles = styleObjectToString(cell)
  const styles = cellDataStyles ? `style='${styleObjectToString(cell)};'` : ''
  const text = cellDataText ? `data-value='${cellDataText}'` : ''

  return `
    <div class="cell" contenteditable 
      data-type="cell" 
      data-col="${col}" 
      data-id="${cellId}"
      ${text}
      ${styles}
    >
    ${convertFormulaToValue(cellDataText)}
    </div>
  `
}

/**
* Function name column to column HTML conversion.
* @param {string} col
* @param {number} index
* @return {string}
*/
function toColumn(col: string, index: number) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      <div class="column-resize" data-resize="column"></div>
      ${col}
    </div>
  `
}

/**
* Function render rows.
* @param {number | null} index
* @param {string} content
* @return {string}
*/
function createRow(index: number | null, content: string) {
  const resize = typeof index === 'number' ?
    `<div class="row-resize" data-resize="row"></div>` :
    ''

  return `
    <div class="row" data-row="${index}" data-type="resizable">
      <div class="row-info">
        ${typeof index === 'number' ? index + 1 : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

/**
* Function code to symbol conversion.
* @param {undefined} _
* @param {number} index
* @return {string}
*/
function toChar(_: undefined, index: number) {
  return String.fromCharCode(CODES.A + index)
}

/**
* Function to create the table.
* @param {TCellState} cellState
* @param {number} rowsCount
* @return {string}
*/
export function createTable(cellState: TCellState, rowsCount = ROW_COUNT) {
  const rows = []

  const colsName = new Array(COL_COUNT)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, colsName))

  for (let indexRow = 0; indexRow < rowsCount; indexRow++) {
    const cols = new Array(COL_COUNT)
    for (let indexCol = 0; indexCol < COL_COUNT; indexCol++) {
      cols.push(createCell(indexRow, indexCol, cellState))
    }

    rows.push(createRow(indexRow, cols.join('')))
  }

  return rows.join('')
}
