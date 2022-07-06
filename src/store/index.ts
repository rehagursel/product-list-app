import { configureStore } from "@reduxjs/toolkit";

import listSlice from "./list-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { list: listSlice.reducer, cart: cartSlice.reducer },
});

export default store;
