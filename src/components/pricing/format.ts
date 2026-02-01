export function formatEur(amount: number) {
  return `EUR ${amount.toFixed(2)}`;
}

export function formatHours(amount: number) {
  const fixed = amount.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}
