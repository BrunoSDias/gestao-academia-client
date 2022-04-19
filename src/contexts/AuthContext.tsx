import { createContext, ReactNode, useCallback, useContext } from "react";
import { useNavigate } from "react-router";

import api from '@services/api';

interface AuthContextData {
  signin: (email: string, senha: string) => void;
}

interface ContextProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);
const AuthProvider = ({ children }: ContextProps) => {
  const navigate = useNavigate();

  const signin = useCallback((email: string, senha: string) => {
    api.post('/login/clientes', {
      cliente: {
        email,
        password: senha
      }
    })
    .then((res) => {
      navigate('/');
    })
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth }