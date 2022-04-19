import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@contexts/AuthContext';

export const Login: React.FC = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [mostraSenha, setMostraSenha] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    if (!email || !senha) return;

    signin(email, senha);
  }, [email, senha])

 return(
   <Container>
     <Box mt={18} sx={{
       width: '100%',
       maxWidth: '450px',
       marginLeft: 'auto',
       marginRight: 'auto',
     }}>
       <Paper elevation={3} sx={{
         padding: 2,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center'
       }}>
         <Typography variant="h5">
          Acesse sua conta
         </Typography>
         <TextField 
          fullWidth
          value={email}
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
         />
         <TextField 
          fullWidth
          type={mostraSenha ? "text" : "password"}
          value={senha}
          margin="normal"
          onChange={(e) => setSenha(e.target.value)}
          label="Senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setMostraSenha(prevState => !prevState)}
                  edge="end"
                >
                  {mostraSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
         />
         <Button variant="outlined" color="secondary" onClick={handleSubmit}>
            Entrar
         </Button>
       </Paper>
     </Box>
   </Container>
 )
}