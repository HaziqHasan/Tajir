import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import API_BASE_URL from '../Api/Api'

// Custom payload interface to include 'role'
interface CustomJwtPayload {
  role: 'admin' | 'vendor' | 'customer';
  [key: string]: any;
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/token/`, {
        email,
        password,
      });
      console.log(response.data,'haziq')

      const { access, refresh } = response.data;


      // Save token
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Decode token with correct type
      const decoded = jwtDecode<CustomJwtPayload>(access);
      const role = decoded.role;

      // Redirect based on role
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'vendor') navigate('/vendor/home');
      else if (role === 'customer') navigate('/shop');
      else navigate('/unauthorized');

    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="bg-black text-white w-full py-2 rounded-xl hover:opacity-90 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Don't have an account? <a href="/signin" className="text-blue-500">Sign Up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
