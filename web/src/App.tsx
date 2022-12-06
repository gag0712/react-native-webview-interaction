import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<any>();
  const listener = (event: any) => {
    const { type, data } = JSON.parse(event.data);
    if (type) {
      setData(data);
    }
  };
  useEffect(() => {
    (() => {
      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    })();
    return () => {
      document.removeEventListener("message", listener);
      window.removeEventListener("message", listener);
    };
  }, []);

  return (
    <div className="App">
      <div style={{ justifyContent: "center" }}>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("asdf");
          }}
          style={{ alignItems: "center" }}
        >
          Web to App
        </div>
        {data}
      </div>
    </div>
  );
}

export default App;
