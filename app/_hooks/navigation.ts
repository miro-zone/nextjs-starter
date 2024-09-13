"use client";

import { Reducer, useCallback, useEffect, useReducer } from "react";

type State = {
  header: boolean;
  sidebar: boolean;
  top: boolean;
};

type Action =
  | {
      type: "HEADER";
      payload?: boolean;
    }
  | {
      type: "SIDEBAR";
      payload?: boolean;
    }
  | {
      type: "TOP";
      payload: boolean;
    };

const initialState: State = {
  header: false,
  sidebar: false,
  top: true,
};

const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case "HEADER":
      return { ...state, header: payload ?? !state.header };
    case "SIDEBAR":
      return { ...state, sidebar: payload ?? !state.sidebar };
    case "TOP":
      return { ...state, top: payload };
  }
};

export const useNavigation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIntersect: IntersectionObserverCallback = useCallback(([entry]) => {
    dispatch({ type: "HEADER", payload: entry.isIntersecting });
  }, []);

  useEffect(() => {
    // Initialize observer object.
    const observer = new IntersectionObserver(onIntersect, {
      root: document,
      rootMargin: "300px",
    });
    // Start observing top element.
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ...state };
};
