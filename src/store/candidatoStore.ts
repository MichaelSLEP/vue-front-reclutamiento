import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { Estado, Candidato } from "../types";
import * as service from "../services/candidatoService";
import api from "../services/apiService";

export const useCandidatoStore = defineStore("candidato", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const estados = reactive<{
    regiones: Estado[];
    comunas: Estado[];
    nacionalidades: Estado[];
    estadosCiviles: Estado[];
    titulos: Estado[];
    cargos: Estado[];
    documentos: Estado[];
  }>({
    regiones: [],
    comunas: [],
    nacionalidades: [],
    estadosCiviles: [],
    titulos: [],
    cargos: [],
    documentos: [],
  });

  const candidato = reactive<Candidato>({
    rut: "",
    nombre_completo: "",
    telefono: "",
    correo: "",
    titulo_profesional_id: null,
    nacionalidad_id: null,
    estado_civil_id: null,
    direccion: "",
    estado_candidato_id: 1,
    region_id: null,
    comuna_id: null,
    cargos: [],
    documentos: [],
  });

  function setLoading(val: boolean) {
    loading.value = val;
  }
  function setError(msg: string | null) {
    error.value = msg;
  }

  async function loadCatalogos() {
    setLoading(true);
    try {
      const [reg, nac, est, tit, carg, docs] = await service.fetchCatalogos();
      estados.regiones = reg.data;
      estados.nacionalidades = nac.data;
      estados.estadosCiviles = est.data;
      estados.titulos = tit.data;
      estados.cargos = carg.data;
      estados.documentos = docs.data;
      console.log("Catalogos cargados:", { reg, nac, est, tit, carg, docs });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false); // <- esto es CRÍTICO
    }
  }

  async function loadComunas(regionId: number) {
    try {
      const { data } = await api.get<Estado[]>(
        `/comunas?region_id=${regionId}`
      );
      estados.comunas = data;
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function saveCandidato() {
    try {
      const { data } = await service.createCandidato({
        ...candidato,
        estado_candidato_id: 1,
      });
      const id = data.id;
      if (candidato.cargos.length)
        await service.assignCargos(id, candidato.cargos);
      for (const d of candidato.documentos) {
        const fd = new FormData();
        fd.append("documento_id", String(d.tipo));
        fd.append("file", d.archivo as File);
        await service.uploadDocumento(id, fd);
      }
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  }

  return {
    loading,
    error,
    estados,
    candidato,
    setLoading,
    setError,
    loadCatalogos,
    loadComunas,
    saveCandidato,
  };
});
