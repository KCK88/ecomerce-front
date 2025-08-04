export function dateFormater(date: string): string {
  const data = new Date(date);

  const formato = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formato.format(data)
    .replace('de', ' ')
    .replace('de', '')
  }