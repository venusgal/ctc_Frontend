import { useState } from "react";
import styles from "./Contacto.module.css";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEnviado(true);
  };

  return (
    <div className={styles.contacto}>
      <section className={styles.header}>
        <h1>Contactanos</h1>
        <p>
          ¿Tenés alguna consulta? Estamos para ayudarte.
        </p>
      </section>

      <section className={styles.contenido}>
        <div className={styles.info}>
          <h2>Estamos para ayudarte</h2>

          <p>
            Si tenés alguna duda sobre nuestros cursos, las inscripciones
            o cualquier otra consulta, podés comunicarte con nosotros.
          </p>

          <div className={styles.dato}>
            <strong>Dirección</strong>
            <span>Colón 1890, San José, Guaymallén</span>
          </div>

          <div className={styles.dato}>
            <strong>Teléfono</strong>
            <span>4-454078</span>
          </div>

          <div className={styles.dato}>
            <strong>Email</strong>
            <span>dge6202@mendoza.edu.ar</span>
          </div>

          <div className={styles.dato}>
            <strong>🕐 Horarios de atención</strong>
            <span>Lunes a viernes</span>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2>Enviános un mensaje</h2>

          {enviado ? (
            <div className={styles.exito}>
              <h3>¡Mensaje enviado! ✓</h3>
              <p>
                Gracias por contactarnos. Te responderemos a la brevedad.
              </p>

              <button
                onClick={() => setEnviado(false)}
                className={styles.button}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.campo}>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Tu teléfono"
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="asunto">Asunto</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  placeholder="Escribí tu mensaje..."
                  required
                />
              </div>

              <button type="submit" className={styles.button}>
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contacto;