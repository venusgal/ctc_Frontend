import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* Logo */}
        <div>
          <h3 className={styles.logo}>CCT N°3</h3>
          <p>Formando profesionales desde 1970</p>
        </div>

        {/* Navegación */}
        <div>
          <h4>Enlaces</h4>

          <ul className={styles.links}>
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              <Link to="/cursos">Cursos</Link>
            </li>

            <li>
              <Link to="/sobre-nosotros">Institucional</Link>
            </li>

            <li>
              <Link to="/inscripcion">Inscripción</Link>
            </li>

            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4>Contacto</h4>

          <p>Colón 1890, San José, Guaymallén</p>
          <p>4-454078</p>
          <p>dge6202@mendoza.edu.ar</p>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 CCT N°3 - Todos los derechos reservados
      </div>

    </footer>
  );
}

export default Footer;