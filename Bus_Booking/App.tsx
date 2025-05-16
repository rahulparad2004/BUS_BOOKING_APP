import React from 'react'
import { StatusBar } from 'react-native'
import Navigation from './src/navigation/Navigation'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/service/queryClient'


// Modify the backend to support username/password authentication if it doesn't already. The API should accept a username and password, validate them, and return an access token and refresh token.


const App = () => {

  return (
    
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>


  )
}


export default App;
