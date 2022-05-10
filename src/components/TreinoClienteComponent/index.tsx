import React, { useState, useCallback, useEffect, useMemo} from 'react';
import { TreinoCliente } from '@static/types';
import { Divider, ListItem, ListItemButton, ListItemText, Collapse, List } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AndamentoExercicioComponent } from '@components/AndamentoExercicioComponent';

interface TreinoClienteComponentProps {
  treinoCliente: TreinoCliente
}

export const TreinoClienteComponent: React.FC<TreinoClienteComponentProps> = ({ treinoCliente }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toogleOption = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  return(
    <>
      <Divider />
      <ListItem sx={{ flexDirection: 'column' }}>
        <ListItemButton
          key={treinoCliente.id.toString()}
          onClick={toogleOption}
          sx={{ width: '100%' }}
        >
          <ListItemText primary={treinoCliente.nome} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {treinoCliente.andamento_exercicios?.map(andamentoExercicio => (
            <AndamentoExercicioComponent andamentoExercicio={andamentoExercicio} />
          ))}
        </List>
      </Collapse>
    </>
  )
}