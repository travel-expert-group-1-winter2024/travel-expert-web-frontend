export const getFormattedCurrency = (input: number): string => {
  return input.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  })
}
