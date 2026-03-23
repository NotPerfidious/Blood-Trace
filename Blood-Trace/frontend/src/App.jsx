import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './assets/Pages/Layout'
import Landing from './assets/Pages/Landing'
import Dashboard from './assets/Pages/Dashboard'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
