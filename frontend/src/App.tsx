import { AuthProvider } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { RoutesContent } from "routes/index.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesContent />
        <ToastContainer toastStyle={{ backgroundColor: "white" }} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
