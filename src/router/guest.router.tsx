import React from 'react';
import { Navigate } from 'react-router-dom';

interface GuestRouterProps {
  component: React.FC<any>
}

export const GuestRouter: React.FC<GuestRouterProps> = ({ component: Component }) => {
  const iCliente = localStorage.getItem("@GestaoAcademia/IdCliente")
 return iCliente ? (
   <Navigate to={{ pathname: '/' }} />
  ) : (
    <Component />
  )
}