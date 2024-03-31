import {getStorage} from '@/core/utils'
import {TState} from '@/models/TState'
import {KEY_STORAGE_STATE} from './types'

const defaultState: TState = {
  colState: {},
  rowState: {},
  cellChangeText: null,
  formulaText: {value: ''},
  cellState: {},
  currentStyles: {},
  tableTitle: {value: 'Название таблицы'},
}

export const initialState = getStorage(KEY_STORAGE_STATE) ?
  getStorage(KEY_STORAGE_STATE) :
  defaultState
