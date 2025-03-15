import StylePreviewer from "../../components/StylePreviewer";

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
  };

  const compositionElement = (props: typeof compositionClassInfo) => (
    <MyComponent>
      <MyComponent.Title
        key="MyComponent.Title"
        className={props["MyComponent.Title"].className}
      >
        title
      </MyComponent.Title>
      <MyComponent.Description
        key="MyComponent.Description"
        className={props["MyComponent.Description"].className}
      >
        description
      </MyComponent.Description>
      <MyComponent.Content
        key="MyComponent.Content"
        className={props["MyComponent.Content"].className}
      >
        <TestComponent
          key="TestComponent"
          className={props.TestComponent.className}
          classNames={props.TestComponent.classNames}
        />
      </MyComponent.Content>
    </MyComponent>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <StylePreviewer
        element={compositionElement(compositionClassInfo)}
        classInfo={compositionClassInfo}
      />
    </div>
  );
};

export default App;
