import React, { useCallback } from "react";
import { useStylePreviewer } from "../context";

export const HighlightedStyleElement: React.FC<{
  element: React.ReactElement;
  accentClassName: string;
}> = ({ element, accentClassName }) => {
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
      state?.type === "classNames"
        ? [state?.elementKey, state?.propertyName]
        : [state?.elementKey, ""];

    const isTargetElement = el.key === target;

    const updatedClassName = applyAccentStyle(
      el.props.className,
      isTargetElement && state?.type === "className"
    );

    const updatedClassNames =
      state?.type === "classNames" && isTargetElement
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

  return applySelectedStyle(element);
};
