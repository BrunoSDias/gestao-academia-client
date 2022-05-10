export interface Cliente {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
}

export interface AndamentoExercicio {
  descricao: string;
  id: number;
  nome: string;
  ordem: number;
  status: 'em_andamento' | 'realizado' | 'nao_realizado';
}

export interface TreinoCliente {
  id: number;
  treino_id: number;
  cliente_id: string;
  nome: string;
  andamento_exercicios: AndamentoExercicio[];
}
