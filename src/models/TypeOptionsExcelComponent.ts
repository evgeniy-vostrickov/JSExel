import TypeOptionsComponent from './TypeOptionsComponent'

type TypeOptionsExcelComponent = {
  name: string
  listeners: Array<keyof HTMLElementEventMap>
} & TypeOptionsComponent

export default TypeOptionsExcelComponent
