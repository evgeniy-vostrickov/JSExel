import {Dom} from '@/core/dom'
import {classNameSelected} from './table.resources'

/**
 * Middleware class between Table and View
 * @class Table
 */
export class TableSelection {
  private listCellsActive: Array<Dom> = []
  private currentCell: Dom

  /**
  * @constructor
  */
  constructor() {}

  /**
  * @return {Dom}
  */
  get getCurrentCell(): Dom {
    return this.currentCell
  }

  /**
  * @param {Dom} $newCell
  */
  set setCurrentCell($newCell: Dom) {
    this.currentCell = $newCell
  }

  /**
  * Add style class for the select cell.
  * @param {Dom} $cell
  * @param {boolean} isCleanGroup
  */
  public select = ($cell: Dom, isCleanGroup = false) => {
    isCleanGroup && this.cleanCellsSelected()
    this.listCellsActive.push($cell)
    $cell.addStyleClasses(classNameSelected)
  }

  /**
  * Add style class for the some cells (by CTRL).
  * @param {Dom} $cell
  */
  public selectSomeCells = ($cell: Dom) => {
    this.select($cell)
  }

  /**
  * Add style class for the group cells (by SHIFT).
  * @param {Array<Dom>} cellGroup
  */
  public selectGroupCells = (cellGroup: Array<Dom>) => {
    this.cleanCellsSelected()
    cellGroup.forEach(($cell) => {
      this.select($cell)
    })
  }

  /**
  * Clean cells selected.
  */
  public cleanCellsSelected = () => {
    this.listCellsActive.forEach((cell) => {
      cell.removeStyleClasses(classNameSelected)
    })
    this.listCellsActive = []
  }
}
