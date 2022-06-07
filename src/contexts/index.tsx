import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { SnackbarProvider } from './SnackbarContext';

interface ContextProps {
  children: ReactNode;
}

export const Contexts = ({ children }: ContextProps): JSX.Element => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SnackbarProvider>
  )
}