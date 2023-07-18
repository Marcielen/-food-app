import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LayoutContextData = {
  breadcrumbs: string;
  setBreadcrumbs: Dispatch<SetStateAction<string>>;
};

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutContext = createContext({} as LayoutContextData);

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState("");

  return (
    <LayoutContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
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
