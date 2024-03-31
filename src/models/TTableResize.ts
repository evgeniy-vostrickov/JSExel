import {TABLE_ROW_RESIZE, TABLE_COL_RESIZE} from '@/redux/types'

export type TTableResizePromise = {
  type: typeof TABLE_ROW_RESIZE | typeof TABLE_COL_RESIZE
  id: string
  value: number
}
