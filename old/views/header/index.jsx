import React from 'react'
import './styles.css'

export default function HeaderView({ path }) {
  console.log(path)
  // const type = item.labels && item.labels.join(', ')
  // const props = item.properties
  return (
    <div className='header-view'>
      /{path}
      {/* {type}{type && ':'} {props && props.name} */}
    </div>
  )
}
