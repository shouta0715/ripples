import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

type UseSocketProps<T> = {
  callback: (data: T) => void;
};

const url = "ws://localhost:8787";
const width = window.innerWidth;
const height = window.innerHeight;
export const useSocket = <T>({ callback }: UseSocketProps<T>) => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";

  if (!id) throw new Error("id is required");

  const { lastJsonMessage, sendJsonMessage } = useWebSocket<T>(
    `${url}?id=${id}&width=${width}&height=${height}`
  );

  useEffect(() => {
    if (!lastJsonMessage) return;

    callback(lastJsonMessage);
  }, [callback, lastJsonMessage]);

  return { lastJsonMessage, sendJsonMessage };
};
