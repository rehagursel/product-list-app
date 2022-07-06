import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductsData } from "../models/data.model";

interface ListData {
  items: ProductsData[];
  sortedList: ProductsData[];
}

const listSlice = createSlice({
  name: "list",
  initialState: {
    items: [],
    sortedList: [],
  },

  reducers: {
    loadItems(state: ListData, action:PayloadAction<ProductsData[]>) {
      state.items = action.payload;
      state.sortedList = action.payload;
    },
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

export const listActions = listSlice.actions;

export default listSlice;
