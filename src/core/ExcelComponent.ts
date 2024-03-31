import {DomListener} from '@core/DomListener'
import {Dom} from './dom'
import TypeOptionsExcelComponent from '../models/TypeOptionsExcelComponent'
import {TVoidFunction} from '@/models/TVoidFunction'
import {TAnyFunction} from '@/models/TAnyFunction'
import {ActionsType} from '@/models/TAction'
import {TState, TStateKeys} from '@/models/TState'

/**
 * Abstract Class for defining general behavior of components.
 *
 * @interface ExcelComponents
 * @since 1.0.0
 */
export abstract class ExcelComponents extends DomListener {
  protected emitter
  protected store
  private unSubscribes: Array<TVoidFunction>
  private subscribe: Array<TStateKeys>

  /**
  * @constructor
  * @param {Dom} $root
  * @param {Object} options
  */
  constructor($root: Dom, options: TypeOptionsExcelComponent) {
    super($root, options.listeners)
    this.name = options.name
    this.store = options.store
    this.prepare()
    this.emitter = options.emitter
    this.subscribe = options.subscribe
    this.unSubscribes = []
  }

  /**
  * Conversion to HTML.
  * @return {string}
  */
  protected abstract toHTML(): string

  /**
  * Prepare for initialization.
  */
  protected abstract prepare(): void

  /**
  * Mailing events
  * @param {string} event
  * @param {any[]} args
  */
  protected $emit(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args)
  }

  /**
  * Subscribing on event
  * @param {string} event
  * @param {TAnyFunction} fn
  */
  protected $on(event: string, fn: TAnyFunction) {
    this.unSubscribes.push(this.emitter.subscribe(event, fn))
  }

  /**
  * Function check tracking the key in state
  * @param {TKeysState} key
  * @return {boolean}
  */
  public isWatching(key: TStateKeys): boolean {
    return this.subscribe.includes(key)
  }

  /**
  * Function  called when store changed and component monitor changes
  * @param {TState} slice
  */
  protected abstract storeChanged(slice: TState): void

  /**
  * Change state
  * @param {ActionsType} action
  */
  protected $dispatch(action: ActionsType) {
    this.store.dispatch(action)
  }

  /**
  * Function check tracking the key in state
  * @param {TKeysState} key
  * @return {boolean}
  */
  // protected abstract isWatching(key: keyof TState): boolean

  /**
  * Init the component (add listeners).
  */
  public init() {
    this.initDOMListeners()
  }

  /**
  * Delete the component (remove listeners).
  */
  public destroy() {
    this.removeDOMListeners()
    this.unSubscribes.forEach((unsub) => {
      unsub()
    })
    // this.storeSub.unsubscribe()
  }
}
