import { useNavigate } from "react-router-dom";
import type { Curso } from "../../types/Course";
import styles from "./CursoCard.module.css";

type Props = {
  curso: Curso;
};

function CursoCard({ curso }: Props) {
  const navigate = useNavigate();

  const imageUrl = curso.imagen
    ? `http://localhost:1337${curso.imagen.url}`
    : "/placeholder.jpg";

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/curso/${curso.documentId}`)}
    >
      <img
        className={styles.image}
        src={imageUrl}
        alt={curso.title}
      />

      <div className={styles.contenido}>
        <h3 className={styles.title}>{curso.title}</h3>

        <p className={styles.duration}>{curso.duration}</p>

        <button className={styles.button}>
          Ver curso
        </button>
      </div>
    </div>
  );
}

export default CursoCard;