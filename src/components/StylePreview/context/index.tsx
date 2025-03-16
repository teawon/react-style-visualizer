import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type StylePreviewerContextType = {
  selectedClassName: { name: string; type: "className" | "classNames" } | null;
  setSelectedClassName: React.Dispatch<
    React.SetStateAction<{
      name: string;
      type: "className" | "classNames";
    } | null>
  >;
};

const StylePreviewerContext = createContext<StylePreviewerContextType>({
  selectedClassName: null,
  setSelectedClassName: () => {},
});

export const StylePreviewerProvider = ({ children }: PropsWithChildren) => {
  const [selectedClassName, setSelectedClassName] = useState<{
    name: string;
    type: "className" | "classNames";
  } | null>(null);

  return (
    <StylePreviewerContext.Provider
      value={{ selectedClassName, setSelectedClassName }}
    >
      {children}
    </StylePreviewerContext.Provider>
  );
};

export const useStylePreviewer = () => useContext(StylePreviewerContext);
