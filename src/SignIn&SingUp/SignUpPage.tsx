// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import API_BASE_URL from '../Api/Api';

// interface CustomJwtPayload {
//   role: 'admin' | 'vendor' | 'customer';
//   [key: string]: any;
// }

// export default function SignUpPage() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const navigate = useNavigate();

//   const handleSignUp = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (password !== confirmPassword) {
//     alert('Passwords do not match ❌');
//     return;
//   }

//   try {
//     const response = await axios.post(`${API_BASE_URL}api/register/`, {
//       first_name: firstName,
//       last_name: lastName,
//       email,
//       phone_no: phone,
//       password,
//       role: 2, // Default role
//     });

//     // Show success message and redirect to login
//     alert('Account created successfully ✅ Please log in.');
//     navigate('/login');

//   } catch (error) {
//     console.error(error);
//     alert('Sign up failed ❌');
//   }
// };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           alt="Your Company"
//           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
//           Create your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form onSubmit={handleSignUp} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-900">First Name</label>
//             <input
//               type="text"
//               required
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">Last Name</label>
//             <input
//               type="text"
//               required
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">Email Address</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">Phone Number</label>
//             <input
//               type="tel"
//               required
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
//             <input
//               type="password"
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
//             Login to your account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";

interface CustomJwtPayload {
  role: "admin" | "vendor" | "customer";
  [key: string]: any;
}

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_no: phone,
        password,
        role: 2,
      });

      // Auto-login after registration
      const loginRes = await axios.post(`${API_BASE_URL}api/token/`, {
        email,
        password,
      });

      localStorage.setItem("accessToken", loginRes.data.access);
      localStorage.setItem("refreshToken", loginRes.data.refresh);

      navigate("/");
    } catch (error) {
      console.error("Signup Error →", error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data, null, 2));
      console.error(error);
      alert("Sign up failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-6">
          <img
            src="https://www.tailwindtap.com/assets/elegant-logo-1.svg"
            alt="Brand Logo"
            className="mx-auto h-12"
          />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800">
            Create Your Tajir Account
          </h2>
          <p className="text-gray-500">Join the shopping experience</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>

          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          <input
            type="tel"
            required
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />

          <input
            type="password"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-lg font-semibold shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login to your account
          </a>
        </p>
      </div>
    </div>
  );
}
