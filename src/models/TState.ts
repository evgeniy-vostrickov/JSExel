import {TCellChange, TCellState, TObjectString} from './TAction'
import {PartialButtonStyle} from './TButtonOption'

export type TTableResize = {
  [key: string]: number
}
export type TState = {
  colState: TTableResize
  rowState: TTableResize
  cellChangeText: TCellChange
  formulaText: TObjectString
  cellState: TCellState
  currentStyles: PartialButtonStyle
  tableTitle: TObjectString
}
export type TStateKeys = keyof TState
