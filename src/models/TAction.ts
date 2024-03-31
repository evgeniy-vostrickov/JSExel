import {actions} from '@/redux/rootReducer'

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
type InferActionsType<T extends {[key: string]: (...args: any[]) => unknown}>
  = ReturnType<PropertiesTypes<T>>;
export type ActionsType = InferActionsType<typeof actions>

// export type ActionsObject = {
//   [key: string]: (...args: any[]) => ({type: string, payload: PayloadTypes})
// }

// export type PayloadTypes = TColResize | null

export type TColResize = {
  colId: string
  valueWidth: number
}

export type TRowResize = {
  rowId: string
  valueHeight: number
}

export type TCellChange = {
  cellId: string
  text: string
  isChangeText: boolean
}

export type TCellValues = {
  text: string
  style?: string
}

export type TCellState = {
  [key: string]: TCellValues
}

export type TObjectString = {
  value: string
}
