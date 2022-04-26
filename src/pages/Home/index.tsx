import React from 'react';
import { useAuth } from '@contexts/AuthContext';

export const Home: React.FC = () => {
  const { cliente } = useAuth();
  return (
    <>
      <h1>Bem vindo ao sistema de gestão de academias - {cliente?.nome}</h1>
    </>
  )
}