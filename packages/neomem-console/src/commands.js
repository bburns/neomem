const lookFactory = tokens => context => 'i see a cardinal'
const goFactory = tokens => context => {
  const noun = tokens[1]
  context.location = noun
  return 'Went to ' + noun
}
const unknownFactory = tokens => context => 'huh?'

export const commands = {
  look: lookFactory,
  go: goFactory,
  unknown: unknownFactory,
}
