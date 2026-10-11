import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import type { Curso } from "../../types/Course";
import { getCategorias, getCursos } from "../../service/api";
import type { Categoria } from "../../types/Categoria";

function Navbar() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>([]);
const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
  const cargarDatos = async () => {
    try {
      const [cursosData, categoriasData] = await Promise.all([
        getCursos(),
        getCategorias(),
      ]);

      setCursos(cursosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar datos del Navbar:", error);
    }
  };

  cargarDatos();
}, []);


const texto = busqueda.toLowerCase().trim();

const resultados = cursos.filter((curso) => {
  const coincideTitulo = curso.title
    .toLowerCase()
    .includes(texto);

  const coincideCategoria = curso.category?.name
    ?.toLowerCase()
    .includes(texto);

  return coincideTitulo || coincideCategoria;
});

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!busqueda.trim()) {
      navigate("/cursos");
      return;
    }

    navigate(`/cursos?busqueda=${encodeURIComponent(busqueda.trim())}`);

    setMostrarResultados(false);
  };

  const seleccionarCurso = (documentId: string) => {
    navigate(`/curso/${documentId}`);

    setBusqueda("");
    setMostrarResultados(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* LOGO */}
      <div className={styles.logo}>
        <Link to="/">
          Centro de Capacitación
        </Link>
      </div>

      {/* MENU */}
      <div className={styles.menu}>
        {/* CURSOS */}
        <div className={styles.dropdown}>
          <Link
            to="/cursos"
            className={styles.link}
          >
            Cursos ▾
          </Link>

          <div className={styles.dropdownContent}>
  <Link to="/cursos">
    Todos los cursos
  </Link>

  {categorias.map((categoria) => (
    <Link
      key={categoria.id}
      to={`/cursos?categoria=${encodeURIComponent(
        categoria.name
      )}`}
    >
      {categoria.name}
    </Link>
  ))}
</div>
        </div>

        {/* INSTITUCIONAL */}
        <Link
          to="/sobre-nosotros"
          className={styles.link}
        >
          Institucional
        </Link>

        {/* INSCRIPCIÓN */}
        <Link
          to="/inscripcion"
          className={styles.link}
        >
          Inscripción
        </Link>

        {/* CONTACTO */}
        <Link
          to="/contacto"
          className={styles.link}
        >
          Contacto
        </Link>

        {/* BUSCADOR */}
        <div className={styles.searchContainer}>
          <form
            className={styles.searchForm}
            onSubmit={handleSearch}
          >
            <label htmlFor="search">
              Buscar cursos
            </label>

            <input
              id="search"
              type="search"
              className={styles.input}
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setMostrarResultados(true);
              }}
              onFocus={() => setMostrarResultados(true)}
              placeholder="Buscar cursos..."
              required
            />

            <span className={styles.caret}></span>
          </form>

          {/* RESULTADOS */}
          {mostrarResultados && busqueda.trim() !== "" && (
            <div className={styles.searchResults}>
              {resultados.length > 0 ? (
                resultados.map((curso) => (
                  <button
                    key={curso.id}
                    className={styles.searchResult}
                    onClick={() =>
                      seleccionarCurso(curso.documentId)
                    }
                  >
                    {curso.title}
                  </button>
                ))
              ) : (
                <p className={styles.noResults}>
                  No encontramos cursos.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;