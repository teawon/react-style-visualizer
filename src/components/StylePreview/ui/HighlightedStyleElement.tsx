import React, { useCallback } from "react";
import { useStylePreviewer } from "../context";

export const HighlightedStyleElement: React.FC<{
  accentClassName: string;
}> = ({ accentClassName }) => {
  const { state } = useStylePreviewer();

  const applyAccentStyle = useCallback(
    (currentClassName: string | undefined, shouldApplyAccent: boolean) => {
      return `${currentClassName || ""} ${
        shouldApplyAccent ? accentClassName : ""
      }`.trim();
    },
    [accentClassName]
  );

  const applySelectedStyle = (el: React.ReactElement): React.ReactElement => {
    const [target, classNamesTarget] =
      state?.classState?.type === "classNames"
        ? [state?.classState?.elementKey, state?.classState?.propertyName]
        : [state?.classState?.elementKey, ""];

    const isTargetElement = el.key === target;

    const updatedClassName = applyAccentStyle(
      el.props.className,
      isTargetElement && state?.classState?.type === "className"
    );

    const updatedClassNames =
      state?.classState?.type === "classNames" && isTargetElement
        ? {
            ...(el.props.classNames || {}),
            [classNamesTarget]: applyAccentStyle(
              el.props.classNames?.[classNamesTarget],
              true
            ),
          }
        : el.props.classNames || {};

    const newProps = {
      ...el.props,
      className: updatedClassName,
      classNames: updatedClassNames,
      children: el.props.children
        ? React.Children.map(el.props.children, (child) =>
            React.isValidElement(child) ? applySelectedStyle(child) : child
          )
        : el.props.children,
    };

    return React.cloneElement(el, newProps);
  };

  return applySelectedStyle(state.element);
};
