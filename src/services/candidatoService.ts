import api from "../services/apiService";
import type { CatalogosResponse, CandidatoPayload } from "../types";

export const fetchCatalogos = (): Promise<CatalogosResponse> =>
  Promise.all([
    api.get("/regiones"),
    api.get("/nacionalidades"),
    api.get("/estado_civiles"),
    api.get("/titulos_profesionales"),
    api.get("/cargos"),
    api.get("/documentos"),
  ]) as Promise<CatalogosResponse>;

export const createCandidato = (payload: CandidatoPayload) =>
  api.post("/candidatos", payload);

export const assignCargos = (id: number, cargos: number[]) =>
  api.post(`/candidatos/${id}/cargos`, { cargos });

export const uploadDocumento = (id: number, formData: FormData) =>
  api.post(`/candidatos/${id}/documento`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const fetchComunas = (regionId: number) =>
  api.get(`/comunas?region_id=${regionId}`);
