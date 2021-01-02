import React from 'react'
// import Editor from 'rich-markdown-editor'
import _ from 'lodash'
import './styles.css'


export default function DocumentView({ rows, groupBy }) {
  
  const [groups, setGroups] = React.useState({})
  
  React.useEffect(() => {
    const groups = _.groupBy(rows, row => row[groupBy])
    setGroups(groups)
    console.log(groups)
  }, [rows, groupBy])

  return (
    <div className="document-view">
      {Object.keys(groups).map(group => {
        return (
          <div className="document-group" key={group || "(None)"}>
            {groupBy && <div className="document-group-header">{group || "(None)"}</div>}
            {groups[group].map(row => {
              return (
                <div className="document-section" key={row.id}>
                  <div className="document-header">{row.type}: {row.name}</div>
                  {/* <Editor defaultValue={row.description} /> */}
                  <textarea className="document-notes" defaultValue={row.notes} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
