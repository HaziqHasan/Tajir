// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import API_BASE_URL from "../Api/Api";
// import SignUpPage from "./SignUpPage";

// interface CustomJwtPayload {
//   role: "admin" | "vendor" | "customer";
//   [key: string]: any;
// }

// interface LoginPageProps {
//   onClose: () => void;
// }

// const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [showSignup, setShowSignup] = useState(false);
//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}api/token/`, {
//         email,
//         password,
//       });

//       const { access, refresh } = response.data;
//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);

//       const decoded = jwtDecode<CustomJwtPayload>(access);
//       const role = decoded.role;

//       onClose(); // Close modal

//       if (role === "admin") navigate("/admin");
//       else if (role === "vendor") navigate("/vendor");
//       else navigate("/");
//     } catch (err: any) {
//       console.error("Login failed:", err.response?.data || err.message);
//       alert("Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 z-50 bg-opacity-10 flex items-center justify-center"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
//       >
//         <div className="relative w-full max-w-sm mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl px-6 py-8 border border-gray-200">
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
//           >
//             ×
//           </button>
//           <h2 className="text-2xl text-center font-normal mb-6">Login</h2>
//           <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username or Email Address *"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
//             />
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 Remember me
//               </label>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Forgot your password?
//               </a>
//             </div>
//           </form>
//           <div className="mt-6 flex justify-center gap-4">
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//             <button
//               onClick={() => {
//                 setTimeout(() => setShowSignup(true), 300); // Delay for closing animation (if needed)
//                 navigate("/signup");
//               }}
//               className="border border-gray-500 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 transition"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//       {showSignup && <SignUpPage onClose={() => setShowSignup(false)} />}
//     </>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../Api/Api";
import SignUpPage from "./SignUpPage";

interface CustomJwtPayload {
  role: "admin" | "vendor" | "customer";
  [key: string]: any;
}

interface LoginPageProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}api/token/`, {
        email,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      const decoded = jwtDecode<CustomJwtPayload>(access);
      const role = decoded.role;

      onClose();

      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="relative w-full max-w-sm mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl px-6 py-8 border border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
          >
            ×
          </button>
          <h2 className="text-2xl text-center font-normal mb-6">Login</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  onSwitchToSignup();
                }, 300);
              }}
              className="border border-gray-500 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
