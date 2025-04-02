import StylePreviewer from "../../components/StylePreview";
import {
  CompositionComponent,
  MyComponent,
  SampleClassInfo,
} from "./SampleCompoent";

export const DefaultExample = () => {
  return (
    <div style={{ width: "800px", height: "400px" }}>
      <StylePreviewer classInfo={SampleClassInfo}>
        {(keys) => (
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
        )}
      </StylePreviewer>
    </div>
  );
};
