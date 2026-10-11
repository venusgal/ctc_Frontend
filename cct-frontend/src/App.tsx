import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Cursos from "./pages/cursos/Courses";
import CursoDetalle from "./pages/curso/Course";
import SobreNosotros from "./pages/sobreNosotros/SobreNosotros";
import Inscripcion from "./pages/inscripciones/Inscripciones";
import Contacto from "./pages/contacto/Contacto";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>

  <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cursos" element={<Cursos />} />
    <Route path="/curso/:id" element={<CursoDetalle />} />
    <Route path="/sobre-nosotros" element={<SobreNosotros />} />
    <Route path="/inscripcion" element={<Inscripcion />} />
    <Route path="/contacto" element={<Contacto />} />
  </Routes>

  <Footer />

</BrowserRouter>
  );
}

export default App;