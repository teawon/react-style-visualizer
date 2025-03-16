import { useStylePreviewer } from "../context";
import type { ClassInfo } from "../type";

interface ClassInfoListProps {
  classInfo: Record<string, ClassInfo>;
}

export const ClassSelectList = ({ classInfo }: ClassInfoListProps) => {
  const { selectedClassName, setSelectedClassName } = useStylePreviewer();

  const handleMouseEnter = (
    className: string,
    type: "className" | "classNames"
  ) => {
    setSelectedClassName({ name: className, type });
  };

  const handleMouseLeave = () => {
    setSelectedClassName(null);
  };

  return (
    <div>
      {Object.entries(classInfo).map(([key, value]) => (
        <div key={key}>
          <h3 style={{ marginBottom: "10px" }}>{key}</h3>
          <ClassItem
            name={key}
            isSelected={selectedClassName?.name === key}
            onMouseEnter={() => handleMouseEnter(key, "className")}
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
              {Object.entries(value.classNames).map(([subKey, _]) => (
                <ClassItem
                  key={subKey}
                  name={`classNames.${subKey}`}
                  isSelected={selectedClassName?.name === `${key}.${subKey}`}
                  onMouseEnter={() =>
                    handleMouseEnter(`${key}.${subKey}`, "classNames")
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
