const get = () => 1
const set = () => 2
const update = () => 3
const del = () => 4

export const connect = data => {
  return {
    get,
    set,
    update,
    del,
  }
}
