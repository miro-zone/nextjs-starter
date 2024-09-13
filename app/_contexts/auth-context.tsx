"use client";

import {
  FC,
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type User = {
  name: string;
};

type State = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

type Action =
  | {
      type: "INITIALIZE";
      user?: User | null;
    }
  | {
      type: "LOGIN";
      user: User;
    }
  | {
      type: "LOGOUT";
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        isInitialized: true,
        isAuthenticated: !!action.user,
        user: action.user ?? null,
      };

    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.user };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
  }
};
const initialState: State = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
const AuthContext = createContext<
  State & { login: (user: User) => void; logout: () => void }
>({
  ...initialState,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      // Simulate api call auth.
      await new Promise((res) => setTimeout(() => res(true), 1000));
      // Get access token.
      const accessToken = localStorage.getItem("accessToken");
      // Call api and get the related user.
      const user = Math.random() > 0.5 ? { name: "Test User" } : null;
      // Change state.
      dispatch({ type: "INITIALIZE", user });
    })();
  }, []);

  const login = (user: User) => dispatch({ type: "LOGIN", user });

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
