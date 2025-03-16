import { createContext, useContext, type PropsWithChildren } from "react";
import { useStylePreviewerReducer } from "../hooks";
import type { Action, StylePreviewerState } from "../type";

type StylePreviewerContextType = {
  state: StylePreviewerState;
  dispatch: React.Dispatch<Action>;
};

const StylePreviewerContext = createContext<StylePreviewerContextType>({
  state: null,
  dispatch: () => {},
});

export const StylePreviewerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useStylePreviewerReducer();

  return (
    <StylePreviewerContext.Provider value={{ state, dispatch }}>
      {children}
    </StylePreviewerContext.Provider>
  );
};

export const useStylePreviewer = () => useContext(StylePreviewerContext);
