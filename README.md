# react-style-visualizer

A React component visualization tool that helps you inspect and debug component styles by highlighting className regions and style mappings

![Image](https://github.com/user-attachments/assets/e79c288e-9280-443f-84c6-21c44bad2577)

## Installation

To install the package, run:

```bash
yarn add react-style-visualizer
```

## Usage

### Default Example

```tsx
import { StylePreviewer } from "react-style-visualizer";

const App = () => {
  const compositionClassInfo = {
    "MyComponent.Title": {
      className: "",
    },
    "MyComponent.Description": {
      className: "",
    },
    "MyComponent.Content": {
      className: "",
    },
    CompositionComponent: {
      className: "",
      classNames: {
        title: "",
        content: "",
      },
    },
  } as const;

  return (
    <StylePreviewer classInfo={compositionClassInfo}>
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
  );
};
```

### Custom Example(Headless)

```tsx
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
        <>
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
        </>
      </StylePreviewer.Provider>
    </>
  );
};
```

![Image](https://github.com/user-attachments/assets/f22163b1-9fea-4c37-8f43-64e184426793)

---

### Component Description

When using `react-style-visualizer`, it's crucial to map the `key` values correctly to the class names defined in `classInfo`.

This ensures that the styles are applied and visualized correctly.

#### StylePreviewer

- The StylePreviewer component provides the base UI for visualizing and interacting with component styles.

| Prop              | Type                                                                                                                          | Description                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `children`        | `React.ReactNode`                                                                                                             | The child components to be rendered within the `StylePreviewer` context. |
| `classInfo`       | [`Record<string, ClassInfo>`](https://github.com/teawon/react-style-visualizer/blob/main/src/components/StylePreview/type.ts) | An object mapping component keys to their respective class information.  |
| `accentClassName` | `string`                                                                                                                      | The class name to be used for the highlighted style.                     |

<br>
<br>
<br>

#### StylePreviewer.Provider

- The StylePreviewer.Provider component is used to provide the context for the StylePreviewer component.

| Prop        | Type                                                                                                                          | Description                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                                                                                                             | The child components to be rendered within the `StylePreviewer` context. |
| `classInfo` | [`Record<string, ClassInfo>`](https://github.com/teawon/react-style-visualizer/blob/main/src/components/StylePreview/type.ts) | An object mapping component keys to their respective class information.  |

<br>

#### StylePreviewer.HighlightedStyleElement

- The StylePreviewer.HighlightedStyleElement component applies accent styles to visually highlight the selected element.

| Prop              | Type     | Description                                      |
| ----------------- | -------- | ------------------------------------------------ |
| `accentClassName` | `string` | class name to be used for the highlighted style. |

- The StylePreviewer.Provider component is used to provide the context for the StylePreviewer component.

<br>

#### StylePreviewer.ClassController

- The StylePreviewer.ClassController component is used to control the class state of the StylePreviewer component.

| Prop             | Type                                                                                                                                                       | Description                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| mode             | `"hover" \| "click"`                                                                                                                                       | Indicates the current interaction mode. "hover" changes styles on hover, while "click" changes styles on click. |
| classInfo        | `Record<string, ClassInfo>`                                                                                                                                | A mapping of component keys to their respective class information, used to determine style application.         |
| selectedClass    | `StylePreviewerState["classState"]`                                                                                                                        | Represents the current state of the selected class, including the selected element and class type.              |
| updateClassState | [`(props: ClassNameState \| ClassNamesState) => void`](<(https://github.com/teawon/react-style-visualizer/blob/main/src/components/StylePreview/type.ts)>) | A function to update the class state, allowing dynamic changes to the styling of components.                    |
| resetClassState  | `() => void`                                                                                                                                               | A function to reset the class state to its default, clearing any applied styles.                                |

```tsx
StylePreviewer.ClassController>
  {({ mode, classInfo, selectedClass, updateClassState, resetClassState }) => (
    <div>
      {/* Render your UI components here, using the provided functions and state */}
    </div>
  )}
</StylePreviewer.ClassController>
```

<br>

#### StylePreviewer.ModeToggleController

- The StylePreviewer.ModeToggleController component is used to toggle the interaction mode of the StylePreviewer component.

| Prop       | Type              | Description                                                              |
| ---------- | ----------------- | ------------------------------------------------------------------------ |
| `children` | `React.ReactNode` | The child components to be rendered within the `StylePreviewer` context. |

```tsx
<StylePreviewer.ModeToggleController>
  {({ mode, toggleMode }) => (
    <div>
      {/* Render your UI components here, using the provided functions and state */}
    </div>
  )}
</StylePreviewer.ModeToggleController>
```

## Contributing

We warmly welcome pull requests and encourage you to use [GitHub issues](https://github.com/teawon/react-style-visualizer/issues) for submitting feature requests and reporting bugs.
