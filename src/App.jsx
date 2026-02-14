import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Auth from "./auth/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import Form from "./pages/Form.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./components/Home.jsx";
import AllImages from "./pages/AllImages.jsx";
import SingleImages from "./pages/SingleImages.jsx";
import EditImages from "./pages/EditImages.jsx";
import History from "./pages/History.jsx";
import { api } from "./utils/api.js";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me");
      console.log("user app: ", res?.data);
      setUser(res?.data);
      setIsLoggedIn(true);
    } catch (e) {
      console.log("error: ", e?.response?.data?.message);
      setIsLoggedIn(false);
      setUser(null);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="min-vh-100">
      <Navbar
        checkAuth={checkAuth}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/auth"
            element={
              <Auth
                checkAuth={checkAuth}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/form" element={<Form />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                checkAuth={checkAuth}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/allimages" element={<AllImages isLoggedIn={isLoggedIn}/>} />
          <Route path="/images/:id" element={<SingleImages />} />
          <Route path="/images/:id/edit" element={<EditImages />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
