import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { destroyCookie, setCookie } from "nookies";
import { api } from "service/api";
import { EnumWebServices } from "constants/webServices";

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

type AuthProps = {
  token: string;
  id: string;
  name: string;
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
    window.location.href = "/";
  } catch {
    console.log("erro ao deslogar");
  }
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  async function signIn({ email, password }: SignInProps) {
    const response = await api.post<AuthProps>(EnumWebServices.SESSION, {
      email,
      password,
    });

    const { id, token, name } = response.data;

    setCookie(undefined, "@auth.token", token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    setUser({
      id,
      name,
      email,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    navigate("/teste");
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
