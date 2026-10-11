import { useEffect, useState } from "react";
import { getCursos } from "../../service/api";
import type { Curso } from "../../types/Course";
import styles from "./Inscripciones.module.css";

function Inscripcion() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [enviado, setEnviado] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    curso: "",
  });

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const data = await getCursos();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    cargarCursos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Datos de inscripción:", formulario);

    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className={styles.inscripcion}>
        <section className={styles.exito}>
          <h1>¡Inscripción enviada! ✓</h1>

          <p>
            Recibimos tus datos correctamente.
          </p>

          <p>
            Pronto nos pondremos en contacto con vos para darte
            más información.
          </p>

          <button
            className={styles.button}
            onClick={() => setEnviado(false)}
          >
            Realizar otra inscripción
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.inscripcion}>
      <section className={styles.header}>
        <h1>Inscribite a un curso</h1>

        <p>
          Completá el formulario para comenzar tu inscripción.
        </p>
      </section>

      <section className={styles.formSection}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Datos personales</h2>

          <div className={styles.row}>
            <div className={styles.campo}>
              <label htmlFor="nombre">
                Nombre
              </label>

              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="apellido">
                Apellido
              </label>

              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formulario.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.campo}>
              <label htmlFor="dni">
                DNI
              </label>

              <input
                type="text"
                id="dni"
                name="dni"
                value={formulario.dni}
                onChange={handleChange}
                placeholder="Tu DNI"
                required
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefono">
                Teléfono
              </label>

              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={handleChange}
                placeholder="Tu teléfono"
                required
              />
            </div>
          </div>

          <div className={styles.campo}>
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <h2>Elegí tu curso</h2>

          <div className={styles.campo}>
            <label htmlFor="curso">
              Curso
            </label>

            <select
              id="curso"
              name="curso"
              value={formulario.curso}
              onChange={handleChange}
              required
            >
              <option value="">
                Seleccioná un curso
              </option>

              {cursos.map((curso) => (
                <option
                  key={curso.id}
                  value={curso.documentId}
                >
                  {curso.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={styles.button}
          >
            Inscribirme
          </button>
        </form>
      </section>
    </div>
  );
}

export default Inscripcion;