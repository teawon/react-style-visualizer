import { useState, useMemo, useCallback } from "react";
import type { StylePreviewerProps } from "../types";
import React from "react";

const StylePreviewer = ({ element, classInfo }: StylePreviewerProps) => {
  const accentStyles = "accent";

  const [toggleMode, setToggleMode] = useState<"hover" | "click">("hover");
  const [selectedClassName, setSelectedClassName] = useState<{
    name: string;
    type: "className" | "classNames";
  }>({
    name: "",
    type: "className",
  });

  const handleMouseEnter = (
    className: string,
    type: "className" | "classNames"
  ) => {
    if (toggleMode !== "hover") return;
    setSelectedClassName({
      name: className,
      type: type,
    });
  };

  const handleMouseLeave = () => {
    if (toggleMode !== "hover") return;
    setSelectedClassName({
      name: "",
      type: "className",
    });
  };

  const handleClick = (className: string, type: "className" | "classNames") => {
    if (toggleMode !== "click") return;
    if (
      selectedClassName.name === className &&
      selectedClassName.type === type
    ) {
      setSelectedClassName({
        name: "",
        type: "className",
      });
      return;
    }
    setSelectedClassName({
      name: className,
      type: type,
    });
  };

  const applySelectedStyle = useCallback(
    (el: React.ReactElement): React.ReactElement => {
      const isSelected = el.key === selectedClassName.name;

      const classNamesTarget =
        selectedClassName.type === "classNames"
          ? selectedClassName.name.split(".")[1]
          : "";

      const newProps = {
        ...el.props,
        className:
          selectedClassName.type === "className"
            ? `${el.props.className || ""} ${
                isSelected ? accentStyles : ""
              }`.trim()
            : el.props.className,
        classNames:
          selectedClassName.type === "classNames" &&
          el.props.classNames &&
          el.key === selectedClassName.name.split(".")[0]
            ? {
                ...el.props.classNames,
                [classNamesTarget]: `${
                  el.props.classNames[classNamesTarget] || ""
                } ${accentStyles}`.trim(),
              }
            : el.props.classNames,
        children: el.props.children
          ? React.Children.map(el.props.children, (child) =>
              React.isValidElement(child) ? applySelectedStyle(child) : child
            )
          : el.props.children,
      };

      return React.cloneElement(el, newProps);
    },
    [selectedClassName]
  );

  const styledElement = useMemo(
    () => applySelectedStyle(element),
    [element, applySelectedStyle]
  );

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div
        id="style-previewer-root"
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
        {styledElement}
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

        {Object.entries(classInfo).map(([key, value]) => (
          <div key={key}>
            <h3 style={{ marginBottom: "10px" }}>{key}</h3>
            <div
              onMouseEnter={() => handleMouseEnter(key, "className")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(key, "className")}
              onKeyUp={(e) =>
                e.key === "Enter" && handleClick(key, "className")
              }
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "4px",
                cursor: "pointer",
                backgroundColor:
                  selectedClassName.name === key ? "#f0f0f0" : "transparent",
              }}
            >
              {key}
            </div>
            {value.classNames &&
              Object.entries(value.classNames).map(([subKey, _]) => (
                <div
                  key={subKey}
                  onMouseEnter={() =>
                    handleMouseEnter(`${key}.${subKey}`, "classNames")
                  }
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(`${key}.${subKey}`, "classNames")}
                  onKeyUp={(e) =>
                    e.key === "Enter" &&
                    handleClick(`${key}.${subKey}`, "classNames")
                  }
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "4px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedClassName.name === `${key}.${subKey}`
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                >
                  {subKey}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylePreviewer;
