import { createContext, useContext, type PropsWithChildren } from "react";
import { useStylePreviewerReducer } from "../hooks";
import type { Action, ClassInfo, StylePreviewerState } from "../type";

import "../accentStyle.css";

type StylePreviewerContextType = {
  state: StylePreviewerState;
  dispatch: React.Dispatch<Action>;
};

const StylePreviewerContext = createContext<StylePreviewerContextType>({
  state: {
    mode: "hover",
    classState: null,
    element: <div />,
  },
  dispatch: () => {},
});

export const StylePreviewerProvider = <T extends Record<string, ClassInfo>>({
  children,
  element,
  classInfo,
}: PropsWithChildren<{
  element: (keys: { [K in keyof T]: K }) => React.ReactElement;
  classInfo: T;
}>) => {
  const keyMappedElement = element(
    Object.keys(classInfo).reduce((acc, key) => {
      acc[key as keyof T] = key as keyof T;
      return acc;
    }, {} as { [K in keyof T]: K })
  );

  const [state, dispatch] = useStylePreviewerReducer(keyMappedElement);

  return (
    <StylePreviewerContext.Provider value={{ state, dispatch }}>
      {children}
    </StylePreviewerContext.Provider>
  );
};

export const useStylePreviewer = () => useContext(StylePreviewerContext);
