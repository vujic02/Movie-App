import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchedValue: "",
    pageNumber: "1",
  },
  reducers: {
    setSearchedValue: (state, action) => {
      state.searchedValue = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
