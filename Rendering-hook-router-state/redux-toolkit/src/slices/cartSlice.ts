import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
