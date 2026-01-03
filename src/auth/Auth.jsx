import { useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Auth({ setIsLoggedIn, checkAuth }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await api.post("/api/auth/login", formData);
        console.log("user logged in: ", res?.data);
        setIsLoggedIn(true);
        // localStorage.setItem("user", res?.data?.user)
        await checkAuth();
        navigate("/dashboard");
      } catch (e) {
        console.log("log error: ", e?.response?.data?.message);
        setIsLogin(false);
        setIsLoggedIn(false);
      }
    } else {
      try {
        const res = await api.post("/api/auth/register", formData);
        console.log("user registered: ", res?.data);
        await checkAuth();
        navigate("/dashboard");
        setIsLogin(true);
        setIsLoggedIn(true);
      } catch (e) {
        console.log("sign up error: ", e?.response?.data?.message);
        setIsLogin(false);
        setIsLoggedIn(false);
      }
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{ background: "var(--primary-gradient)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg card-hover">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="icon-circle gradient-bg text-white mx-auto mb-3">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <h2 className="fw-bold mb-2">
                    {isLogin ? "Welcome Back! 👋" : "Join ImageVault ✨"}
                  </h2>
                  <p className="text-muted">
                    {isLogin
                      ? "Sign in to access your image collection"
                      : "Create an account to start uploading images"}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-person me-2"></i>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-lock me-2"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient btn-lg w-100 fw-semibold mb-3"
                  >
                    <i
                      className={`bi ${
                        isLogin ? "bi-box-arrow-in-right" : "bi-person-plus"
                      } me-2`}
                    ></i>
                    {isLogin ? "Sign In" : "Create Account"}
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    {isLogin
                      ? "New to ImageVault?"
                      : "Already have an account?"}
                    <button
                      className="btn btn-link p-0 ms-1 text-decoration-none fw-semibold"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Create Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>

              <div className="card-footer bg-light text-center py-3">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Your data is secure with us
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
