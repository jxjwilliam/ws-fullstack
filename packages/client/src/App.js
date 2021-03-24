import { GiMaterialsScience } from 'react-icons/gi'
import './App.css'
import Home from './01-home/service'
import { Footer } from './components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GiMaterialsScience className="App-logo" />
      </header>
      <Home />
      <Footer />
    </div>
  )
}

export default App
