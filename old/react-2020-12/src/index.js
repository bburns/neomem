import React from 'react'
import ReactDOM from 'react-dom'
import App from 'view/App'
import { NeomemProvider, client } from 'services/neomem'

ReactDOM.render(
  <React.StrictMode>
    <NeomemProvider client={client}>
      <App />
    </NeomemProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
