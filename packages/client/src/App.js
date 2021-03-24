import { Switch } from 'react-router-dom'
import { GiMaterialsScience } from 'react-icons/gi'
import './App.css'
import { Navs, RouteList } from './config'
import Home from './01-home/service'
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
      <Switch>
        <RouteList />
      </Switch>
      <Home />
      <Footer />
    </div>
  )
}

export default App
