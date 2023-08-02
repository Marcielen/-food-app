import { EnumWebServices } from "constants/webServices";
import { parseCookies } from "nookies";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "service/api";

type LayoutContextData = {
  breadcrumbs: string;
  setBreadcrumbs: Dispatch<SetStateAction<string>>;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  itemsPay: ListItemsPay[];
  setItemsPay: (value: SetStateAction<ListItemsPay[]>) => void;
  getDataBuy: () => Promise<void>;
};

type LayoutProviderProps = {
  children: ReactNode;
};

type ListItemsPay = {
  id: string;
  price: number;
  order_pad_id: string;
  name: string;
  isChecked?: boolean;
};

export const LayoutContext = createContext({} as LayoutContextData);

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [itemsPay, setItemsPay] = useState<ListItemsPay[]>([]);

  const cookies = parseCookies(undefined);

  const valueCookies = cookies["@auth.token"];

  const getDataBuy = useCallback(async () => {
    const response = await api.get<ListItemsPay[]>(EnumWebServices.BUY);

    setItemsPay(
      response.data.map((item) => ({
        ...item,
        isChecked: false,
      }))
    );
  }, []);

  useEffect(() => {
    if (valueCookies) {
      getDataBuy();
    }
  }, [getDataBuy, valueCookies]);

  return (
    <LayoutContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        menuIsOpen,
        setMenuIsOpen,
        itemsPay,
        setItemsPay,
        getDataBuy,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLayoutContext(): LayoutContextData {
  const context = useContext(LayoutContext);

  if (!context)
    throw new Error("useLayoutContext must be used within a LayoutProvider.");

  return context;
}
