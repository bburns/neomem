// tokenize an input string into tokens for parsers to consume

//. handle strings, escapes, etc
function tokenize(s) {
  return s.trim().split(' ')
}

const Tokenizer = {
  tokenize,
}

// export { Tokenizer }
export { Tokenizer }
