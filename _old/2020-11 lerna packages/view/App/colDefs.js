


//. move these into tableview - pass in callbacks as needed
const headerContextMenu = [
  {
    label: "Insert Column",
    action: function(e, column) {
      console.log(e, column)
      // alert('kjnkjn')
      //. bring up dialog with list of columns to choose from, 
      // with button for New Column...
    }
  },
  {
    label: "Hide Column",
    action: function(e, column) {
      column.hide()
    }
  },
]


function objectFormatter(cell, formatterParams, onRendered) {
  // cell - the cell component
  // formatterParams - parameters set for the column
  // onRendered - function to call when the formatter has been rendered
  // return "Mr" + cell.getValue()
  const value = cell.getValue()
  // console.log(cell.getColumn().getField())
  // console.log(cell,value, typeof(value))
  if (typeof(value)==='object') {
    // return value ? value.name : ''
    return value.name
  }
  return value
}


const headerSort = false // we handle it in app, not in tableview


// default props to override
const colDef = {
  width: 100, 
  headerSort, 
  headerContextMenu,
  editable: false, // turn off left click to edit cell - use dblclick
  // double click cell to edit
  cellDblClick: (e, cell) => { 
    const col = cell.getColumn()
    const colDef = col.getDefinition()
    if (colDef.editor) {
      cell.edit(true)
    } else {
      alert("Cell is not editable")
    }
  },
}


//. put this all into db as Propdef items? _Property items?
// SystemProperty items? then have other System__ items?
const colDefs = {

  id: { 
    ...colDef,
    // visible: false,
  },

  name: { 
    ...colDef,
    width: 250, 
    editor: 'input', 
    // formatter: objectFormatter, //?
  },

  notes: { 
    ...colDef,
    width: 250, 
    editor: 'input', 
  },
  
  //. this will need to have the available projects loaded when user clicks on it -
  // or cache them and dirty the cache when project is added or removed or renamed etc
  //. singleselect? multiselect?
  project: { 
    ...colDef,
    width: 100, 
    editor: "select", 
    editorParams: { 
      values: ",personal,neomem,tallieo,facemate,lockheed,ccs,pyvoyager".split(',').sort(),
    },
  },

  //. get the list from the db on click, excluding system types if needed
  //. multiselect? single?
  type: { 
    ...colDef,
    width: 100, 
    editor: "select", 
    editorParams: { 
      values: ",Author,Tip,Folder,Component,Book,Person,Task,Project,Timeframe,Risk,Note,Datasource,View,Idea,Show,Movie".split(',').sort(), 
    },
  },
  
  //. singleselect - get values from db - how?
  timeframe: { 
    ...colDef,
    width: 100, 
    editor: "select", 
    editorParams: {
      values: ",now,today,tonight,weekend,week,month,quarter,year,decade,life,nevermind,done".split(','),
    },
    formatter: objectFormatter,
  },
  
  //. singleselect
  client: { 
    ...colDef,
    width: 100, 
    editor: "select", 
    editorParams: { values: ",me,MRIIOT".split(',').sort() },
  },
  
  //.
  author: { 
    ...colDef,
    width: 100, 
    editor: "select", 
    editorParams: {
      values: ",tolkien,pkdick,tanithlee".split(','),
    }, 
    multiselect: true, 
  },

  related: { ...colDef, width: 100 },
  rels: { ...colDef, width: 200 },
  depth: { ...colDef, width: 100 },
  parentId: { ...colDef, width: 100 },
  order: { ...colDef, width: 100, editor: "input" },
  place: { ...colDef, width: 100 },
  relntype: { ...colDef, width: 100 },
  hasChildren: { ...colDef, width: 100 },
  link: { ...colDef, width: 100, editor: "input" },
  created: { ...colDef, width: 150 },
  modified: { ...colDef, width: 150 },

}

Object.keys(colDefs).forEach(key => {
  colDefs[key].field = key
  colDefs[key].title = key 
})

export default colDefs


// avail table column types - cool - eg progress, star, tickCross
// const columns = [
//   { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
//   { title: "Favourite Color", field: "col" },
//   { title: "Date Of Birth", field: "dob", hozAlign: "center" },
//   { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
//   { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
// ]
// var data = [
//   {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
//   {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
//   {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
//   {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
//   {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
// ]
