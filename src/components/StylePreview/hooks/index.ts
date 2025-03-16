import { useReducer } from "react";
import type { Action, StylePreviewerState } from "../type";

const stylePreviewerReducer = (
  state: StylePreviewerState,
  action: Action
): StylePreviewerState => {
  switch (action.type) {
    case "SET_CLASSNAME":
      return {
        mode: state.mode,
        classState: action.payload,
      };
    case "SET_CLASSNAMES":
      return {
        mode: state.mode,
        classState: action.payload,
      };
    case "RESET_STATE":
      return {
        mode: state.mode,
        classState: null,
      };
    case "TOGGLE_MODE":
      return {
        mode: state.mode === "hover" ? "click" : "hover",
        classState: state.classState,
      };
    default:
      return state;
  }
};

export const useStylePreviewerReducer = () => {
  return useReducer(stylePreviewerReducer, {
    mode: "hover",
    classState: null,
  });
};
