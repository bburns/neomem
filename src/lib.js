export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export function isObject(data) {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}
