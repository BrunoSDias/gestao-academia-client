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

export const Perfil: React.FC = () => {
  const { update, cliente } = useAuth();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [whatsapp, setWhatsapp] = useState<string>();

  const [mostraSenha, setMostraSenha] = useState<boolean>(false);

  useEffect(() => {
    if (!cliente) return;

    setEmail(cliente.email);
    setNome(cliente.nome);
    setWhatsapp(cliente.whatsapp);

  }, [cliente])

  const handleSubmit = useCallback(() => {
    if (!email && !senha && !nome && !whatsapp) return;
    
    update(email, senha, nome, whatsapp)
  }, [email, senha, nome, whatsapp])

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
          Perfil
         </Typography>
         <TextField 
          fullWidth
          focused={!!nome}
          value={nome}
          margin="normal"
          onChange={(e) => setNome(e.target.value)}
          label="Nome"
         />
         <TextField 
          fullWidth
          focused={!!whatsapp}
          value={whatsapp}
          margin="normal"
          onChange={(e) => setWhatsapp(e.target.value)}
          label="Whatsapp"
         />
         <TextField 
          fullWidth
          focused={!!email}
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
            Salvar
         </Button>
       </Paper>
     </Box>
   </Container>
 )
}