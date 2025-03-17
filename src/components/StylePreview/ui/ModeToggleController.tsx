import { useStylePreviewer } from "../context";

type ModeToggleButtonProps = {
  children: (
    mode: "hover" | "click",
    toggleMode: () => void
  ) => React.ReactNode;
};

export const ModeToggleController = ({ children }: ModeToggleButtonProps) => {
  const { state, dispatch } = useStylePreviewer();
  const toggleMode = () => dispatch({ type: "TOGGLE_MODE" });

  return <>{children(state.mode, toggleMode)}</>;
};
