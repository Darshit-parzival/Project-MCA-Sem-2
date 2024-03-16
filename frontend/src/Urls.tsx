import { Routes, Route } from 'react-router-dom'
import Index from './pages/public/Index'

function Urls() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Index />}/>
    </Routes>
    </>
  )
}

export default Urls