export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
