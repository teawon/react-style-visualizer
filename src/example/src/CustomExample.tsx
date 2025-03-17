import StylePreviewer from "../../components/StylePreview";
import {
  CompositionComponent,
  MyComponent,
  SampleClassInfo,
} from "./SampleCompoent";

export const CustomExample = () => {
  return (
    <>
      <StylePreviewer.Provider
        element={(keys) => (
          <>
            <MyComponent>
              <MyComponent.Title key={keys["MyComponent.Title"]}>
                title
              </MyComponent.Title>
              <MyComponent.Description key={keys["MyComponent.Description"]}>
                description
              </MyComponent.Description>
              <MyComponent.Content key={keys["MyComponent.Content"]}>
                <CompositionComponent key={keys.CompositionComponent} />
              </MyComponent.Content>
            </MyComponent>
          </>
        )}
        classInfo={SampleClassInfo}
      >
        <div>
          <StylePreviewer.HighlightedStyleElement />
          <StylePreviewer.ClassController>
            {({
              classInfo,
              selectedClass,
              updateClassState,
              resetClassState,
            }) => (
              <div>
                {Object.entries(classInfo).map(([key, value]) => (
                  <div
                    key={key}
                    onMouseEnter={() =>
                      updateClassState({
                        elementKey: key,
                        type: "className",
                      })
                    }
                    onMouseLeave={resetClassState}
                    style={{
                      backgroundColor:
                        selectedClass?.elementKey === key ? "#f0f0f0" : "#fff",
                    }}
                  >
                    {key}
                  </div>
                ))}
              </div>
            )}
          </StylePreviewer.ClassController>
        </div>
      </StylePreviewer.Provider>
    </>
  );
};
