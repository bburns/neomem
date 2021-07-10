//. views should be pluggable/interchangeable
// ie given same data, render it different ways
// so in ui user can select some data slice and then view it in different ways

import { document } from './document.js'
import { properties } from './properties.js'
import { table } from './table.js'

export const views = {
  document,
  properties,
  table,
}
