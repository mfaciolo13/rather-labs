import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalBsm: {
    visible: false,
    content: "",
  },
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    showBottomSheet: (state, action) => {
      const { content } = action.payload;
      state.generalBsm = {
        visible: true,
        content,
      };
    },
    hideBottomSheet: (state) => {
      state.generalBsm = {
        ...state.generalBsm,
        visible: false,
      };
    },
  },
});

const { actions, reducer } = bottomSheetSlice;

export const { showBottomSheet, hideBottomSheet } = actions;
export { reducer as bottomSheetReducer };
