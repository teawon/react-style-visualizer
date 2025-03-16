# react-style-visualizer

A React component visualization tool that helps you inspect and debug component styles by highlighting className regions and style mappings

![Image](https://github.com/user-attachments/assets/e79c288e-9280-443f-84c6-21c44bad2577)

## Installation

To install the package, run:

```bash
yarn add react-style-visualizer
```

## Usage

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

![Image](https://github.com/user-attachments/assets/f22163b1-9fea-4c37-8f43-64e184426793)

## Contributing

We warmly welcome pull requests and encourage you to use [GitHub issues](https://github.com/teawon/react-style-visualizer/issues) for submitting feature requests and reporting bugs.
