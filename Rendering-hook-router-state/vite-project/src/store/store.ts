import { createStore, combineReducers } from 'redux';
import { cartReducer } from '../reducers/cartReducer';

const rootReducer = combineReducers({
  cartState: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
