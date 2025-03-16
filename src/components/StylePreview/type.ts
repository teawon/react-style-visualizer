export type ClassInfo = {
  className?: string;
  classNames?: Record<string, string>;
};

export type StylePreviewerProps<T extends Record<string, ClassInfo>> = {
  accentClassName?: string;
  classInfo: T;
  children: (keys: { [K in keyof T]: K }) => React.ReactElement;
};
