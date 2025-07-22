import React from 'react';
import { Navigate } from 'react-router-dom';
import  { jwtDecode,JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  role: 'admin' | 'vendor' | 'customer';
}

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);

    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
