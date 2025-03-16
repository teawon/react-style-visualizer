import { useStylePreviewer } from "../context";
import type { StylePreviewerState } from "../type";
import type { ClassInfo } from "../type";

interface ClassInfoListProps {
  classInfo: Record<string, ClassInfo>;
}

export const ClassSelectList = ({ classInfo }: ClassInfoListProps) => {
  const { state, dispatch } = useStylePreviewer();

  const handleMouseEnter = (
    props: Exclude<StylePreviewerState["classState"], null>
  ) => {
    if (state?.mode === "click") {
      return;
    }

    if (props.type === "className") {
      dispatch({
        type: "SET_CLASSNAME",
        payload: { elementKey: props.elementKey, type: props.type },
      });
      return;
    }

    dispatch({
      type: "SET_CLASSNAMES",
      payload: {
        elementKey: props.elementKey,
        type: props.type,
        propertyName: props.propertyName,
      },
    });
  };

  const handleMouseLeave = () => {
    if (state?.mode === "click") {
      return;
    }

    dispatch({ type: "RESET_STATE" });
  };

  const handleClick = (
    props: Exclude<StylePreviewerState["classState"], null>
  ) => {
    if (state?.mode === "hover") {
      return;
    }

    if (props.type === "className") {
      dispatch({
        type: "SET_CLASSNAME",
        payload: { elementKey: props.elementKey, type: props.type },
      });
      return;
    }

    dispatch({
      type: "SET_CLASSNAMES",
      payload: {
        elementKey: props.elementKey,
        type: props.type,
        propertyName: props.propertyName,
      },
    });
  };

  return (
    <div>
      {Object.entries(classInfo).map(([key, value]) => (
        <div key={key}>
          <h3 style={{ marginBottom: "10px" }}>{key}</h3>
          <ClassItem
            name={key}
            isSelected={
              state?.classState?.elementKey === key &&
              state?.classState?.type === "className"
            }
            onMouseEnter={() =>
              handleMouseEnter({ elementKey: key, type: "className" })
            }
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick({ elementKey: key, type: "className" })}
          />
          {value.classNames && (
            <div
              style={{
                borderTop: "1px solid #eee",
                marginTop: "10px",
                paddingTop: "10px",
              }}
            >
              {Object.entries(value.classNames).map(([propertyName, _]) => (
                <ClassItem
                  key={propertyName}
                  name={`classNames.${propertyName}`}
                  isSelected={
                    state?.classState?.elementKey === key &&
                    state?.classState?.type === "classNames" &&
                    state?.classState?.propertyName === propertyName
                  }
                  onMouseEnter={() =>
                    handleMouseEnter({
                      elementKey: key,
                      type: "classNames",
                      propertyName: propertyName,
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                  onClick={() =>
                    handleClick({
                      elementKey: key,
                      type: "classNames",
                      propertyName: propertyName,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ClassItem = ({
  name,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  name: string;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    onKeyUp={(e) => e.key === "Enter" && onClick()}
    style={{
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "4px",
      cursor: "pointer",
      backgroundColor: isSelected ? "#f0f0f0" : "transparent",
    }}
  >
    {name}
  </div>
);
