import { StylePreviewerProvider } from "./context";
import { HighlightedStyleElement, ClassSelectList } from "./ui";
import type { StylePreviewerProps, ClassInfo } from "./type";

const StylePreviewer = <T extends Record<string, ClassInfo>>({
  children,
  classInfo,
  accentClassName = "accent",
}: StylePreviewerProps<T>) => {
  const element = children(
    Object.keys(classInfo).reduce((acc, key) => {
      acc[key as keyof T] = key as keyof T;
      return acc;
    }, {} as { [K in keyof T]: K })
  );

  return (
    <StylePreviewerProvider>
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
          <HighlightedStyleElement
            element={element}
            accentClassName={accentClassName}
          />
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
          <ClassSelectList classInfo={classInfo} />
        </div>
      </div>
    </StylePreviewerProvider>
  );
};

export default StylePreviewer;
