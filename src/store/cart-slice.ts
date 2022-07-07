import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItemData, CartData } from "../models/data.model";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalAmount: 0,
  },

  reducers: {
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
    /* replaceListItems(state, action) {
        state.items = action.payload.items;
        state.sortedList = action.payload.items;
      }, */
    /*  sortListItems(state, action) {
        if (action.payload === "All Products") {
          state.sortedList = [...state.items];
        } else {
          const category = action.payload;
          const sortedItemsList = state.items.filter(
            (product) => product.category === category
          );
          state.sortedList = sortedItemsList;
        }
      }, */
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
