import {Excel} from '@/components/excel/Excel'
import '@/scss/index.scss'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@/core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {TState} from './models/TState'
import {debounce, setStorage} from './core/utils'
import {KEY_STORAGE_STATE} from './redux/types'
import {initialState} from './redux/initialState'

export type TStore = typeof store
export type TComponents = (typeof Header | typeof Toolbar
  | typeof Formula | typeof Table)[]
export type TComponentsObjects = (Header | Toolbar | Formula | Table)[]
export type Options = {
  components: TComponents
  store: TStore
}

const store = createStore(rootReducer, initialState)

// НАДО КАКТО УНИЧТОЖИТЬ
// store.subscribe((state: TState) => {
//   setStorage(KEY_STORAGE_STATE, state)
// })

const stateListener = debounce((state: TState) => {
  setStorage(KEY_STORAGE_STATE, state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()

// console.log('Hello world!!!')

// const sum = (a: number, b: number) => a + b

// console.log(sum(3, 6))
