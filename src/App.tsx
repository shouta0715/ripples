import React from "react";
import { useP5 } from "@/use-p5";

const App = () => {
  const { canvasRef } = useP5();

  return (
    <div>
      <div ref={canvasRef} className="[&>canvas]:border" />
    </div>
  );
};

export default App;
