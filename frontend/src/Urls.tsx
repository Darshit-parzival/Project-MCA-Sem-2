import { Routes, Route } from "react-router-dom";
import Index from "./pages/public/Index";
import Admin from "./pages/admin/Index"
import Calender from "./pages/public/Calender";
import About from "./pages/public/About";
import Comedians from "./pages/public/Comedians";
import Location from "./pages/public/Location";
import JndMoreInfo from "./pages/includes/components/JndMoreInfo";
import RktMoreInfo from "./pages/includes/components/RktMoreInfo";
import AdiMoreInfo from "./pages/includes/components/AdiMoreInfo";
import Contact from "./pages/public/Contact";
import Faq from "./pages/public/Faq";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Home from "./pages/admin/Home";
import Logout from "./pages/includes/components/Logout";
import Profile from "./pages/public/Profile";
import Shows from "./pages/admin/Shows";
import AddAdmin from "./pages/admin/AddAdmin";

function Urls() {
  let name = "";
  let admin= "";
  const storedName = sessionStorage.getItem("name");
  const storedAdmin = sessionStorage.getItem('admin')
  storedName !== null ? (name = storedName) : false;
  storedAdmin !== null ? (admin = storedAdmin) : false;

  return (
    <>
      <Routes>
        {admin || <Route path="/admin" element={<Admin />} />}
        {admin && <Route path="/admin/home" element={<Home />} />}
        {admin && <Route path="/admin/shows" element={<Shows />} />}

        {name || <Route path="/signup" element={<Signup />} />}
        {name || <Route path="/login" element={<Login />} />}
        {name && <Route path="/logout" element={<Logout />} />}
        {name && <Route path="/profile" element={<Profile />} />}


        <Route path="/faq" element={<Faq />} />
        <Route path="/location/ahmedabad" element={<AdiMoreInfo />} />
        <Route path="/location/rajkot" element={<RktMoreInfo />} />
        <Route path="/location/junagadh" element={<JndMoreInfo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/location" element={<Location />} />
        <Route path="/comedians" element={<Comedians />} />
        <Route path="/about" element={<About />} />
        <Route path="/calender" element={<Calender />} />

        <Route path="/" element={<Index />} />
      </Routes>
    </>
  );
}

export default Urls;
