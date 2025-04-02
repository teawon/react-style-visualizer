import { CustomExample } from "./CustomExample";
import { DefaultExample } from "./DefaultExample";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <div>
        <DefaultExample />
      </div>
      <div>
        <CustomExample />
      </div>
    </div>
  );
};

export default App;
