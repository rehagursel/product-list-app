import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItemData, CartData } from "../models/data.models";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalAmount: 0,
  } as CartData,

  reducers: {
    //add selected item to cart list and update totalPrice and totalAmount
    addItemToCart(state: CartData, action: PayloadAction<CartItemData>) {
      const updatedTotalAmount = state.totalPrice + action.payload.price;
      const productId = action.payload.id;
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );
      const existingCartItem = state.cartItems[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.cartItems];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [action.payload, ...state.cartItems];
      }
      state.cartItems = updatedItems;
      state.totalPrice = updatedTotalAmount;
      state.totalAmount++;
    },
    //remove item from cart one by one and update totalPrice and totalAmount
    removeItemFromCart(state: CartData, action: PayloadAction<number>) {
      const productId = action.payload
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );
      const existingItem = state.cartItems[existingCartItemIndex];
      const updatedTotalAmount = state.totalPrice - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.cartItems.filter((item) => item.id !== productId);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.cartItems];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.cartItems = updatedItems;
      state.totalPrice = updatedTotalAmount;
      state.totalAmount--;
    },
    //remove all selected item from cart and update totalPrice and totalAmount
    deleteItemTotalyFromCart(state: CartData, action: PayloadAction<number>) {
      const productId = action.payload
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );
      const existingItem = state.cartItems[existingCartItemIndex];
      const updatedTotalAmount = state.totalPrice - existingItem.price*existingItem.amount;
      const updatedItems = state.cartItems.filter((item) => item.id !== productId);
     
      state.cartItems = updatedItems;
      state.totalPrice = updatedTotalAmount;
      state.totalAmount = state.totalAmount - existingItem.amount
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
