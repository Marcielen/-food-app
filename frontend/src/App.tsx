import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesContent } from "routes/index.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import { AuthProvider } from "contexts/AuthContext";
import { LayoutProvider } from "contexts/LayoutContext";
import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";
import { Loading } from "components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHealth = async () => {
      setIsLoading(true);
      const response = await api.get<void, ResponseApi>(EnumWebServices.HEALTH);

      if (response.sucess) {
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    };
    getHealth();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutProvider>
          <RoutesContent />
          {isLoading && <Loading isHealth />}
          <ToastContainer toastStyle={{ backgroundColor: "white" }} />
        </LayoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
