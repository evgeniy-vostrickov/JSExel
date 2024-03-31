import {TSubscribeReducer} from '@/models/TRootReducer'
import {TComponentsObjects, TStore} from '..'
import {TState, TStateKeys} from '@/models/TState'
import {isDeepEqual} from './utils'

/**
 * Class for comfortable subscribe component
 * @class Table
 * @implements {ExcelComponents}
 */
export class StoreSubscriber {
  private subscribe: TSubscribeReducer
  private prevState: TState

  /**
  * @constructor
  * @param {TStore} store
  */
  constructor(private store: TStore) {
    this.subscribe = null
    this.prevState = null
  }

  /**
  * Function subscribe the components.
  * @param {TComponentsObjects} components
  */
  public subscribeComponents(components: TComponentsObjects) {
    this.prevState = this.store.getState()
    this.subscribe = this.store.subscribe((state: TState) => {
      Object.keys(state).forEach((key: TStateKeys) => {
        if (!isDeepEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]} as TState
              component.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
      console.log(this.store.getState())
    })
  }

  /**
  * Function subscribe the components.
  */
  public unsubscribeFromStore() {
    this.subscribe.unsubscribe()
  }
}
