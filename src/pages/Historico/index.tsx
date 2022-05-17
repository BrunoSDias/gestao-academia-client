import React, { useState, useCallback, useEffect, } from 'react';

import { Paper, TextField, MenuItem, Stack, Box, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import api from '@services/api';

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
  const [andamentoExercicios, setAndamentoExercicios] = useState<AndamentoExercicio[]>();

  const [treinoId, setTreinoId] = useState<number>();
  const [exercicioId, setExercicioId] = useState<number>();
  const [status, setStatus] = useState<string>('');
  const [diaSemana, setDiaSemana] = useState<string>('');
  const [dataDe, setDataDe] = useState<Date>();
  const [dataAte, setDataAte] = useState<Date>();

  const { cliente } = useAuth();

  const loadHistorico = useCallback(() => {
    if (!cliente) return;

    api.get(`/cliente/show_historico`, {
      params: {
        id: cliente.id
      }
    })
    .then(res => {
      setTreinos(res.data.treinos);
      setExercicios(res.data.exercicios);
      setAndamentoExercicios(res.data.andamento_exercicios);
    })
  }, [cliente])

  useEffect(() => {
    loadHistorico();
  }, [loadHistorico]);

  const filtrarHistorico = useCallback(() => {
    if (!cliente) return;

    api.get(`/cliente/historicos/filter`, {
      params: {
        id: cliente.id,
        treino_id: treinoId,
        exercicio_id: exercicioId,
        status,
        dia_semana: diaSemana,
        data_de: dataDe,
        data_ate: dataAte
      }
    })
    .then(res => {
      setAndamentoExercicios(res.data);
    })
  }, [cliente, treinoId, exercicioId, status, diaSemana, dataDe, dataAte])

  return(
    <Container>
      <Box display="flex" justifyContent="center" sx={{  width: '100%', }}>
        <Paper sx={{ maxWidth: 450, width: '100%', padding: 2, marginTop: 4 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ flexDirection: 'column', paddingTop: 4 }}
          >
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
              onClick={filtrarHistorico}
            >
              Buscar
            </Button>
          </Box>
        </Paper>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Treino</TableCell>
                <TableCell>Exercicio</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {andamentoExercicios?.map(andamentoExercicio => (
                <TableRow hover>
                  <TableCell>{andamentoExercicio.nome_treino}</TableCell>
                  <TableCell>{andamentoExercicio.nome_exercicio}</TableCell>
                  <TableCell>{andamentoExercicio.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}