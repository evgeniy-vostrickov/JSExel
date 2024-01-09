const CODES = {
  A: 65,
  Z: 90,
}

/**
* Function name column to column HTML conversion.
* @param {string} col
* @return {string}
*/
function createCell(col: number) {
  return `
    <div class="cell" contenteditable data-col="${col}"></div>
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
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const colsName = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, colsName))

  for (let indexRow = 0; indexRow < rowsCount; indexRow++) {
    const cols = new Array(colsCount)
    for (let indexCol = 0; indexCol < colsCount; indexCol++) {
      cols.push(createCell(indexCol))
    }

    rows.push(createRow(indexRow + 1, cols.join('')))
  }

  return rows.join('')
}
