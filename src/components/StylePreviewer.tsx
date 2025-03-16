import { useState, useMemo, useCallback } from "react";
import type { StylePreviewerProps, ClassInfo } from "../types";
import React from "react";

const StylePreviewer = <T extends Record<string, ClassInfo>>({
  children,
  classInfo,
  accentClassName = "accent",
}: StylePreviewerProps<T>) => {
  const [selectedClassName, setSelectedClassName] = useState<{
    name: string;
    type: "className" | "classNames";
  } | null>(null);

  const keys = Object.keys(classInfo).reduce((acc, key) => {
    acc[key as keyof T] = key as keyof T;
    return acc;
  }, {} as { [K in keyof T]: K });

  const element = children(keys);

  const handleMouseEnter = (
    className: string,
    type: "className" | "classNames"
  ) => {
    setSelectedClassName({
      name: className,
      type: type,
    });
  };

  const handleMouseLeave = () => {
    setSelectedClassName(null);
  };

  const applyAccentStyle = useCallback(
    (currentClassName: string | undefined, shouldApplyAccent: boolean) => {
      return `${currentClassName || ""} ${
        shouldApplyAccent ? accentClassName : ""
      }`.trim();
    },
    [accentClassName]
  );

  const applySelectedStyle = useCallback(
    (el: React.ReactElement): React.ReactElement => {
      const [target, classNamesTarget] =
        selectedClassName?.type === "classNames"
          ? selectedClassName.name.split(".")
          : [selectedClassName?.name, ""];

      const isTargetElement = el.key === target;

      const updatedClassName = applyAccentStyle(
        el.props.className,
        isTargetElement && selectedClassName?.type === "className"
      );

      const updatedClassNames =
        selectedClassName?.type === "classNames" && isTargetElement
          ? {
              ...(el.props.classNames || {}),
              [classNamesTarget]: applyAccentStyle(
                el.props.classNames?.[classNamesTarget],
                true
              ),
            }
          : el.props.classNames || {};

      const newProps = {
        ...el.props,
        className: updatedClassName,
        classNames: updatedClassNames,
        children: el.props.children
          ? React.Children.map(el.props.children, (child) =>
              React.isValidElement(child) ? applySelectedStyle(child) : child
            )
          : el.props.children,
      };

      return React.cloneElement(el, newProps);
    },
    [selectedClassName, applyAccentStyle]
  );

  const styledElement = useMemo(
    () => applySelectedStyle(element),
    [element, applySelectedStyle]
  );

  // TODO divide css
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
        {Object.entries(classInfo).map(([key, value]) => (
          <div key={key}>
            <h3 style={{ marginBottom: "10px" }}>{key}</h3>
            <div
              onMouseEnter={() => handleMouseEnter(key, "className")}
              onMouseLeave={handleMouseLeave}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "4px",
                cursor: "pointer",
                backgroundColor:
                  selectedClassName?.name === key ? "#f0f0f0" : "transparent",
              }}
            >
              {"className"}
            </div>
            {value.classNames && (
              <div
                style={{
                  borderTop: "1px solid #eee",
                  marginTop: "10px",
                  paddingTop: "10px",
                }}
              >
                {Object.entries(value.classNames).map(([subKey, _]) => (
                  <div
                    key={subKey}
                    onMouseEnter={() =>
                      handleMouseEnter(`${key}.${subKey}`, "classNames")
                    }
                    onMouseLeave={handleMouseLeave}
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "4px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedClassName?.name === `${key}.${subKey}`
                          ? "#f0f0f0"
                          : "transparent",
                    }}
                  >
                    classNames.{subKey}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylePreviewer;
