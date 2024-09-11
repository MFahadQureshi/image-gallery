import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"; // Ensure this is correctly imported
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from './context/auth';  // Ensure correct import path

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>} 
        />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>} 
        />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>} 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
