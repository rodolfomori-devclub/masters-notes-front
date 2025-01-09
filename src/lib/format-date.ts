export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
}
