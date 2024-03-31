import {TAnyFunction} from '@/models/TAnyFunction'
import {TVoidFunction} from '@/models/TVoidFunction'

interface MEvent {
  [event: string]: Array<TAnyFunction>
}

/**
 * Class for monitoring the occurrence of an event
 * @class Emitter
 */
export class Emitter {
  private listeners: MEvent = {}
  /**
  * @constructor
  */
  constructor() {}

  /**
  * Subscribe to newsletter
  * @param {string} event
  * @param {Function} fn
  * @return {TVoidFunction}
  */
  public subscribe = (event: string, fn: TAnyFunction): TVoidFunction => {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event].filter((listener: TAnyFunction) => listener !== fn)
    }
  }

  /**
  * Mailing events
  * @param {string} event
  * @param {any[]} args
  */
  public emit = (event: string, ...args: any[]) => {
    this.listeners[event].forEach((listener: TAnyFunction) => {
      listener(...args)
    })
  }
}
