import { BrowserRouter } from "react-router-dom";
import { RoutesContent } from "routes/index.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import { AuthProvider } from "contexts/AuthContext";
import { LayoutProvider } from "contexts/LayoutContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutProvider>
          <RoutesContent />
          <ToastContainer toastStyle={{ backgroundColor: "white" }} />
        </LayoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
