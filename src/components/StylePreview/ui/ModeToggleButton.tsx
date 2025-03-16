import { useStylePreviewer } from "../context";

export const ModeToggleButton = () => {
  const { state, dispatch } = useStylePreviewer();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: "#e4e4e7",
          padding: "4px",
          borderRadius: "24px",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={() => dispatch({ type: "TOGGLE_MODE" })}
        role="switch"
        aria-checked={state.mode === "click"}
        tabIndex={0}
        onKeyUp={(e) => e.key === "Enter" && dispatch({ type: "TOGGLE_MODE" })}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: 500,
            width: "40px",
            color: state.mode === "hover" ? "#fff" : "#71717a",
            backgroundColor: state.mode === "hover" ? "#3b82f6" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          Hover
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: 500,
            color: state.mode === "click" ? "#fff" : "#71717a",
            backgroundColor: state.mode === "click" ? "#0fba4b" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          Click
        </span>
      </div>
    </div>
  );
};
