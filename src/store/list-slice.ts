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
    isQueryActive: boolean;
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
      isQueryActive: false,
    },
  } as ListData,

  reducers: {
    //add items to redux state
    loadItems(state: ListData, action: PayloadAction<ProductsData[]>) {
      state.items = action.payload;
      state.sortedList = action.payload;
    },
    //add filter params to filterParams list and run filter-function
    filterListItems(state: ListData, action: PayloadAction<string[]>) {
      const newCategoryList = action.payload;
      state.filterParams.categoryParams = [...newCategoryList];
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
    //add sort params to filterParams list and run filter-function
    sortListItems(state: ListData, action: PayloadAction<string>) {
      state.filterParams.sortParam = action.payload;
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
    //add search query to filterParams list and run filter-function
    querySearchListItems(state: ListData, action: PayloadAction<string>) {
      state.filterParams.isQueryActive = false;
      if(action.payload.length > 0) {
        state.filterParams.isQueryActive = true;
      }
      state.filterParams.queryParam = action.payload;
      state.sortedList = getFilteredList(state.filterParams, state.items) || [];
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice;
