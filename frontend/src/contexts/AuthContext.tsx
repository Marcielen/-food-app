import { createContext, ReactNode, useContext, useState } from "react";

import { destroyCookie } from "nookies";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    window.open("/");
    window.location.reload();
  } catch {
    console.log("erro ao deslogar");
  }
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    console.log("DADOS PARA LOGAR ", email);
    console.log("SENHA ", password);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be used within a MusicProvider.");

  return context;
}
