import React, { useState, useCallback, useEffect, } from 'react';
import { AndamentoExercicio } from '@static/types';
import styled from '@emotion/styled';
import { TableCellProps, TableCell, TableRow } from '@mui/material';

interface TabelaHistoricoLinhProps {
  andamentoExercicio: AndamentoExercicio;
}

const statuses = {
  nao_realizado: 'Não Realizado',
  realizado: 'Realizado',
  em_andamento: 'Em Andamento'
}

interface StyledTableCellProps extends TableCellProps {
  status?: string;
}

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'status',
})<StyledTableCellProps>(({ status, theme }) => ({
  border: '1px solid',
  ...(status === 'nao_realizado' ? {
        borderColor: 'red'
      } : status === 'realizado' ? {
        borderColor: 'green'
      } : {
        borderColor: 'orange'
      }
    ),
}));

export const TabelaHistoricoLinha: React.FC<TabelaHistoricoLinhProps> = ({ andamentoExercicio }) => {
  return(
    <TableRow hover>
      <StyledTableCell status={andamentoExercicio.status}>{statuses[andamentoExercicio.status]}</StyledTableCell>
      <StyledTableCell status={andamentoExercicio.status}>{andamentoExercicio.nome_treino}</StyledTableCell>
      <StyledTableCell status={andamentoExercicio.status}>{andamentoExercicio.nome_exercicio}</StyledTableCell>
      <StyledTableCell status={andamentoExercicio.status}>{andamentoExercicio.created_at}</StyledTableCell>
    </TableRow>
  )
}