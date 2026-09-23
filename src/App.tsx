import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import BuilderPage from './pages/BuilderPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/builder' element={<BuilderPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
