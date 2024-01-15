import {DomListener} from '@core/DomListener'
import {Dom} from './dom'
import TypeOptionsExcelComponent from '../models/TypeOptionsExcelComponent'
import {TVoidFunction} from '@/models/TVoidFunction'

/**
 * Abstract Class for defining general behavior of components.
 *
 * @interface ExcelComponents
 * @since 1.0.0
 */
export abstract class ExcelComponents extends DomListener {
  protected emitter
  private unSubscribes: Array<TVoidFunction>

  /**
  * @constructor
  * @param {Dom} $root
  * @param {Object} options
  */
  constructor($root: Dom, options: TypeOptionsExcelComponent) {
    super($root, options.listeners)
    this.name = options.name
    this.prepare()
    this.emitter = options.emitter
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
  * Mailing events
  * @param {string} event
  * @param {any[]} args
  */
  protected $on(event: string, ...args: any[]) {
    this.unSubscribes.push(this.emitter.subscribe(event, ...args))
  }

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
  }
}
