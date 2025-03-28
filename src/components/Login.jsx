import React, {  useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import UseAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle } = UseAuth;
//   const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path after login (default is "/")
  const from = location.state?.from?.pathname || "/";

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      toast.success("Login successful!"); // Show success Toast
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Incorrect email or password. Try Again"); // Show specific error Toast
      } else {
        toast.error("Failed to log in. Please try again."); // Generic error Toast
      }
    }
  };

  // Handle Google sign-in
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login successful!"); // Show success Toast
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error); // Log error for debugging
      toast.error("Something went wrong. Try again"); // Show generic error Toast
    }
    };
    

    const theme ="light"

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Main Login Container */}
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Account
            </span>
            <span className="bg-red-600 rounded-sm p-1 text-white">Login</span>
          </h1>
        </div>

        {/* Email Input Field */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="mb-6">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Link for password recovery */}
            <p className="text-sm text-right mt-1">
              <a href="#" className="text-red-600 underline">
                Forgot Password?
              </a>
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't have an account?
            <Link to="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <div className="mt-6">
            <button
              onClick={handleSignInWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold rounded-md py-2 px-4 hover:bg-red-700 transition duration-300 cursor-pointer"
            >
              <FaGoogle className="text-white" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
