import { Routes, Route } from 'react-router-dom'
import Index from './pages/public/Index'
import Calender from './pages/public/Calender'
import About from './pages/public/About'

function Urls() {

  return (
    <>
    <Routes>
      <Route path='/calender' element={<Calender />} />
      <Route path='/about' element={<About />} />
      <Route path='/' element={<Index />} />
    </Routes>
    </>
  )
}

export default Urls