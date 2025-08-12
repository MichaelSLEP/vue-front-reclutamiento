// Opcional: si prefieres separar la lógica de UI específica del store
import { useCandidatoStore } from "../store/candidatoStore";
import { onMounted, watch } from "vue";

export function useCandidato() {
  const store = useCandidatoStore();
  onMounted(store.loadCatalogos);
  watch(
    () => store.candidato.region_id,
    (val) => {
      if (val) store.loadComunas(val);
    }
  );
  return store;
}
