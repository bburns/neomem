import React from 'react'
import './styles.css'


export default function NavigatorView({ rows, focusPath, clickItem }) {
  console.log(rows)
  return (
    <div className='navigator-view'>
      <div className="navigator-view-items">
        {rows && rows.map((row, i) => (
          <Row row={row} clickItem={clickItem} focusPath={focusPath} key={row.name+i} />
        ))}
      </div>
    </div>
  )
}

function Row({ row, focusPath, clickItem, level=0 }) {
  return (
    <div>
      <div 
        className={'navigator-view-item' + (row.path===focusPath ? ' focus' : ' nofocus')}
        onClick={clickItem}
        data-uuid={row.uuid}
        style={{marginLeft:level*5+'px'}}
      >
        {row.name}
      </div>
      {row._children && row._children.map(child => (
        <Row level={level+1} row={child} clickItem={clickItem} focusPath={focusPath} key={child.name} />
      ))}
    </div>
  )
}
