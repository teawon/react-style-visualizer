import { useStylePreviewer } from "../context";
import type { StylePreviewerState } from "../type";
import type { ClassInfo } from "../type";

interface ClassInfoListProps {
  classInfo: Record<string, ClassInfo>;
}

export const ClassSelectList = ({ classInfo }: ClassInfoListProps) => {
  const { state, dispatch } = useStylePreviewer();

  const handleMouseEnter = (props: Exclude<StylePreviewerState, null>) => {
    if (props.type === "className") {
      dispatch({
        type: "SET_CLASSNAME",
        payload: { elementKey: props.elementKey, type: props.type },
      });
      return;
    }

    const [elementKey, propertyName] = props.elementKey.split(".");

    dispatch({
      type: "SET_CLASSNAMES",
      payload: { elementKey, type: props.type, propertyName },
    });
  };

  const handleMouseLeave = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      {Object.entries(classInfo).map(([key, value]) => (
        <div key={key}>
          <h3 style={{ marginBottom: "10px" }}>{key}</h3>
          <ClassItem
            name={key}
            isSelected={
              state?.elementKey === key && state?.type === "className"
            }
            onMouseEnter={() =>
              handleMouseEnter({ elementKey: key, type: "className" })
            }
            onMouseLeave={handleMouseLeave}
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
                    state?.elementKey === key &&
                    state?.type === "classNames" &&
                    state?.propertyName === propertyName
                  }
                  onMouseEnter={() =>
                    handleMouseEnter({
                      elementKey: `${key}.${propertyName}`,
                      type: "classNames",
                      propertyName: propertyName,
                    })
                  }
                  onMouseLeave={handleMouseLeave}
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
}: {
  name: string;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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
