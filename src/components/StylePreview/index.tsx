import { StylePreviewerProvider } from "./context";
import {
  HighlightedStyleElement,
  ClassSelectList,
  ModeToggleButton,
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
            <ModeToggleButton />
          </div>
          <ClassSelectList classInfo={classInfo} />
        </div>
      </div>
    </StylePreviewerProvider>
  );
};

export default StylePreviewer;
