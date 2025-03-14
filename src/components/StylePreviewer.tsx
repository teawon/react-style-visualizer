import { useState, cloneElement } from "react";
import type { StylePreviewerProps } from "../types";

const StylePreviewer = ({ element, classInfo }: StylePreviewerProps) => {
  const accentStyles = "accent";

  const [toggleMode, setToggleMode] = useState<"hover" | "click">("hover");
  const [selectedClassName, setSelectedClassName] = useState("");

  const handleMouseEnter = (className: string) => {
    if (toggleMode !== "hover") return;
    setSelectedClassName(className);
  };

  const handleMouseLeave = () => {
    if (toggleMode !== "hover") return;
    setSelectedClassName("");
  };

  const handleClick = (className: string) => {
    if (toggleMode !== "click") return;
    if (selectedClassName === className) {
      setSelectedClassName("");
      return;
    }
    setSelectedClassName(className);
  };

  const applyHoverStyle = (
    targetClassName: Record<string, string> | string
  ) => {
    if (typeof targetClassName === "object") {
      return Object.fromEntries(
        Object.entries(targetClassName).map(([key, value]) => [
          key,
          `${value} ${selectedClassName === key ? accentStyles : ""}`,
        ])
      );
    }

    return `${targetClassName} ${
      selectedClassName === "className" ? accentStyles : ""
    }`;
  };

  const clonedTarget = cloneElement(element, {
    className: applyHoverStyle(element.props.className),
    classNames: applyHoverStyle(element.props.classNames),
    subComponents: applyHoverStyle(element.props.subComponents),
  });

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          minWidth: "500px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {clonedTarget}
      </div>
      <div
        style={{
          minWidth: "500px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="radio"
              name="toggleMode"
              value="hover"
              checked={toggleMode === "hover"}
              onChange={() => setToggleMode("hover")}
            />
            Hover
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="toggleMode"
              value="click"
              checked={toggleMode === "click"}
              onChange={() => setToggleMode("click")}
            />
            Click
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            onMouseEnter={() => handleMouseEnter("className")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("className")}
            onKeyUp={(e) => e.key === "Enter" && handleClick("className")}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "4px",
              cursor: "pointer",
              backgroundColor:
                selectedClassName === "className" ? "#f0f0f0" : "transparent",
            }}
          >
            className
          </div>
        </div>
        {classInfo.classNames && (
          <div>
            <h3 style={{ marginBottom: "10px" }}>ClassNames 내부 속성</h3>
            {Object.values(classInfo.classNames).map((className) => (
              <div
                key={className}
                onMouseEnter={() => handleMouseEnter(className)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(className)}
                onKeyUp={(e) => e.key === "Enter" && handleClick(className)}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "4px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedClassName === className ? "#f0f0f0" : "transparent",
                }}
              >
                {className}
              </div>
            ))}
          </div>
        )}

        {classInfo.subComponents && (
          <div>
            <h3 style={{ marginBottom: "10px" }}>subComponents</h3>
            {Object.values(classInfo.subComponents).map((className) => (
              <div
                key={className}
                onMouseEnter={() => handleMouseEnter(className)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(className)}
                onKeyUp={(e) => e.key === "Enter" && handleClick(className)}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "4px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedClassName === className ? "#f0f0f0" : "transparent",
                }}
              >
                {className}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StylePreviewer;
