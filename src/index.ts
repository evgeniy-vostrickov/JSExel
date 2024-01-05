import {Excel} from '@/components/excel/Excel'
import '@/scss/index.scss'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

export type Options = {
  components: (typeof Header | typeof Toolbar
    | typeof Formula | typeof Table)[],
}

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

console.log(excel)
excel.render()

// console.log('Hello world!!!')

// const sum = (a: number, b: number) => a + b

// console.log(sum(3, 6))
