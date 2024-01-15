import {CODES, COL_COUNT, ROW_COUNT} from './table.resources'


/**
* Function name column to column HTML conversion.
* @param {number} row
* @param {number} col
* @return {string}
*/
function createCell(row: number, col: number) {
  return `
    <div class="cell" contenteditable 
      data-type="cell" 
      data-col="${col}" 
      data-id="${row}:${col}"
    >
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
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
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
* @param {number} rowsCount
* @return {string}
*/
export function createTable(rowsCount = ROW_COUNT) {
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
      cols.push(createCell(indexRow, indexCol))
    }

    rows.push(createRow(indexRow + 1, cols.join('')))
  }

  return rows.join('')
}
