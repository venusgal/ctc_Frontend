export type Curso = {
  id: number;
  documentId: string;
  title: string;
  duration: string;
  schedule: string;
  description: any;
  syllabus: any;
  views?: number;

  imagen: {
    id: number;
    url: string;
  } | null;

  category: {
    id: number;
    name: string;
  } | null;
};
