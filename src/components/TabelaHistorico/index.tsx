import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableCellProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useCallback, useEffect, } from 'react';
import { TabelaHistoricoLinha } from '@components/TabelaHistoricoLinha';
import { AndamentoExercicio } from '@static/types';

interface TabelaHistoricoProps {
  andamentoExercicios: AndamentoExercicio[];
  rowsCount: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  color: '#fff',
  fontSize: 18,
  fontWeight: 600,
  backgroundColor: theme.palette.secondary.main,
  borderRight: '1px solid #fff'
}));

export const TabelaHistorico: React.FC<TabelaHistoricoProps> = ({
  andamentoExercicios,
  rowsCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  return(
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 4 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Treino</StyledTableCell>
              <StyledTableCell>Exercicio</StyledTableCell>
              <StyledTableCell>Data</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {andamentoExercicios?.map(andamentoExercicio => (
              <TabelaHistoricoLinha andamentoExercicio={andamentoExercicio} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}