export function formatMoney(amount: number | undefined) {
  if (!amount) {
    return '₽0'
  }
  return `₽${amount}`
}