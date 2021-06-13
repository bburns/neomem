//. views should be pluggable/interchangeable
// given same data, render it different ways

// import { document } from './document.js'
import { properties } from './properties.js'
import { table } from './table.js'

export const views = {
  // document,
  properties,
  table,
}
