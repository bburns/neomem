export const look = tokens => context => 'i see a cardinal'

export const go = tokens => context => {
  const noun = tokens[1]
  context.location = noun
  return 'Went to ' + noun
}

export const unknown = tokens => context => 'huh?'
