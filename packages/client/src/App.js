import { GiMaterialsScience } from 'react-icons/gi'
import './App.css'
import { GeneralList } from './config'
import RouteList from './config/routers'
import { Footer } from './components'
import Title from './components/appBars/title'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <nav>
          <GeneralList />
        </nav>
        <div style={{ alignSelf: 'flex-end' }}>
          <GiMaterialsScience className="App-logo" />
        </div>
      </header>
      <RouteList />
      <Footer />
    </div>
  )
}

export default App
