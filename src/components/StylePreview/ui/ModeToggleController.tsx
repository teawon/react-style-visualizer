import { useStylePreviewer } from "../context";

type ModeToggleButtonProps = {
  children: (props: {
    mode: "hover" | "click";
    toggleMode: () => void;
  }) => React.ReactNode;
};

export const ModeToggleController = ({ children }: ModeToggleButtonProps) => {
  const { state, dispatch } = useStylePreviewer();
  const toggleMode = () => dispatch({ type: "TOGGLE_MODE" });

  return <>{children({ mode: state.mode, toggleMode })}</>;
};
