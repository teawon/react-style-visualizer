import { StylePreviewerProvider } from "./context";
import {
  HighlightedStyleElement,
  ClassController,
  ModeToggleController,
} from "./ui";
import type { StylePreviewerProps, ClassInfo } from "./type";

const StylePreviewer = <T extends Record<string, ClassInfo>>({
  children,
  classInfo,
  accentClassName = "react-style-previewer-accent",
}: StylePreviewerProps<T>) => {
  return (
    <StylePreviewerProvider element={children} classInfo={classInfo}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "60%",
            minWidth: "400px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <HighlightedStyleElement accentClassName={accentClassName} />
        </div>
        <div
          style={{
            width: "40%",
            minWidth: "300px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <ModeToggleController>
              {({ mode, toggleMode }) => (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "#e4e4e7",
                    padding: "4px",
                    borderRadius: "24px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={toggleMode}
                  role="switch"
                  aria-checked={mode === "click"}
                  tabIndex={0}
                  onKeyUp={(e) => e.key === "Enter" && toggleMode()}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      width: "40px",
                      color: mode === "hover" ? "#fff" : "#71717a",
                      backgroundColor:
                        mode === "hover" ? "#3b82f6" : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Hover
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: mode === "click" ? "#fff" : "#71717a",
                      backgroundColor:
                        mode === "click" ? "#0fba4b" : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Click
                  </span>
                </div>
              )}
            </ModeToggleController>
          </div>
          <ClassController>
            {({
              mode,
              classInfo,
              selectedClass,
              updateClassState,
              resetClassState,
            }) => (
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
