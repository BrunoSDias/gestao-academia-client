import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouterProps {
  component: React.FC<any>
}

export const AuthRouter: React.FC<AuthRouterProps> = ({ component: Component }) => {
  const iCliente = localStorage.getItem("@GestaoAcademia/IdCliente")
 return iCliente ? (
   <Component />
 ) : (
   <Navigate to={{ pathname: '/login' }} />
 )
}