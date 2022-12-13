export const SET_SHOW_SIDE_BAR = "SET_SHOW_SIDE_BAR";
export const SET_UNFOLDABLE_SIDE_BAR = "SET_UNFOLDABLE_SIDE_BAR";

export const setShowSideBar = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_SHOW_SIDE_BAR,
    payload: trueOrFalse,
  });
};

export const setUnfoldableSideBar = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_UNFOLDABLE_SIDE_BAR,
    payload: trueOrFalse,
  });
};
