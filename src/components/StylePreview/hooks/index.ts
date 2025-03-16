import { useReducer } from "react";
import type { Action, StylePreviewerState } from "../type";

const stylePreviewerReducer = (
  state: StylePreviewerState,
  action: Action
): StylePreviewerState => {
  switch (action.type) {
    case "SET_CLASSNAME":
      return action.payload;
    case "SET_CLASSNAMES":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

export const useStylePreviewerReducer = () => {
  return useReducer(stylePreviewerReducer, null);
};
