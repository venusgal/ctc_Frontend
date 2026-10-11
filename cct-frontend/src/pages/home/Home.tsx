import CursoCard from "../../components/cursoCard/CursoCard";
import type { Curso } from "../../types/Course";
import { useEffect, useState } from "react";
import { getCategorias } from "../../service/api";
import { getCursos } from "../../service/api";
import type { Categoria } from "../../types/Categoria";
import CategoriaCard from "../../components/categoriaCard/CategoriaCard";
import styles from "./Home.module.css";
import BookIcon from "@mui/icons-material/Book";
import { Paid, WorkspacePremium } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [cursos, setCursos] = useState<Curso[]>([]);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
  const fetchCursos = async () => {
    const data = await getCursos();
    setCursos(data);
  };

  fetchCursos();
}, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      console.log(data);
      setCategorias(data);
    };

    fetchCategorias();
  }, []);
  return (
    <div className={styles.home}>

      {/* HERO */}
      <section className={styles.hero}>
  <div className={styles.heroContent}>
    <h1>Aprendé nuevas habilidades y desarrollate</h1>
    <p>Modalidad 100% presencial</p>
    <button
  className={styles.heroButton}
  onClick={() => navigate("/cursos")}
>
  Ver cursos
</button>
  </div>
</section>

      {/* BENEFICIOS */}
<section className={styles.benefits}>

  <div className={styles.benefitCard}>
    <BookIcon className={styles.icon} />
    <h3>Docentes capacitados</h3>
    <p>Formación con profesionales especializados.</p>
  </div>

  <div className={styles.benefitCard}>
    <Paid className={styles.icon} />
    <h3>100% gratuito</h3>
    <p>Capacitate sin costo y obtené nuevas oportunidades.</p>
  </div>

  <div className={styles.benefitCard}>
    <WorkspacePremium className={styles.icon} />
    <h3>Certificación</h3>
    <p>Recibí un certificado al finalizar tu curso.</p>
  </div>

</section>

      {/* CURSOS DESTACADOS */}
      <section className={styles.section}>
  <h2 className={styles.title}>Cursos destacados</h2>

        <div className={styles.cursosGrid}>
          {cursos.map((curso) => (
            <CursoCard key={curso.id} curso={curso}
            />
          ))}
        </div>

      </section>

      {/* CATEGORIAS */}
      <section className={styles.section}>
  <h2 className={styles.title}>
    Formate en el área que más te guste
  </h2>

  <div className={styles.categoriasGrid}>
  {categorias.map((cat: Categoria) => {
  const imageUrl = cat.imagen
    ? `http://localhost:1337${cat.imagen.url}`
    : "/placeholder.png";

  console.log("Imagen:", imageUrl);

  return (
    <CategoriaCard
    key={cat.id}
    nombre={cat.name}
    imagen={imageUrl}
    />
  );
})}
</div>
</section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Aprendé un oficio. Cambiá tu futuro.</h2>
        <p>+700 alumnos por año</p>
        <button>Inscribite ahora</button>
      </section>

      {/* MAPA */}
      <section className={styles.mapSection}>
        <h2>Ubicación</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="300"
        ></iframe>
      </section>
    </div>
  );
}

export default Home;
