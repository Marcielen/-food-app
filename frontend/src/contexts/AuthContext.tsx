import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { api } from "service/api";
import { EnumWebServices } from "constants/webServices";

type AuthContextData = {
  user: UserProps | undefined;
  valueUser: ValueUserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  userExpiration: boolean;
};

type ValueUserProps = {
  email: string;
  name: string;
  exp: number;
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

// eslint-disable-next-line react-refresh/only-export-components
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

  const cookies = parseCookies(undefined);

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

    window.location.reload();
    navigate("/register");
  }

  const valueUser = jwt_decode(cookies["@auth.token"] || "") as ValueUserProps;

  const userExpiration = useCallback(() => {
    if (valueUser.exp) {
      const dataExp = new Date(valueUser.exp * 1000);

      return new Date() > dataExp;
    }

    return true;
  }, [valueUser])();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        valueUser,
        userExpiration,
      }}
    >
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
