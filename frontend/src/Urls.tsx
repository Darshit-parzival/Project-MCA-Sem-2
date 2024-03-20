import { Routes, Route } from 'react-router-dom'
import Index from './pages/public/Index'
import Calender from './pages/public/Calender'

function Urls() {

  return (
    <>
    <Routes>
      <Route path='/calender' element={<Calender />} />
      <Route path='/' element={<Index />} />
    </Routes>
    </>
  )
}

export default Urls