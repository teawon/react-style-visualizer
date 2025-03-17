import React, { type ReactNode } from "react";

type TChild = {
  children: ReactNode;
};

export const CompositionComponent = ({
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

export const MyComponent = ({ children }: TChild) => {
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

export const SampleClassInfo = {
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
