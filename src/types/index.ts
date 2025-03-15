// export type StylePreviewerProps = {
//   element: React.ReactElement;
//   classInfo: {
//     classNames?: string[];
//     subComponents?: string[];
//   };
// };

export type StylePreviewerProps = {
  element: React.ReactElement;
  classInfo: Record<
    string,
    { className?: string; classNames?: Record<string, string> }
  >;
};
