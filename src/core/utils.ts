import {getCellID} from '@/components/table/table.utils'
import {TCellValues} from '@/models/TAction'
import {TAnyFunction} from '@/models/TAnyFunction'
import {TAnyFunctionReturnVoid} from '@/models/TAnyFunctionReturnVoid'
import {TAnyObject} from '@/models/TAnyObject'
import {TState} from '@/models/TState'

/**
* @param {HTMLElementEventMap} eventName
* @return {string}
*/
export function capitalize(eventName: keyof HTMLElementEventMap) {
  return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}

/**
* @param {string} key
* @param {TState} state
*/
export function setStorage(key: string, state: TState) {
  localStorage.setItem(key, JSON.stringify(state))
}

/**
* @param {string} key
* @return {TState}
*/
export function getStorage(key: string): TState {
  return JSON.parse(localStorage.getItem(key))
}

/**
* Get first cell in the table
* @param {TState} state
* @return {TCellValues}
*/
export function getFirstCell(state: TState): TCellValues {
  return state.cellState?.[getCellID(0, 0)]
}

/**
* Check an object for emptiness
* @param {T} object
* @return {boolean}
*/
export function isEmptyObject(object: unknown): boolean {
  return Object.entries(object).length === 0
}

/**
* Deep equal two object
* @param {Object} object1
* @param {Object} object2
* @return {boolean}
*/
export const isDeepEqual = (object1: TAnyObject, object2: TAnyObject) => {
  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (const key of objKeys1) {
    const value1 = object1[key]
    const value2 = object2[key]

    const isObjects = isObject(value1) && isObject(value2)

    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
}

const isObject = (object: TAnyObject) => {
  return object != null && typeof object === 'object'
}

/**
* Deep equal two object
* @param {Function} fn
* @param {number} wait
* @return {Function}
*/
export function debounce(fn: TAnyFunction, wait: number)
  : TAnyFunctionReturnVoid {
  let timeout: NodeJS.Timeout
  return function(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
* Convert string of formula to number
* @param {string} text
* @return {string}
*/
export function convertFormulaToValue(text: string): string {
  if (text.startsWith('=')) {
    return eval(text.slice(1)).toString()
  } else {
    return text
  }
}
