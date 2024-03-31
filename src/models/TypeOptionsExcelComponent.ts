import {TStateKeys} from './TState'
import TypeOptionsComponent from './TypeOptionsComponent'

type TypeOptionsExcelComponent = {
  name: string
  listeners: Array<keyof HTMLElementEventMap>
  subscribe: Array<TStateKeys>
} & TypeOptionsComponent

export default TypeOptionsExcelComponent
