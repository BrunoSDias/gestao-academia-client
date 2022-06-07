import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Cliente } from '@static/types';

import api from '@services/api';

import { useSnackbar } from './SnackbarContext';

interface AuthContextData {
  signin: (email: string, senha: string) => void;
  update: (email?: string, senha?: string, nome?: string, whatsapp?: string) => void;
  signout: () => void;
  cliente?: Cliente;
}

interface ContextProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);
const AuthProvider = ({ children }: ContextProps) => {
  const { addSnack } = useSnackbar();
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
      addSnack(`Bem vindo ${res.data.nome}`, "success")
    })
    .catch(() => addSnack("Usuário ou senha não encontrada"))
  }, []);

  const update = useCallback((email?: string, senha?: string, nome?: string, whatsapp?: string) => {
    if (!cliente) return;

    api.patch(`/cliente/clientes/${cliente.decoded_id}`, {
      email: email || cliente.email,
      senha: senha,
      nome: nome || cliente.nome,
      whatsapp: whatsapp || cliente.whatsapp
    })
    .then(() => addSnack(`Dados atualizados com sucesso!`, "success", "bottom"))
    .catch(() => addSnack("Houve um erro ao tentar atualizar os seus dados", "error", "bottom"))
  }, [cliente])

  const signout = useCallback(() => {
    localStorage.removeItem("@GestaoAcademia/IdCliente");
    navigate('/login')
    addSnack(`Deslogado com sucesso!`, "success")
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        signin,
        cliente,
        update,
        signout
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