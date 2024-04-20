import { Routes, Route } from 'react-router-dom'
import Index from './pages/public/Index'
import Calender from './pages/public/Calender'
import About from './pages/public/About'
import Comedians from './pages/public/Comedians'
import Location from './pages/public/Location'
import JndMoreInfo from './pages/includes/components/JndMoreInfo'
import RktMoreInfo from './pages/includes/components/RktMoreInfo'
import AdiMoreInfo from './pages/includes/components/AdiMoreInfo'
import Contact from './pages/public/Contact'
import Faq from './pages/public/Faq'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'

function Urls() {

  return (
    <>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/faq' element={<Faq />} />
      <Route path='/location/ahmedabad' element={<AdiMoreInfo />} />
      <Route path='/location/rajkot' element={<RktMoreInfo />} />
      <Route path='/location/junagadh' element={<JndMoreInfo />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/location' element={<Location />} />
      <Route path='/comedians' element={<Comedians />} />
      <Route path='/about' element={<About />} />
      <Route path='/calender' element={<Calender />} />
      <Route path='/' element={<Index />} />
    </Routes>
    </>
  )
}

export default Urls