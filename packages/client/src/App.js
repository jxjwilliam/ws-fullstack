import { GiMaterialsScience } from 'react-icons/gi'
import './App.css'
import { Navs, RouteList } from './config'
import { Footer } from './components'
import Title from './components/appBars/title'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <GiMaterialsScience className="App-logo" />
        <nav>
          <Navs />
        </nav>
      </header>
      <RouteList />
      <Footer />
    </div>
  )
}

export default App
