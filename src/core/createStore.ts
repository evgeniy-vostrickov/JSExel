import {ActionsType} from '@/models/TAction'
import {TRootReducer} from '@/models/TRootReducer'
import {TState} from '@/models/TState'
import {TSubscribeFunction} from '@/models/TSubscribeFunction'
import {actions} from '@/redux/rootReducer'

/**
* Pure function for change state
* @param {TRootReducer} rootReducer
* @param {TState} initialState
* @return {any}
*/
export function createStore(rootReducer: TRootReducer, initialState: TState) {
  let state = rootReducer({...initialState}, actions.initializationState())
  let listeners: TSubscribeFunction[] = []

  return {
    subscribe(fn: TSubscribeFunction) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn)
        },
      }
    },
    dispatch(action: ActionsType) {
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    getState(): TState {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
