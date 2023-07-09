import { AuthProvider } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { RoutesContent } from "routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
