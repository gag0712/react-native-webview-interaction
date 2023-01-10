import React, { useEffect, useState } from "react";
import "./App.css";
import {
  navigate,
  setAsyncStorage,
  useGetAsyncStorage,
  useIsReactNativeWebView,
} from "./utils";

function App() {
  const isWebView = useIsReactNativeWebView();
  const { isLoading, data, isError } = useGetAsyncStorage("key3");

  return (
    <div className="App">
      <div style={{ justifyContent: "center" }}>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage(isWebView.toString());
          }}
          style={{ alignItems: "center" }}
        >
          Web to App
        </div>
        <div
          onClick={() => {
            navigate("AScreen");
          }}
        >
          go to AScreen
        </div>

        {isLoading ? "no" : data}
        {isError.toString()}
      </div>
    </div>
  );
}

export default App;
