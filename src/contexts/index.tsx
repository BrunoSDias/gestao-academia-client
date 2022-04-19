import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

interface ContextProps {
  children: ReactNode;
}

export const Contexts = ({ children }: ContextProps): JSX.Element => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}