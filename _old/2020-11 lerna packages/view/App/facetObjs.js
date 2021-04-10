// facet definitions

//. these will be replaced by being able to focus on any item in db.
// will want to store similar info with each item - sthing like
// _views: { 
//   common: { },
//   table: { cols:[], group, filter, sort },
//   document: { }, 
//   graph: { },
//   kanban: { },
// }

//. could also have Search items which would do searches, 
// like all Project items - that would take care of some of these facets. 




import * as cypher from './cypher'

const projectCols = "type,name,timeframe,notes,place"


export default {

  all: {
    cols: "type,name,project,notes,timeframe,link,created,modified",
    group: "type",
    query: cypher.facets.all.query,
    addQuery: cypher.facets.all.addQuery,
  },

  inbox: {
    cols: "type,name,notes,timeframe,place,project",
    query: cypher.facets.inbox.query,
    // addQuery: cypher.facets.inbox.addQuery,
  },

  projects: {
    cols: "type,name,notes,timeframe,client",
    group: "type",
    query: cypher.facets.projects.query,
    addQuery: cypher.facets.projects.addQuery,
  },

  personal: {
    params: { projectName: "personal" },
    cols: projectCols,
    query: cypher.facets.personal.query,
    addQuery: cypher.facets.personal.addQuery,
  },

  neomem: {
    params: { projectName: "neomem" },
    // group: "relntype",
    cols: projectCols,
    query: cypher.facets.neomem.query,
    addQuery: cypher.facets.neomem.addQuery,
  },

  tallieo: { 
    params: { projectName: 'tallieo' }, 
    cols: projectCols, 
    query: cypher.facets.tallieo.query,
    addQuery: cypher.facets.tallieo.addQuery,
  },

  timeframe: {
    cols: "timeframe,type,name,project,notes",
    group: "timeframe",
    query: cypher.facets.timeframe.query,
    addQuery: cypher.facets.timeframe.addQuery,
  },

  story: {
    // cols: "name,type,notes,order,relntype,parentId,hasChildren",
    cols: "name,notes,order",
    // group: "uhhhhh", //. how recursively group? by eg a CHILD reln?
    // cols: "id,type,name,notes,depth,order",
    params: { parentId: 48 }, // blt //.
    query: cypher.facets.story.query,
    addQuery: cypher.facets.story.addQuery,
  },

  // people: {
  //   cols: genericCols,
  //   params: { label: 'Person' },
  // },

  // books: {
  //   cols: "id,type,author,name,notes",
  // },

}

