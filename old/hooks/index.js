// import { useQuery, gql } from '@apollo/client'

// const NODES = gql`
//   query GetNodes {
//     nodes {
//       name
//       description
//     }
//   }
// `
// const FILES = gql`
//   query GetFiles {
//     files {
//       name
//       size
//     }
//   }
// `

export function useNeomemQuery() {
  // const { loading, error, data } = useQuery(NODES)

  const loading = false
  const error = null
  const data = {
    nodes: [{ name: 'plecy', description: 'plecostomus' }],
  }
  const response = { loading, error, data }
  return response
}
