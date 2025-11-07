import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Auth from "./auth/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import Form from "./pages/Form.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./components/Home.jsx"
import AllImages from "./pages/AllImages.jsx";
import SingleImages from "./pages/SingleImages.jsx"
import EditImages from "./pages/EditImages.jsx"
import History from "./pages/History.jsx"
function App() {
  return (
    <div className="min-vh-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/form" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allimages" element={<AllImages />} />
          <Route path="/images/:id" element={<SingleImages />} />
          <Route path="/images/:id/edit" element={<EditImages />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
