import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import { motion, AnimatePresence } from "framer-motion";

interface SignUpPageProps {
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}
const SignUpPage: React.FC<SignUpPageProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const closeModal = () => {
    if (typeof onClose === "function") onClose();
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_no: phone,
        password,
        role: 2,
      });

      const loginRes = await axios.post(`${API_BASE_URL}api/token/`, {
        email,
        password,
      });

      localStorage.setItem("accessToken", loginRes.data.access);
      localStorage.setItem("refreshToken", loginRes.data.refresh);

      if (typeof onClose === "function") onClose();
    } catch (error: any) {
      console.error("Signup Error →", error.response?.data || error.message);
      alert("Sign up failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="signup-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="signup-modal"
          initial={{ y: -30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl px-6 py-8 border border-gray-200"
        >
          <button
            onClick={() => {
              if (typeof onClose === "function") onClose();
            }}
            className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
          >
            ×
          </button>
          <h2 className="text-2xl text-center font-semibold mb-6">Sign Up</h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-lg font-semibold"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                if (typeof onClose === "function") onClose();
                setTimeout(() => {
                  if (typeof onSwitchToLogin === "function") onSwitchToLogin();
                }, 300);
              }}
              className="border border-gray-500 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Login instead
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUpPage;
