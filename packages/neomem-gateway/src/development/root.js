//. should query each item for description, nitems, etc, when requested

import fs from 'fs' // node lib for filesys
import libyaml from 'js-yaml' // https://github.com/nodeca/js-yaml

// load config.yaml
const configfile = process.env.CONFIG_FILE
console.log({ configfile })
const yaml = fs.readFileSync(configfile, 'utf8')
const yamltree = libyaml.load(yaml)
// @ts-ignore
const root = yamltree.root
console.log({ root })

// fetch items - could be from db so make async.
// could be a memoized fn eg for reading giant bookmarks file.
async function get() {
  return root
}

async function post() {}
async function put() {}
async function del() {}

const Root = { get, post, put, del }

export { Root }
