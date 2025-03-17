import React from "react";
import { StylePreviewerProvider } from "./context";
import {
  HighlightedStyleElement,
  ClassController,
  ModeToggleController,
} from "./ui";
import type { StylePreviewerProps, ClassInfo } from "./type";
import styles from "./StylePreviewer.module.css";

const StylePreviewer = <T extends Record<string, ClassInfo>>({
  children,
  classInfo,
  accentClassName = "react-style-previewer-accent",
}: StylePreviewerProps<T>) => {
  return (
    <StylePreviewerProvider element={children} classInfo={classInfo}>
      <div className={styles.container}>
        <div className={styles.highlightedElement}>
          <HighlightedStyleElement accentClassName={accentClassName} />
        </div>
        <div className={styles.classController}>
          <div className={styles.modeToggleContainer}>
            <ModeToggleController>
              {(mode, toggleMode) => (
                <div
                  className={styles.modeToggle}
                  onClick={toggleMode}
                  role="switch"
                  aria-checked={mode === "click"}
                  tabIndex={0}
                  onKeyUp={(e) => e.key === "Enter" && toggleMode()}
                >
                  <span
                    className={`${styles.modeSpan} ${
                      mode === "hover" ? styles.modeSpanHover : ""
                    }`}
                  >
                    Hover
                  </span>
                  <span
                    className={`${styles.modeSpan} ${
                      mode === "click" ? styles.modeSpanClick : ""
                    }`}
                  >
                    Click
                  </span>
                </div>
              )}
            </ModeToggleController>
          </div>
          <ClassController>
            {(
              mode,
              classInfo,
              selectedClass,
              updateClassState,
              resetClassState
            ) => (
              <div>
                {Object.entries(classInfo).map(([key, value]) => {
                  const handleMouseLeave = () => {
                    if (mode === "click") return;
                    resetClassState();
                  };

                  return (
                    <div key={key}>
                      <h3 style={{ marginBottom: "10px" }}>{key}</h3>
                      <ClassItem
                        name={key}
                        isSelected={
                          selectedClass?.elementKey === key &&
                          selectedClass?.type === "className"
                        }
                        onMouseEnter={() => {
                          mode === "hover" &&
                            updateClassState({
                              elementKey: key,
                              type: "className",
                            });
                        }}
                        onMouseLeave={handleMouseLeave}
                        onClick={() =>
                          mode === "click" &&
                          updateClassState({
                            elementKey: key,
                            type: "className",
                          })
                        }
                      />
                      {value.classNames && (
                        <div
                          style={{
                            borderTop: "1px solid #eee",
                            marginTop: "10px",
                            paddingTop: "10px",
                          }}
                        >
                          {Object.entries(value.classNames).map(
                            ([propertyName, _]) => (
                              <ClassItem
                                key={propertyName}
                                name={`classNames.${propertyName}`}
                                isSelected={
                                  selectedClass?.elementKey === key &&
                                  selectedClass?.type === "classNames" &&
                                  selectedClass?.propertyName === propertyName
                                }
                                onMouseEnter={() => {
                                  mode === "hover" &&
                                    updateClassState({
                                      elementKey: key,
                                      type: "classNames",
                                      propertyName: propertyName,
                                    });
                                }}
                                onMouseLeave={handleMouseLeave}
                                onClick={() =>
                                  mode === "click" &&
                                  updateClassState({
                                    elementKey: key,
                                    type: "classNames",
                                    propertyName: propertyName,
                                  })
                                }
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ClassController>
        </div>
      </div>
    </StylePreviewerProvider>
  );
};

export default StylePreviewer;

StylePreviewer.Provider = StylePreviewerProvider;
StylePreviewer.ModeToggleController = ModeToggleController;
StylePreviewer.ClassController = ClassController;
StylePreviewer.HighlightedStyleElement = HighlightedStyleElement;

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
    className={`${styles.classItem} ${
      isSelected ? styles.classItemSelected : ""
    }`}
  >
    {name}
  </div>
);
