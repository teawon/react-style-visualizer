import { useReducer } from "react";
import type { Action, StylePreviewerState } from "../type";

const stylePreviewerReducer = (
  state: StylePreviewerState,
  action: Action
): StylePreviewerState => {
  switch (action.type) {
    case "SET_CLASSNAME":
      return {
        ...state,
        classState: action.payload,
      };
    case "SET_CLASSNAMES":
      return {
        ...state,
        classState: action.payload,
      };
    case "RESET_STATE":
      return {
        ...state,
        classState: null,
      };
    case "TOGGLE_MODE":
      return {
        ...state,
        mode: state.mode === "hover" ? "click" : "hover",
      };
    default:
      return state;
  }
};

export const useStylePreviewerReducer = (element: React.ReactElement) => {
  return useReducer(stylePreviewerReducer, {
    mode: "hover",
    classState: null,
    element: element,
  });
};
