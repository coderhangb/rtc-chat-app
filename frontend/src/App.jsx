import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Decors from "./components/Decors.jsx";
import { useAuthStore } from "./store/useAuthStore.js";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="min-h-screen text-slate-100 bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
        <Decors />
        <PageLoader />
      </div>
    );

  return (
    <div className="min-h-screen text-slate-100 bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <Decors />
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
