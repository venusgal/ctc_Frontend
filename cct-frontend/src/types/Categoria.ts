export type Categoria = {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  imagen: {
    id: number;
    url: string;
  } | null;
};