// import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

//. this was for the federated endpoint -
// will want a new client for each graphql endpoint

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

export const NeomemProvider = ApolloProvider
