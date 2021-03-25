import { GiMaterialsScience } from 'react-icons/gi'
import './App.css'
import { Navs, RouteList } from './config'
import { Title, Footer } from './components'

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
