const get = () => 1
const set = () => 2
const update = () => 3
const del = () => 4

// get a connection, which has crud fns
export const connect = data => {
  return {
    get,
    set,
    update,
    del,
  }
}
