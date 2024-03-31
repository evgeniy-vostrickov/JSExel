import {ActionsType, TCellChange,
  TColResize, TRowResize} from '@/models/TAction'
import {CELL_CHANGE_TEXT, FORMULA_CHANGE_TEXT, INIT,
  TABLE_COL_RESIZE, TABLE_ROW_RESIZE, CHANGE_CELL_STYLES,
  CHANGE_TABLE_TITLE} from '@/redux/types'
import {TTableResize, TState} from '@/models/TState'
import {PartialButtonStyle} from '@/models/TButtonOption'

export const actions = {
  initializationState: () => ({type: INIT, payload: null as null}),
  colResize: (colId: string, value: number) =>
    ({type: TABLE_COL_RESIZE, payload: {colId, valueWidth: value}}) as const,
  rowResize: (rowId: string, value: number) =>
    ({type: TABLE_ROW_RESIZE, payload: {rowId, valueHeight: value}}),
  changeText: ({cellId, text, isChangeText}: TCellChange) =>
    ({type: CELL_CHANGE_TEXT, payload: {cellId, text, isChangeText}}),
  formulaChangeText: (newText: string) =>
    ({type: FORMULA_CHANGE_TEXT, payload: newText}),
  changeStyles: (style: PartialButtonStyle) =>
    ({type: CHANGE_CELL_STYLES, payload: style}),
  changeTableTitle: (newTitle: string) =>
    ({type: CHANGE_TABLE_TITLE, payload: newTitle}),
}

/**
* Pure function for change state
* @param {IState} state
* @param {ActionsType} action
* @return {TState}
*/
export const rootReducer = (state: TState, action: ActionsType): TState => {
  console.log()
  switch (action.type) {
    case TABLE_COL_RESIZE: {
      const newCol = {} as TTableResize
      const col = action.payload as TColResize
      newCol[col.colId] = col.valueWidth
      return {...state, colState: {...state.colState, ...newCol}}
    }
    case TABLE_ROW_RESIZE: {
      const newRow = {} as TTableResize
      const row = action.payload as TRowResize
      newRow[row.rowId] = row.valueHeight
      return {...state, rowState: {...state.rowState, ...newRow}}
    }
    case CELL_CHANGE_TEXT: {
      const cell = action.payload as TCellChange
      const {cellId, text, isChangeText} = cell
      // const formula = isFormula()
      if (isChangeText) {
        if (text === '') {
          delete state.cellState[cellId]
          return {...state, cellChangeText: {...cell, text: ''}}
        } else {
          return {...state,
            cellChangeText: {...cell},
            cellState: {...state.cellState, [cellId]: {
              ...state.cellState[cellId],
              text: text,
            }},
          }
        }
      }
      return {...state,
        cellChangeText: {...cell},
        currentStyles: JSON.parse(state.cellState[cellId]?.style ?? '{}'),
      }
    }
    case FORMULA_CHANGE_TEXT: {
      const newText = action.payload as string
      const cellId = state.cellChangeText.cellId
      if (newText === '') {
        delete state.cellState[cellId]
        return {...state, formulaText: {value: ''}}
      } else {
        return {...state,
          formulaText: {value: newText},
          cellState: {...state.cellState, [cellId]: {
            ...state.cellState[cellId],
            text: newText,
          }},
        }
      }
    }
    case CHANGE_CELL_STYLES: {
      const style = action.payload as PartialButtonStyle
      const cellId = state.cellChangeText.cellId
      const currentStyles = {...state.currentStyles, ...style}
      return {...state,
        currentStyles: currentStyles,
        cellState: {...state.cellState,
          [cellId]: {...state.cellState[cellId],
            style: JSON.stringify(currentStyles)},
        },
      }
    }
    case CHANGE_TABLE_TITLE: {
      const newTitle = action.payload as string
      return {...state, tableTitle: {value: newTitle}}
    }
    default: return state
  }
}
