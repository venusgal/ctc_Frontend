const API_URL = "http://localhost:1337/api";

export const getCursos = async () => {
  const response = await fetch(`${API_URL}/courses?populate=*`);

  if (!response.ok) {
    throw new Error("Error al obtener los cursos");
  }

  const data = await response.json();
  return data.data;
};

export const getCursosDestacados = async () => {
  const response = await fetch(
    `${API_URL}/courses?sort=views:desc&pagination[pageSize]=4&populate=*`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los cursos destacados");
  }

  const data = await response.json();
  return data.data;
};

export const incrementarVistas = async (documentId: string) => {
  const response = await fetch(
    `${API_URL}/courses/${documentId}/view`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar las vistas");
  }

  const data = await response.json();
  return data;
};
export const getCurso = async (documentId: string) => {
  const response = await fetch(
    `${API_URL}/courses/${documentId}?populate=*`
  );

  if (!response.ok) {
    throw new Error("Error al obtener el curso");
  }

  const data = await response.json();
  return data.data;
};

export const getCategorias = async () => {
  const response = await fetch(`${API_URL}/categories?populate=*`);

  if (!response.ok) {
    throw new Error("Error al traer categorías");
  }

  const data = await response.json();
  return data.data;
};