import { use, createContext, type PropsWithChildren } from "react";

import { useStorageState } from "./useStorageState";
import { api } from "@/constants/api";

interface AuthContextState {
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post("/auth/sign-in", { email, password });
    setSession(data.token);
  };
  const signUp = async (name: string, email: string, password: string) => {
    const { data } = await api.post("/auth/sign-up", { name, email, password });
    setSession(data.token);
  };
  const signOut = () => setSession(null);
  const value = {
    signIn,
    signUp,
    signOut,
    session,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
