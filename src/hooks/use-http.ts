import { useReducer, useCallback  } from "react";

import { ProductsData } from "../models/data.models";

interface HttpState {
  data: ProductsData[] | null;
  error: string | null;
  status: string | null;
}

type HttpAction =
  | { type: "GET" }
  | { type: "SUCCESS"; responseData: ProductsData[] }
  | { type: "ERROR"; errorMessage: string };

function httpReducer(state: HttpState, action: HttpAction) {
  if (action.type === "GET") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
}

const useHttp = (requestFunction: any, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function () {
      dispatch({ type: "GET" });
      try {
        const responseData = await requestFunction();
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: any) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Products could not load!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
