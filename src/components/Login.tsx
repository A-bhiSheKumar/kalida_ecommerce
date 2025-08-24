import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import loginImg from "../assets/loginimage.png";

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("CUSTOMER");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Modal state
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const payload = { username, password };
      const response = await api.auth.login(payload);

      if (response) {
        if (response.role === "ADMIN") {
          setErrorMessage(
            "Invalid credentials. Please check your username or password."
          );
          setErrorModalOpen(true);
          return;
        }

        toast.success("Login successful!");
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        localStorage.setItem("user_id", response.user_id.toString());
        localStorage.setItem("role", response.role);
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);

        navigate("/");
      } else {
        setErrorMessage(
          "Invalid credentials. Please check your username or password."
        );
        setErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Invalid credentials. Please check your username or password."
      );
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const payload = {
        username,
        email,
        password,
        role,
        phone_number: phoneNumber,
        address,
        company_name: companyName,
      };
      const response = await api.auth.register(payload);

      if (response) {
        toast.success("Signup successful. Please log in.");
        setIsSignup(false);
      } else {
        setErrorMessage("Signup failed. Please try again.");
        setErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong during signup. Please try again.");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {/* 🔹 Error Modal */}
      {/* Glassmorphism Modal */}
      {errorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                  bg-white/30 backdrop-blur-sm md:backdrop-blur-lg
                  supports-[backdrop-filter]:bg-white/30"
        >
          <div
            className="w-[90%] max-w-md rounded-2xl
                    bg-white/60 backdrop-blur-md
                    border border-white/20 shadow-xl ring-1 ring-black/5 p-6"
          >
            <h2 className="text-xl font-semibold text-red-600">Login Error</h2>
            <p className="mt-2 text-gray-800">{errorMessage}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setErrorModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Login/Signup Form */}
      <div className="min-h-screen flex">
        {/* Left side */}
        <div className="w-1/2 hidden md:flex items-center justify-center relative p-2 bg-white">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
            <img
              src={loginImg}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div>
              <p className="text-sm text-gray-600">
                {isSignup ? "New to Organization?" : "Login your account"}
              </p>
              <h2 className="text-3xl font-bold text-black">
                {isSignup ? "Create Account" : "Welcome Back!"}
              </h2>
              <p className="text-gray-600 mt-1">
                {isSignup
                  ? "Please fill the form to create an account"
                  : "Enter your username and password"}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-black text-sm mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                  placeholder="Enter username or Email"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-black text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                    placeholder="Enter email"
                  />
                </div>
              )}

              <div>
                <label className="block text-black text-sm mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                  placeholder="Enter your password"
                />
              </div>

              {isSignup && (
                <>
                  <div>
                    <label className="block text-black text-sm mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                      placeholder="Enter address"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                      placeholder="Enter company name"
                    />
                  </div>
                </>
              )}

              <button
                onClick={isSignup ? handleSignup : handleLogin}
                className="w-full py-3 rounded-md bg-gradient-to-r from-black to-gray-800 text-white font-semibold hover:opacity-90 transition flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isSignup ? (
                  "Sign up"
                ) : (
                  "Sign in"
                )}
              </button>

              <p className="text-sm text-gray-600 text-center">
                {isSignup ? "Already have an account?" : "New to Organization?"}{" "}
                <span
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-black hover:underline cursor-pointer"
                >
                  {isSignup ? "Login" : "Sign up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
