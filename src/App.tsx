import { useState } from "react";
import { PageTemplate } from "./PageTemplate";

function App() {
  const [count, setCount] = useState(0);

  return <PageTemplate />;
}

export default App;
