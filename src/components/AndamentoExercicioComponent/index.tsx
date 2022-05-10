import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  Button,
  Typography
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AndamentoExercicio } from '@static/types';

import api from '@services/api';

interface AndamentoExercicioComponentProps {
  andamentoExercicio: AndamentoExercicio;
}

export const AndamentoExercicioComponent: React.FC<AndamentoExercicioComponentProps> = ({ andamentoExercicio }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const [status, setStatus] = useState<'em_andamento' | 'realizado' | 'nao_realizado'>('em_andamento');

  const toogleOption = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  const toogleOptionDescription = useCallback(() => {
    setOpenDescription(prevState => !prevState)
  }, [])

  useEffect(() => {
    if (!andamentoExercicio.status) return;

    setStatus(andamentoExercicio.status);
  }, [andamentoExercicio.status])

  const statusColor = useMemo(() => {
    if (status === 'nao_realizado') {
      return 'red';
    }
    else if (status === 'realizado') {
      return 'green'
    }
    else {
      return 'orange'
    }
  }, [status])

  const updateStatus = useCallback((currentStatus: 'em_andamento' | 'realizado' | 'nao_realizado') => {
    api.patch(`cliente/andamento_exercicios/update_status`, {
      id: andamentoExercicio.id,
      status: currentStatus
    })
    .then(() => {
      setStatus(currentStatus);
    })
  }, []);
  
 return(
   <>
    <Divider />
    <ListItem 
      sx={{
        flexDirection: 'column',
        border: '1px solid',
        marginBottom: 1,
        borderColor: statusColor
      }}
    >
      <ListItemButton
        key={andamentoExercicio.id.toString()}
        onClick={toogleOption}
        sx={{ width: '100%' }}
      >
        <ListItemText primary={andamentoExercicio.nome} secondary={
          <Typography sx={{ color: statusColor }}>{status}</Typography>
        } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: 2 }} >
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="error"
        onClick={() => updateStatus('nao_realizado')}
        disabled={status === 'nao_realizado'}
      >
          Falhou
      </Button>
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="success"
        onClick={() => updateStatus('realizado')}
        disabled={status === 'realizado'}
      >
          Concluido
      </Button>
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="info"
        onClick={toogleOptionDescription}
      >
          Detalhes
      </Button>
      <Collapse in={openDescription} timeout="auto" unmountOnExit sx={{ padding: 2 }} >
        <Typography>{andamentoExercicio.descricao}</Typography>
      </Collapse>
    </Collapse>
   </>
 )
}