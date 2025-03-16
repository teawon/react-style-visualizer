export type ClassInfo = {
  className?: string;
  classNames?: Record<string, string>;
};

export type StylePreviewerProps<T extends Record<string, ClassInfo>> = {
  accentClassName?: string;
  classInfo: T;
  children: (keys: { [K in keyof T]: K }) => React.ReactElement;
};

type DefaultState = null;

type ClassNameState = {
  elementKey: string;
  type: "className";
};

type ClassNamesState = {
  elementKey: string;
  type: "classNames";
  propertyName: string;
};

export type StylePreviewerState =
  | ClassNameState
  | ClassNamesState
  | DefaultState;

export type Action =
  | { type: "SET_CLASSNAME"; payload: ClassNameState }
  | { type: "SET_CLASSNAMES"; payload: ClassNamesState }
  | { type: "RESET" };
