import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurso, incrementarVistas } from "../../service/api";
import type { Curso } from "../../types/Course";
import styles from "./Course.module.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

// Helper para extraer la URL de la imagen de forma segura (Strapi v4 y v5)
const getImageUrl = (imagen: any) => {
  if (!imagen) return "/placeholder.jpg";

  // Formato simplificado (Strapi v5)
  if (typeof imagen.url === "string") {
    return `${API_BASE_URL}${imagen.url}`;
  }

  // Formato con datos anidados (Strapi v4)
  if (imagen.data?.attributes?.url) {
    return `${API_BASE_URL}${imagen.data.attributes.url}`;
  }

  return "/placeholder.jpg";
};

function CursoDetalle() {
  const { id } = useParams<{ id: string }>();

  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchCursoData = async () => {
      try {
        setLoading(true);
        const data = await getCurso(id);

        if (isMounted) {
          setCurso(data);
          setLoading(false);
        }

        // Incrementar vistas en segundo plano
        if (data?.documentId) {
          const actualizado = await incrementarVistas(data.documentId);
          if (isMounted && actualizado) {
            // Preservamos la imagen original si 'actualizado' no la trae en su respuesta
            setCurso((prevCurso) => ({
              ...actualizado,
              imagen: actualizado.imagen ?? prevCurso?.imagen,
            }));
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("No se pudo cargar la información del curso.");
          setLoading(false);
        }
      }
    };

    fetchCursoData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleScrollToRegister = () => {
    const section = document.getElementById("inscripcion-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("¡Gracias por tu interés! El formulario de inscripción se abrirá pronto.");
    }
  };

  if (loading) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando información del curso...</p>
      </div>
    );
  }

  if (error || !curso) {
    return (
      <div className={styles.stateContainer}>
        <h2>¡Opps! Algo salió mal</h2>
        <p>{error || "Curso no encontrado."}</p>
      </div>
    );
  }

  // Usamos la función auxiliar para obtener la URL correcta
  const imageUrl = getImageUrl(curso.imagen);

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt={curso.title}
            className={styles.heroImage}
          />
          <span className={styles.badgeFree}>100% Gratuito</span>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.category}>
            {curso.category?.name ?? "Capacitación"}
          </span>

          <h1>{curso.title}</h1>

          <div className={styles.views}>
            <span role="img" aria-label="vistas">👁️</span> {curso.views ?? 0} personas consultaron este curso
          </div>

          <button onClick={handleScrollToRegister} className={styles.inscribirse}>
            Inscribirme Gratis
          </button>
        </div>
      </section>

      {/* TARJETAS DE INFORMACIÓN CLAVE */}
      <section className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.icon}>🕒</div>
          <div>
            <h3>Duración</h3>
            <p>{curso.duration || "Por confirmar"}</p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.icon}>📅</div>
          <div>
            <h3>Horario</h3>
            <p>{curso.schedule || "Por confirmar"}</p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.icon}>📍</div>
          <div>
            <h3>Modalidad y Sede</h3>
            <p>Presencial - Aula Central</p>
          </div>
        </div>
      </section>

      {/* DESCRIPCIÓN */}
<section className={styles.section}>
  <h2>¿De qué trata este curso?</h2>
  <div className={styles.description}>
    {typeof curso.description === "string"
      ? curso.description
      : Array.isArray(curso.description)
      ? curso.description[0]?.children?.[0]?.text
      : "Este curso brinda una formación completa y práctica."}
  </div>
</section>

      {/* TEMARIO */}
      {curso.syllabus && curso.syllabus.length > 0 && (
        <section className={styles.section}>
          <h2>¿Qué vas a aprender?</h2>
          <ul className={styles.syllabus}>
            {curso.syllabus[0]?.children?.map((item: any, index: number) => (
              <li key={index}>
                <span className={styles.checkIcon}>✓</span>
                <span>{item.children?.[0]?.text || "Módulo de aprendizaje"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CALL TO ACTION */}
      <section id="inscripcion-section" className={styles.cta}>
        <h2>¿Listo para comenzar?</h2>
        <p>Asegurá tu lugar. Formate gratuitamente y obtené tu certificado de asistencia.</p>
        <button className={styles.continueApplication} onClick={handleScrollToRegister}>
  <div>
    <div className={styles.folder}>
      <div className={styles.top}>
        <svg viewBox="0 0 24 27">
          <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L16.4142136,16.5857864 C16.0391408,16.9608592 15.530433,17.1715729 15,17.1715729 L1,17.1715729 C0.44771525,17.1715729 6.76353751e-17,16.7238576 0,16.1715729 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" />
        </svg>
      </div>
      <div className={styles.paper}></div>
    </div>
    <div className={styles.pencil}></div>
  </div>
  Inscribirme ahora
</button>
      </section>
    </div>
  );
}

export default CursoDetalle;