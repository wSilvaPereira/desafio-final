const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}

const percentFormat = Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
});

function formatPercent(value) {
  return percentFormat.format(value / 100);
}

export { formatNumber, formatPercent };
