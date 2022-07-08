import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductsData } from "../models/data.models";
import { getFilteredList } from "../lib/filter-func";

interface ListData {
  items: ProductsData[];
  sortedList: ProductsData[];
  filterParams: {
    categoryParams: string[];
    sortParam: string;
    queryParam: string;
  };
}

const listSlice = createSlice({
  name: "list",
  initialState: {
    items: [],
    sortedList: [],
    filterParams: {
      categoryParams: [],
      sortParam: "",
      queryParam: "",
    },
  },

  reducers: {
    loadItems(state: ListData, action: PayloadAction<ProductsData[]>) {
      state.items = action.payload;
      state.sortedList = action.payload;
    },
    filterListItems(state: ListData, action: PayloadAction<string[]>) {
      const newCategoryList = action.payload;
      state.filterParams.categoryParams = [...newCategoryList];
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
    sortListItems(state: ListData, action: PayloadAction<string>) {
      state.filterParams.sortParam = action.payload;
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
    querySearchListItems(state: ListData, action: PayloadAction<string>) {

      state.filterParams.queryParam = action.payload;
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice;
