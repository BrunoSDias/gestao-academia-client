export function diaDaSemana() {
  const date = new Date();
  const diaSemana = date.getDay();

  const diaSemanaFormatado = date.toLocaleDateString('pt-BR', {
    month: '2-digit',
    day: '2-digit'
  })

  switch(diaSemana) {
    case 0:
      return `Domingo - ${diaSemanaFormatado}`
    case 1:
      return `Segunda - ${diaSemanaFormatado}`
    case 2:
      return `Terça - ${diaSemanaFormatado}`
    case 3:
      return `Quarta - ${diaSemanaFormatado}`
    case 4:
      return `Quinta - ${diaSemanaFormatado}`
    case 5:
      return `Sexta - ${diaSemanaFormatado}`
    case 6:
      return 'Sabádo'
  }
}