import { ADD_PRODUCT, REMOVE_PRODUCT } from '../actions/cartAction';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: []
};

export const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter(p => p.id !== action.payload)
      };

    default:
      return state;
  }
};
