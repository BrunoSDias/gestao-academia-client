import React, { useEffect, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { TreinoCliente } from '@static/types';

import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem
} from '@mui/material';

import { useNavigate } from 'react-router'

import { diaDaSemana } from '@utils/diaDaSemana'

import { TreinoClienteComponent } from '@components/TreinoClienteComponent';

import api from '@services/api';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [treinoClientes, setTreinoClientes] = useState<TreinoCliente[]>();
  const { cliente } = useAuth();
  
  useEffect(() => {
    api.get('/cliente/treino_clientes')
    .then(res => setTreinoClientes(res.data))
  }, []);

  return (
    <Box display="flex" justifyContent="center" sx={{ paddingTop: 4 }}>
      <Paper sx={{ maxWidth: 350, width: '100%' }}>
        <List>
          <ListItem sx={{ flexDirection: 'column'}}>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Hoje é</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{diaDaSemana()}</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }} color="secondary">Treino do dia</Typography>
          </ListItem>
          {treinoClientes?.map(treinoCliente => <TreinoClienteComponent treinoCliente={treinoCliente} />)}
        </List>
      </Paper>
    </Box>
  )
}