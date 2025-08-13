import ApplicationViews from "./components/ApplicationViews.jsx";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ApplicationViews />;
    </AuthProvider>
  );
}

export default App;
