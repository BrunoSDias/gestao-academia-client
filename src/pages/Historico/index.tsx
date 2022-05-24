import React, { useState, useCallback, useEffect, } from 'react';

import { Paper, TextField, MenuItem, Stack, Box, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import api from '@services/api';

import { TabelaHistorico } from '@components/TabelaHistorico';

import { useAuth } from '@contexts/AuthContext';

import { Treino, Exercicio, AndamentoExercicio } from '@static/types';

const statuses = [
  ['nao_realizado', 'Não Realizado'],
  ['em_andamento', 'Em Andamento'],
  ['realizado', 'Realizado']
]

const diasSemana = [
  ['domingo', 'Domingo'],
  ['segunda', 'Segunda'],
  ['terca', 'Terça'],
  ['quarta', 'Quarta'],
  ['quinta', 'Quinta'],
  ['sexta', 'Sexta'],
  ['sabado', 'Sabádo'],
]

export const Historico: React.FC = () => {
  const [treinos, setTreinos] = useState<Treino[]>();
  const [exercicios, setExercicios] = useState<Exercicio[]>();
  const [andamentoExercicios, setAndamentoExercicios] = useState<AndamentoExercicio[]>([]);

  const [treinoId, setTreinoId] = useState<number>();
  const [exercicioId, setExercicioId] = useState<number>();
  const [status, setStatus] = useState<string>('');
  const [diaSemana, setDiaSemana] = useState<string>('');
  const [dataDe, setDataDe] = useState<Date | null>(null);
  const [dataAte, setDataAte] = useState<Date | null>(null);

  const [rowsCount, setRowsCount] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const { cliente } = useAuth();

  const loadHistorico = useCallback(() => {
    if (!cliente) return;

    api.get(`/cliente/show_historico`, {
      params: {
        id: cliente.id
      }
    })
    .then(res => {
      if (res.headers['x-total-count']) {
        setRowsCount(Number(res.headers['x-total-count']))
      }
      setTreinos(res.data.treinos);
      setExercicios(res.data.exercicios);
      setAndamentoExercicios(res.data.andamento_exercicios);
    })
  }, [cliente])

  useEffect(() => {
    loadHistorico();
  }, [loadHistorico]);

  const filtrarHistorico = useCallback((currentPage: number, currentRowsPerPage: number) => {
    if (!cliente) return;

    api.get(`/cliente/historicos/filter`, {
      params: {
        id: cliente.id,
        treino_id: treinoId,
        exercicio_id: exercicioId,
        status,
        page: currentPage + 1,
        per_page: currentRowsPerPage,
        dia_semana: diaSemana,
        data_de: dataDe,
        data_ate: dataAte
      }
    })
    .then(res => {
      if (res.headers['x-total-count']) {
        setRowsCount(Number(res.headers['x-total-count']))
      }
      setAndamentoExercicios(res.data);
    })
  }, [cliente, treinoId, exercicioId, status, diaSemana, dataDe, dataAte])


  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => {
    setPage(currentPage)
    filtrarHistorico(currentPage, rowsPerPage);
  }, [filtrarHistorico, rowsPerPage]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value))
    filtrarHistorico(page, Number(event.target.value));
  }, [filtrarHistorico, page]);

  return(
    <Container sx={{ marginBottom: 4 }}>
      <Box display="flex" justifyContent="center" sx={{  width: '100%', }}>
        <Paper sx={{ maxWidth: 450, width: '100%', padding: 2, marginTop: 4 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ flexDirection: 'column'}}
          >
            <Typography variant="h5"> Histórico </Typography>
            <TextField
              id="treino_id"
              select
              fullWidth
              margin="normal"
              label="Selecione o treino"
              value={treinoId}
              onChange={(e) => setTreinoId(Number(e.target.value))}
            >
              {treinos?.map((treinoOption) => (
                <MenuItem key={treinoOption.id.toString()} value={treinoOption.id}>
                  {treinoOption.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="exercicio_id"
              select
              fullWidth
              margin="normal"
              label="Selecione o exercicio"
              value={exercicioId}
              onChange={(e) => setExercicioId(Number(e.target.value))}
            >
              {exercicios?.map((exercicioOption) => (
                <MenuItem key={exercicioOption.id.toString()} value={exercicioOption.id}>
                  {exercicioOption.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="status"
              select
              fullWidth
              margin="normal"
              label="Selecione o status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((statusOption) => (
                <MenuItem key={statusOption[0]} value={statusOption[0]}>
                  {statusOption[1]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="dia_semana"
              select
              fullWidth
              margin="normal"
              label="Selecione o dia da semana"
              value={diaSemana}
              onChange={(e) => setDiaSemana(e.target.value)}
            >
              {diasSemana.map((diasSemanaOption) => (
                <MenuItem key={diasSemanaOption[0]} value={diasSemanaOption[0]}>
                  {diasSemanaOption[1]}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <MobileDatePicker
                  label="De"
                  inputFormat="dd/MM/yyyy"
                  value={dataDe}
                  onChange={(newValue) => setDataDe(newValue!)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  label="Até"
                  inputFormat="dd/MM/yyyy"
                  value={dataAte}
                  onChange={(newValue) => setDataAte(newValue!)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ marginTop: 2, fontSize: 18 }}
              onClick={() => filtrarHistorico(page, rowsPerPage)}
            >
              Buscar
            </Button>
          </Box>
        </Paper>
      </Box>

      <TabelaHistorico
        andamentoExercicios={andamentoExercicios}
        rowsCount={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  )
}