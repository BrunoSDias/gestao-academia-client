import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Cliente } from '@static/types';

import api from '@services/api';

interface AuthContextData {
  signin: (email: string, senha: string) => void;
  cliente?: Cliente;
}

interface ContextProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);
const AuthProvider = ({ children }: ContextProps) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente>();

  useEffect(() => {
    const iCliente = localStorage.getItem("@GestaoAcademia/IdCliente")
    if (!cliente && iCliente) {
      api.defaults.headers.common["AuthToken"] = `Bearer ${iCliente}`
      api.get(`/cliente/show_cliente.json`, {
        params: {
          id: iCliente
        }
      })
      .then(res => {
        setCliente(res.data);
        localStorage.setItem("@GestaoAcademia/IdCliente", res.data.id);
      })
    }
  }, [cliente]);

  const signin = useCallback((email: string, senha: string) => {
    api.post('/login/clientes', {
      cliente: {
        email,
        password: senha
      }
    })
    .then((res) => {
      api.defaults.headers.common["AuthToken"] = `Bearer ${res.data.id}`
      setCliente(res.data);
      localStorage.setItem("@GestaoAcademia/IdCliente", res.data.id);
      navigate('/');
    })
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        signin,
        cliente
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