import { AuthProvider } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { RoutesContent } from "routes/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
