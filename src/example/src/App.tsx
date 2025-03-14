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

  // TODO 합성컴포넌트의 경우 처리 방안 모색 필요
  const compositionElement = (props: typeof compositionClassInfo) => (
    <MyComponent>
      <MyComponent.Title className={props["MyComponent.Title"].className}>
        title
      </MyComponent.Title>
      <MyComponent.Description
        className={props["MyComponent.Description"].className}
      >
        description
      </MyComponent.Description>
      <MyComponent.Content className={props["MyComponent.Content"].className}>
        <TestComponent
          className={props.TestComponent.className}
          classNames={props.TestComponent.classNames}
        />
      </MyComponent.Content>
    </MyComponent>
  );

  const singleClassInfo = {
    classNames: ["title", "content"],
  };

  const SingleElement = () => (
    <TestComponent
      className=""
      classNames={{
        title: "",
        content: "",
      }}
    />
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* <StylePreviewer
        element={compositionElement(compositionClassInfo)}
        classInfo={compositionClassInfo}
      /> */}
      <StylePreviewer element={SingleElement()} classInfo={singleClassInfo} />
    </div>
  );
};

export default App;
