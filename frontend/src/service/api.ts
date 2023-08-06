import axios, { AxiosError } from "axios";
import { signOut } from "contexts/AuthContext";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export interface ResponseApi<T = unknown> {
  sucess: boolean;
  data: T;
}

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
      Authorization: `Bearer ${cookies["@auth.token"]}`,
    },
  });

  api.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (response) => {
      const sucess = response.status === 200;

      if (response?.data) {
        return { data: response.data, sucess };
      }

      return { sucess };
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
