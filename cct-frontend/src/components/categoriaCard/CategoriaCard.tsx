import styles from "./CategoriaCard.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  nombre: string;
  imagen: string;
};

function CategoriaCard({ nombre, imagen }: Props) {

  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/cursos?categoria=${nombre}`)}
    >
      <img src={imagen} alt={nombre} className={styles.image} />
      <p className={styles.title}>{nombre}</p>
    </div>
  );
}

export default CategoriaCard;