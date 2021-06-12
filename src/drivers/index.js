import { driver as filesys } from './filesys/index.js'
import { driver as jsonTimegraph } from './json-timegraph/index.js'
import { driver as markdown } from './markdown/index.js'
import { driver as orgmode } from './orgmode/index.js'
// import { driver as gsheet } from './gsheet/index.js'
// import { driver as chrome } from './chrome/index.js'
// import {driver as postgres} from './postgres/index.js'

export const drivers = {
  filesys,
  jsonTimegraph,
  markdown,
  orgmode,
  // gsheet,
  // chrome,
  // postgres,
}
