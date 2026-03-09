import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SelectionBus } from "./pages/SelectionBus";
import PaymentProcessing from "./components/layout/PaymentProcessing";
import AboutPage from "./pages/AboutPage";
import { useCheckAuth } from "./hooks/CheckAuth";
import { useAuth } from "./hooks/Auth";
import { ToastContainer } from "react-toastify";
import { UserProfile } from "./components/User/Profile";
import { AdminSettingsPage } from "./pages/SettingPage";

function App() {
  const { logged } = useAuth();
  useCheckAuth();
  return (
    <BrowserRouter>
      <ToastContainer draggable />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={logged ? <HomePage /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/selectionbus/:id"
              element={logged ? <SelectionBus /> : <LoginPage />}
            />

            <Route
              path="/PaymentProcessing"
              element={logged ? <PaymentProcessing /> : <LoginPage />}
            />
            <Route path="/about-us" element={<AboutPage />} />

            <Route
              path="/profile"
              element={logged ? <UserProfile />:<LoginPage/>}
            />

            <Route
              path="/settings"
              element={logged ? <AdminSettingsPage /> : <LoginPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
