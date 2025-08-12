export interface Estado {
  id: number;
  nombre: string;
}

export interface DocumentoItem {
  tipo: number | null;
  archivo: File | null;
}

export interface CandidatoPayload {
  rut: string;
  nombre_completo: string;
  telefono: string;
  correo: string;
  titulo_profesional_id: number | null;
  nacionalidad_id: number | null;
  estado_civil_id: number | null;
  direccion: string;
  region_id: number | null;
  comuna_id: number | null;
  estado_candidato_id: number;
}

export interface Candidato extends CandidatoPayload {
  cargos: number[];
  documentos: DocumentoItem[];
}

export type CatalogosResponse = [
  { data: Estado[] },
  { data: Estado[] },
  { data: Estado[] },
  { data: Estado[] },
  { data: Estado[] },
  { data: Estado[] }
];
