import { useStylePreviewer } from "../context";
import type { ClassInfo, StylePreviewerState } from "../type";

type ClassControllerProps = {
  children: (props: {
    mode: "hover" | "click";
    classInfo: Record<string, ClassInfo>;
    selectedClass: StylePreviewerState["classState"];
    updateClassState: (
      props: Exclude<StylePreviewerState["classState"], null>
    ) => void;
    resetClassState: () => void;
  }) => React.ReactNode;
};

export const ClassController = ({ children }: ClassControllerProps) => {
  const { state, dispatch, classInfo } = useStylePreviewer();

  const updateClassState = (
    props: Exclude<StylePreviewerState["classState"], null>
  ) => {
    if (props.type === "className") {
      dispatch({
        type: "SET_CLASSNAME",
        payload: { elementKey: props.elementKey, type: props.type },
      });
    } else {
      dispatch({
        type: "SET_CLASSNAMES",
        payload: {
          elementKey: props.elementKey,
          type: props.type,
          propertyName: props.propertyName,
        },
      });
    }
  };

  const resetClassState = () => {
    dispatch({
      type: "RESET_STATE",
    });
  };

  return (
    <>
      {children({
        mode: state.mode,
        classInfo,
        selectedClass: state.classState,
        updateClassState,
        resetClassState,
      })}
    </>
  );
};
