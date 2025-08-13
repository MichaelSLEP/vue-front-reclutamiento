import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import * as service from "../services/candidatoService";
import api from "../services/apiService";
import type { Estado, Candidato } from "../types";

export const useCandidatoStore = defineStore("candidato", () => {
  // 🔄 Estado reactivo
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 📦 Catálogos institucionales
  const estados = reactive<Record<string, Estado[]>>({
    regiones: [],
    comunas: [],
    nacionalidades: [],
    estadosCiviles: [],
    titulos: [],
    cargos: [],
    documentos: [],
  });

  // 👤 Datos del candidato
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

  // 📄 Documento temporal (para subida individual)
  const documentoCandidato = reactive({
    documento_id: null as number | null,
    candidato_id: null as number | null,
    archivo: null as File | null,
  });

  // 🔧 Helpers
  function setLoading(val: boolean) {
    loading.value = val;
  }

  function setError(msg: string | null) {
    error.value = msg;
  }

  // 📥 Cargar todos los catálogos
  async function loadCatalogos() {
    setLoading(true);
    setError(null);
    try {
      const [reg, nac, est, tit, carg, docs] = await service.fetchCatalogos();
      estados.regiones = reg.data ?? [];
      estados.nacionalidades = nac.data ?? [];
      estados.estadosCiviles = est.data ?? [];
      estados.titulos = tit.data ?? [];
      estados.cargos = carg.data ?? [];
      estados.documentos = docs.data ?? [];
      console.log("📦 Catálogos cargados:", estados);
    } catch (e: any) {
      setError(e.message || "Error al cargar catálogos");
      console.error("❌ loadCatalogos:", e);
    } finally {
      setLoading(false);
    }
  }

  // 📍 Cargar comunas por región
  async function loadComunas(regionId: number) {
    setError(null);
    try {
      const { data } = await api.get<Estado[]>(
        `/comunas?region_id=${regionId}`
      );
      estados.comunas = data ?? [];
    } catch (e: any) {
      setError(e.message || "Error al cargar comunas");
      console.error("❌ loadComunas:", e);
    }
  }

  // 📝 Actualizar datos del candidato
  async function updateCandidato(candidato_id: number, datos: any) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await service.updateCandidato(candidato_id, datos);
      return data;
    } catch (e: any) {
      setError(e.message || "Error al actualizar candidato");
      console.error("❌ updateCandidato:", e);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    // Estado
    loading,
    error,
    estados,
    candidato,
    documentoCandidato,

    // Métodos
    setLoading,
    setError,
    loadCatalogos,
    loadComunas,
    updateCandidato,
  };
});
