import React from 'react'
import { ReactTabulator } from 'react-tabulator'
import 'react-tabulator/css/tabulator.css'
import './styles.css'


export default function({ item, datasource }) {

  const columns = [
    {
      field: 'name',
      title: "Property",
      width: 150,
    },
    {
      field: 'value',
      title: "Value",
      editor: 'input', 
    },
  ]

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    if (item) {
      const rows = Object.keys(item).map(key => ({ name: key, value: item[key]}))
      setRows(rows)
    }
  }, [item])


  async function cellEdited(cell) {

    console.log(cell)

    // const table = tableRef.current.table
    // const col = cell.getColumn()
    // const field = col.getField() // eg 'timeframe'
    // const colDef = col.getDefinition()
    const row = cell.getRow()
    console.log(row)
    const data = row.getData()
    console.log(data)
    // let id = data.id
    const value = cell.getValue() // eg 'week'
    const oldvalue = cell.getOldValue() // eg 'month'

    //. will be row's editor
    // const editor = colDef.editor // eg 'input', 'select'
    const editor = 'input'

    const id = item.id
    const field = data.name

    const session = datasource.getSession()
    
    if (editor==='input') {
      // if (id===-1) {
      //   // const facetObj = facetObjs[facet]
      //   const queryTemplate = facetObj.addQuery
      //   const params = facetObj.params || {}
      //   console.log(queryTemplate)
      //   const query = substituteQueryParams(queryTemplate, params)
      //   console.log('run', query, params)
      //   const result = await session.run(query, params)
      //   console.log(result)
      //   const record = result.records[0]
      //   console.log(record)
      //   const row = record.get('n')
      //   console.log('row', row)
      //   table.updateData([{ id:-1,  [field]: undefined }])
      //   table.deleteRow(0) //?
      //   table.addRow(row)
      //   table.addRow(emptyRow)
      //   id = row.id
      // }
      const query = `
      MATCH (n) 
      WHERE id(n)=$id 
      SET n.${field}=$value
      `
      const params = { id, value }
      console.log(query, params)
      const result = await session.run(query, params)
      console.log(result)
      // const row = { id, [field]: value }
      // table.updateData([row])
    }

    // else if (editor==='select' && field==='timeframe') {

    //   const params = { id, value, oldvalue }

    //   // drop any existing relation
    //   if (oldvalue) {
    //     const query = `
    //     MATCH (t)-[r:TIMEFRAME]->(u:Timeframe {name: $oldvalue})
    //     WHERE id(t)=$id 
    //     DELETE r
    //     `
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }

    //   // add new relation
    //   if (value) {
    //     const query = `
    //     MATCH (t), (u:Timeframe {name: $value}) 
    //     WHERE id(t)=$id 
    //     CREATE (t)-[:TIMEFRAME]->(u)
    //     `
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }
    // }

    // else if (editor==='select' && field==='type') {

    //   const params = { id, value, oldvalue }

    //   // drop existing label
    //   if (oldvalue) {
    //     let query = `
    //     MATCH (t)
    //     WHERE id(t)=$id 
    //     REMOVE t:#oldvalue#
    //     `
    //     query = substituteQueryParams(query, params)
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }

    //   // add new label
    //   if (value) {
    //     let query = `
    //     MATCH (t)
    //     WHERE id(t)=$id 
    //     SET t:#value#
    //     `
    //     query = substituteQueryParams(query, params)
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }

    // } else if (editor==='select' && field==='project') {

    //   // eg oldvalue='', value='neomem'
    //   //. multiselect? single select for now?
    //   const params = { id, value, oldvalue, RELNTYPE: 'TIP' }

    //   // drop any existing project
    //   if (oldvalue) {
    //     let query = `
    //     MATCH (n)<-[r]-(m:Project {name:#oldvalue#})
    //     WHERE id(n)=$id 
    //     DELETE r
    //     `
    //     query = substituteQueryParams(query, params)
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }

    //   // add link to new project
    //   if (value) {
    //     let query = `
    //     MATCH (n), (m:Project {name:"#value#"})
    //     WHERE id(n)=$id
    //     CREATE (n)<-[r:#RELNTYPE#]-(m)
    //     `
    //     query = substituteQueryParams(query, params)
    //     console.log(query)
    //     const result = await session.run(query, params)
    //     console.log(result)
    //   }

    session.close()
  }

  return (
    <div className='property-view'>
      <ReactTabulator
        // ref={tableRef}
        data={rows}
        columns={columns}
        // options={{groupBy, dataTree:true, dataSorting, dataSorted, rowFormatter }}
        tooltips={false}
        layout={"fitData"}
        cellEdited={cellEdited}
      />
    </div>
  )
}
