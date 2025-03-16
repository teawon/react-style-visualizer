import StylePreviewer from "../../components/StylePreview";

type TChild = {
  children: React.ReactNode;
};

const TestComponent = ({
  className,
  classNames,
}: {
  className?: string;
  classNames?: Record<string, string>;
}) => {
  return (
    <div className={className}>
      <div className={classNames?.title}>This is a title</div>
      <div className={classNames?.content}>This is some content</div>
    </div>
  );
};

const MyComponent = ({ children }: TChild) => {
  return <div className="border p-4 m-4">{children}</div>;
};

MyComponent.Title = ({
  children,
  className,
}: TChild & { className?: string }) => {
  return <h2 className={className}>{children}</h2>;
};

MyComponent.Description = ({
  children,
  className,
}: TChild & { className?: string }) => {
  return <p className={className}>{children}</p>;
};

MyComponent.Content = ({
  children,
  className,
}: TChild & { className?: string }) => {
  return <div className={className}>{children}</div>;
};

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
    TestComponent: {
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
            <TestComponent key={keys.TestComponent} />
          </MyComponent.Content>
        </MyComponent>
      )}
    </StylePreviewer>
  );
};

export default App;
