import axios, { AxiosError } from "axios";
import { signOut } from "contexts/AuthContext";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Authorization: `Bearer ${cookies["@auth.token"]}`,
    },
  });

  api.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (response) => {
      if (response?.data) {
        return response;
      }
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.response?.data?.error || "");
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
