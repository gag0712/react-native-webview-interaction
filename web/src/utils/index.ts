import { useEffect, useState } from "react";
export type RootStackParamList = { HomeScreen: undefined; AScreen: undefined };
export const useIsReactNativeWebView: () => boolean = () => {
  const [isWebView, setIsWebView] = useState<boolean>(false);
  useEffect(() => {
    if (window.ReactNativeWebView) {
      setIsWebView(true);
    }
  }, []);

  return isWebView;
};

export const useGetAsyncStorage: (key: string) => {
  data: string;
  isLoading: boolean;
  isError: boolean;
} = (key) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const listener = (event: any) => {
    const { type, data } = JSON.parse(event.data);
    if (type === `GetAsyncStorage${key}`) {
      setData(data);
    }
    if (type === `ErrorAsyncStorage${key}`) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    (() => {
      document.addEventListener("message", listener);
      window.addEventListener("message", listener);
    })();
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "GetAsyncStorage", key: key })
    );
    return () => {
      document.removeEventListener("message", listener);
      window.removeEventListener("message", listener);
    };
  }, []);
  return { isLoading, data, isError };
};

export const setAsyncStorage: (
  key: string,
  value: string
) => Promise<void> = async (key, value) => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "SetAsyncStorage", key: key, value: value })
  );
};

export const navigate: (key: keyof RootStackParamList) => void = (key) => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "navigate", key: key })
  );
};
