import { useState } from 'react'

import Items from './components/Items'
import AppContext from './context/AppContext'

function App() {

  return (
    <AppContext>
     <Items/>
    </AppContext>
  )
}

export default App
