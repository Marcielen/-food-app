import axios, { AxiosError } from "axios";
import { signOut } from "contexts/AuthContext";
import { parseCookies } from "nookies";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // qualquer erro 401 não autorizado deve deslogar

        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
