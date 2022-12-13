import { SET_SHOW_SIDE_BAR, SET_UNFOLDABLE_SIDE_BAR } from "src/actions/app";

const initialState = {
  sidebarShow: true,
  unfoldable: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_SIDE_BAR:
      return { ...state, sidebarShow: action.payload };
    case SET_UNFOLDABLE_SIDE_BAR:
      return { ...state, unfoldable: action.payload };
    default:
      return state;
  }
};

export default user;
