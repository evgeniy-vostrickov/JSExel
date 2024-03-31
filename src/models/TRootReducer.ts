import {createStore} from '@/core/createStore';
import {rootReducer} from '@/redux/rootReducer'

export type TRootReducer = typeof rootReducer
export type TSubscribeReducer =
  ReturnType<ReturnType<typeof createStore>['subscribe']>;
