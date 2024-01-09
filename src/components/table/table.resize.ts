import {$, Dom} from '@/core/dom'

/**
* Change dimension row or column.
* @param {Dom} $root The sum of the two numbers.
* @param {Event} event The sum of the two numbers.
*/
function resizeHandler($root: Dom, event: Event) {
  const $resize = $(event.target as HTMLElement)
  const mouseEvent = event as MouseEvent
  const resizeElement = $resize.getElement
  if (resizeElement.dataset['resize'] === 'row') {
    const $row = $resize.closest('[data-type="resizable"]')
    const {height} = $row.getCoords()
    const startPositionMouse = mouseEvent.pageY
    let delta = 0

    document.onmousemove = (ev: MouseEvent) => {
      delta = ev.pageY - startPositionMouse
      if (delta > 0 || height + delta > 20) {
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
      if (newHeight < 0 || newHeight < 20) {
        newHeight = 20
      }
      $row.addStyles({height: `${newHeight}px`})
      $resize.addStyles({bottom: 0, opacity: 0})
    }
  } else if (resizeElement.dataset['resize'] === 'column') {
    const $column = $resize.closest('[data-type="resizable"]')
    const {width} = $column.getCoords()
    const startPositionMouse = mouseEvent.pageX
    const indexColumn = $column.getDataAttribute('col')
    const listCell = $root.findAllNode(`[data-col="${indexColumn}"]`)
    let delta = 0

    document.onmousemove = (ev: MouseEvent) => {
      delta = ev.pageX - startPositionMouse
      if (delta > 0 || width + delta > 40) {
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
      if (newWidth < 0 || newWidth < 40) {
        newWidth = 40
      }

      listCell.forEach((cell) => {
        $(cell).addStyles({width: `${newWidth}px`})
        $resize.addStyles({right: 0, opacity: 0})
      })
    }
  }
}

export default resizeHandler
