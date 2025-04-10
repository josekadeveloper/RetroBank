export function formatDate(date: string) {
  return new Date(date).toLocaleString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}
