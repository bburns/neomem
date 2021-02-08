// tokenize an input string into tokens for parsers to consume

//. handle strings, escapes, etc
module.exports = function tokenize(s) {
  return s.trim().split(' ')
}
