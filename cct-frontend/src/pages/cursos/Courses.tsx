import { useEffect, useState } from "react";
import { getCursos, getCategorias } from "../../service/api";

import type { Curso } from "../../types/Course";
import type { Categoria } from "../../types/Categoria";

import CursoCard from "../../components/cursoCard/CursoCard";

import styles from "./Courses.module.css";

function Cursos() {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");


  // Obtener cursos
  useEffect(() => {

    const fetchCursos = async () => {

      try {

        const data = await getCursos();

        setCursos(data);

      } catch (error) {

        console.error("Error al obtener cursos:", error);

      }

    };

    fetchCursos();

  }, []);


  // Obtener categorías
  useEffect(() => {

    const fetchCategorias = async () => {

      try {

        const data = await getCategorias();

        setCategorias(data);

      } catch (error) {

        console.error("Error al obtener categorías:", error);

      }

    };

    fetchCategorias();

  }, []);


  // Filtrar cursos
  const cursosFiltrados = cursos.filter((curso) => {

    const coincideBusqueda =
      curso.title
        .toLowerCase()
        .includes(busqueda.toLowerCase());


    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      curso.category?.name === categoriaSeleccionada;


    return coincideBusqueda && coincideCategoria;

  });


  return (

    <div className={styles.container}>


      {/* HERO */}

      <section className={styles.hero}>

        <h1>Nuestros cursos</h1>

        <p>
          Encontrá la capacitación ideal para desarrollar
          nuevas habilidades.
        </p>


        {/* BUSCADOR */}

        <div className={styles.searchContainer}>

          <span>🔍</span>

          <input
            type="text"
            placeholder="Buscar un curso..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

        </div>

      </section>



      {/* CATEGORÍAS */}

      <section className={styles.filters}>

        <h2>Explorá por categoría</h2>


        <div className={styles.categoryButtons}>

          <button
            className={
              categoriaSeleccionada === "Todos"
                ? styles.active
                : ""
            }
            onClick={() => setCategoriaSeleccionada("Todos")}
          >
            Todos
          </button>


          {categorias.map((categoria) => (

            <button
              key={categoria.id}
              className={
                categoriaSeleccionada === categoria.name
                  ? styles.active
                  : ""
              }
              onClick={() =>
                setCategoriaSeleccionada(categoria.name)
              }
            >
              {categoria.name}
            </button>

          ))}

        </div>

      </section>



      {/* RESULTADOS */}

      <section className={styles.coursesSection}>

        <div className={styles.resultsHeader}>

          <h2>
            Cursos disponibles
          </h2>

          <span>
            {cursosFiltrados.length} cursos
          </span>

        </div>



        {/* CARDS */}

        {cursosFiltrados.length > 0 ? (

          <div className={styles.coursesGrid}>

            {cursosFiltrados.map((curso) => (

              <CursoCard
                key={curso.id}
                curso={curso}
              />

            ))}

          </div>

        ) : (

          <div className={styles.empty}>

            <h3>No encontramos cursos</h3>

            <p>
              Probá con otro nombre o categoría.
            </p>

            <button
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("Todos");
              }}
            >
              Ver todos los cursos
            </button>

          </div>

        )}

      </section>


    </div>

  );
}

export default Cursos;