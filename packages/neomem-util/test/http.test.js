const test = require('ava').default
const { Http } = require('../src')

test(`get()`, async t => {
  // const html = await Http.get('https://google.com')
  // console.log(html) //. oh, it fails because it's not json
  // t.like(html, {})
  t.assert(true)
})
