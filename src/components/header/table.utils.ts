import {TState} from '@/models/TState'

export const getTableTitle = (state: TState) => {
  return state.tableTitle.value
}
