import { StylePreviewerProvider } from "./context";
import {
  HighlightedStyleElement,
  ClassSelectList,
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
          <HighlightedStyleElement accentClassName={accentClassName} />
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
              {(mode, toggleMode) => (
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
          <ClassSelectList />
        </div>
      </div>
    </StylePreviewerProvider>
  );
};

export default StylePreviewer;
