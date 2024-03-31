import {$, Dom} from '@/core/dom'
import {MIN_HEIGHT_ROW, MIN_WIDTH_COLUMN, selectorTypeResizable}
  from './table.resources'
import {getColumnSelector, isColumnResize, isRowResize} from './table.utils'
import {TTableResizePromise} from '@/models/TTableResize'
import {TABLE_ROW_RESIZE, TABLE_COL_RESIZE} from '@/redux/types'

/**
* Change dimension row or column.
* @param {Dom} $root The sum of the two numbers.
* @param {Event} event The sum of the two numbers.
* @return {Promise<TTableResizePromise>}
*/
function resizeHandler($root: Dom, event: Event): Promise<TTableResizePromise> {
  return new Promise((resolve) => {
    const $resize = $(event.target as HTMLElement)
    const mouseEvent = event as MouseEvent
    const resizeElement = $resize.getElement
    if (isRowResize(resizeElement)) {
      const $row = $resize.closest(selectorTypeResizable)
      const {height} = $row.getCoords()
      const startPositionMouse = mouseEvent.pageY
      let delta = 0

      document.onmousemove = (ev: MouseEvent) => {
        delta = ev.pageY - startPositionMouse
        if (delta > 0 || height + delta > MIN_HEIGHT_ROW) {
          $resize.addStyles({
            bottom: `${-delta}px`,
            right: '-3500px',
            opacity: 1,
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        let newHeight = height + delta
        if (newHeight < 0 || newHeight < MIN_HEIGHT_ROW) {
          newHeight = MIN_HEIGHT_ROW
        }
        $row.addStyles({height: `${newHeight}px`})
        $resize.addStyles({bottom: 0, right: 0, opacity: 0})

        const rowId = $resize.closest('[data-row]').getDataAttribute('row')
        resolve({type: TABLE_ROW_RESIZE, id: rowId, value: newHeight})
      }
    } else if (isColumnResize(resizeElement)) {
      const $column = $resize.closest(selectorTypeResizable)
      const {width} = $column.getCoords()
      const startPositionMouse = mouseEvent.pageX
      const indexColumn = $column.getDataAttribute('col')
      const listCell = $root.findAllNode(getColumnSelector(indexColumn))
      let delta = 0

      document.onmousemove = (ev: MouseEvent) => {
        delta = ev.pageX - startPositionMouse
        if (delta > 0 || width + delta > MIN_WIDTH_COLUMN) {
          $resize.addStyles({
            right: `${-delta}px`,
            bottom: `-500px`,
            opacity: 1,
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        let newWidth = width + delta
        if (newWidth < 0 || newWidth < MIN_WIDTH_COLUMN) {
          newWidth = MIN_WIDTH_COLUMN
        }

        listCell.forEach((cell) => {
          $(cell).addStyles({width: `${newWidth}px`})
          $resize.addStyles({right: 0, bottom: 0, opacity: 0})
        })

        const colId = $resize.closest('[data-col]').getDataAttribute('col')

        resolve({type: TABLE_COL_RESIZE, id: colId, value: newWidth})
      }
    }
  })
}

export default resizeHandler
