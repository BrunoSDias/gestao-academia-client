export interface Cliente {
  id: string;
  decoded_id?: number;
  nome: string;
  email: string;
  whatsapp: string;
}

export interface Treino {
  id: number;
  nome: string;
}

export interface Exercicio {
  id: number;
  nome: string;
}

export interface AndamentoExercicio {
  descricao: string;
  id: number;
  nome: string;
  ordem: number;
  status: 'em_andamento' | 'realizado' | 'nao_realizado';
  nome_exercicio?: string;
  nome_treino?: string;
  created_at?: string;
}

export interface TreinoCliente {
  id: number;
  treino_id: number;
  cliente_id: string;
  nome: string;
  andamento_exercicios: AndamentoExercicio[];
  treinadors?: string[];
}
