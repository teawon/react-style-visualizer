// export type StylePreviewerProps = {
//   element: React.ReactElement;
//   classInfo: {
//     classNames?: string[];
//     subComponents?: string[];
//   };
// };

export type ClassInfo = {
  className?: string;
  classNames?: Record<string, string>;
};

export type StylePreviewerProps<T extends Record<string, ClassInfo>> = {
  classInfo: T;
  children: (keys: { [K in keyof T]: K }) => React.ReactElement;
};
