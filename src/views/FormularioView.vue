<template>
  <div class="dark:bg-surface-950 px-4 py-16 md:px-10 lg:px-16">
    <header class="flex justify-between items-center px-4 py-2">
      <!-- Logo o título -->
      <img
        src="../assets/Logotipo-Chinchorro-web-01.png"
        alt="Logotipo Chinchorro"
        class="h-auto w-60 mb-6"
      />

      <!-- Aquí va el panel de usuario -->
      <UsuarioPanel
        :nombre="authStore.candidato.nombre_completo"
        :onCerrarSesion="cerrarSesion"
      />
    </header>
    <div v-if="store">
      <BlockUI :blocked="loading">
        <div class="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto">
          <!-- 🟦 Formulario principal -->
          <div
            class="bg-surface-0 dark:bg-surface-900 p-6 md:p-8 shadow-sm rounded-xl w-full md:w-2/3 flex flex-col"
          >
            <!-- Encabezado -->
            <div class="flex flex-col items-center gap-2 mb-8">
              <img
                src=""
                alt="Logo Contrataciones Slep Chinchorro"
                srcset="../assets/favicon-fb.ico"
                class="w-15 mb-3 self-center"
              />
              <div class="flex flex-col items-center gap-1 w-full">
                <div
                  class="text-surface-900 dark:text-surface-0 text-lg font-semibold leading-tight text-center w-full"
                >
                  Inicia tu proceso de incorporación al SLEP Chinchorro
                </div>
                <div class="text-center w-full">
                  <span
                    class="text-surface-700 dark:text-surface-200 text-sm leading-normal"
                  >
                    Gracias por tu interés en formar parte de nuestra red
                    educativa. Completa los siguientes datos para ingresar al
                    sistema de reclutamiento y mantener tu perfil disponible
                    para futuras oportunidades laborales.
                  </span>
                </div>
              </div>
            </div>

            <!-- Campos del formulario -->
            <div class="flex flex-col gap-4 w-full mb-4">
              <!-- Rut y Nombre -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="rut"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Rut</label
                  >
                  <InputText
                    id="rut"
                    type="text"
                    placeholder="15678432-1"
                    v-model="form.rut"
                    class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
                  />
                </div>
                <div class="col-span-2 flex flex-col gap-1">
                  <label
                    for="name"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Nombre completo</label
                  >
                  <InputText
                    id="name"
                    type="text"
                    v-model="form.nombre_completo"
                    placeholder="Juan Carlos Pérez González"
                    class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <!-- Email y Teléfono -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="col-span-2 flex flex-col gap-1">
                  <label
                    for="email2"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Correo electrónico</label
                  >
                  <InputText
                    id="email2"
                    type="email"
                    v-model="form.correo"
                    placeholder="correo@ejemplo.cl"
                    class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="telefono"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Teléfono de contacto</label
                  >
                  <InputText
                    id="telefono"
                    type="text"
                    v-model="form.telefono"
                    placeholder="56 9 95891234"
                    class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <!-- Dirección, Región, Comuna -->
              <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div class="col-span-3 flex flex-col gap-1">
                  <label
                    for="direccion"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Dirección Particular</label
                  >
                  <InputText
                    id="direccion"
                    type="text"
                    v-model="form.direccion"
                    placeholder="Avda. Siempre Viva 123"
                    class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="region"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Región</label
                  >
                  <Select
                    v-model="form.region_id"
                    :options="store.estados.regiones"
                    optionLabel="nombre"
                    optionValue="id"
                    size="small"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    placeholder="Región"
                    class="w-full h-9"
                    @change="onRegionChange"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="comuna"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Comuna</label
                  >
                  <Select
                    v-model="form.comuna_id"
                    :options="store.estados.comunas"
                    optionLabel="nombre"
                    optionValue="id"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    size="small"
                    placeholder="Comuna"
                    :disabled="!form.region_id"
                    class="w-full text-sm h-9"
                  />
                </div>
              </div>

              <!-- Título y Estado Civil -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="Nacionalidad"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Nacionalidad</label
                  >
                  <Select
                    v-model="form.nacionalidad_id"
                    :options="store.estados.nacionalidades"
                    optionLabel="nombre"
                    optionValue="id"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    size="small"
                    placeholder="Nacionalidad"
                    class="w-full h-9"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="estado_civil"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Estado Civil</label
                  >
                  <Select
                    v-model="form.estado_civil_id"
                    id="estado_civil"
                    :options="estadosCivil"
                    optionLabel="nombre"
                    optionValue="id"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    size="small"
                    placeholder="Estado Civil"
                    class="w-full h-9"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="Nacionalidad"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                  >
                    fecha de nacimiento
                  </label>
                  <DatePicker
                    v-model="form.fecha_nacimiento"
                    showIcon
                    size="small"
                    iconDisplay="input"
                    dateFormat="dd/mm/yy"
                    class="w-full h-9 text-sm"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    :inputStyle="{ fontSize: '0.875rem' }"
                  />
                </div>
              </div>

              <!-- Presentación  -->
              <div class="flex flex-col gap-1">
                <label
                  for="ppersonal"
                  class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                  >Presentación Personal</label
                >
                <Textarea
                  v-model="form.presentacion"
                  autoResize
                  rows="4"
                  placeholder="Cuéntanos brevemente sobre ti"
                  class="w-full text-sm placeholder:text-xs px-2 py-1.5 rounded-md shadow-sm"
                />
              </div>

              <!-- Cargos a los que postula -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="col-span-2 flex flex-col gap-1">
                  <div class="flex flex-col gap-1">
                    <label
                      for="cargos"
                      class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                      >Cargos a los que Postula (1 a 3)</label
                    >
                    <MultiSelect
                      v-model="form.cargos"
                      :options="store.estados.cargos"
                      optionLabel="nombre"
                      optionValue="id"
                      display="chip"
                      size="small"
                      filter
                      placeholder="Seleccionar Cargos a Postular"
                      :max-selected-labels="3"
                      :selectionLimit="3"
                      :panelStyle="{ fontSize: '0.875rem' }"
                      class="w-full"
                    />
                  </div>
                </div>

                <div class="col-span-1 flex flex-col gap-1">
                  <label
                    for="tprofesional"
                    class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                    >Título Profesional</label
                  >
                  <Select
                    v-model="form.titulo_profesional_id"
                    :options="store.estados.titulos"
                    optionLabel="nombre"
                    optionValue="id"
                    size="small"
                    :panelStyle="{ fontSize: '0.875rem' }"
                    placeholder="Título Profesional"
                    class="w-full text-sm h-9"
                  ></Select>
                </div>
              </div>
            </div>

            <!-- Botón final -->
            <Button
              label="Guardar Datos"
              icon="pi pi-user-plus"
              size="small"
              class="w-full mt-6"
              aria-label="Actualizar Datos"
              @click="actualizarDatos"
            ></Button>
          </div>

          <!-- Panel lateral de archivos subidos -->
          <div
            class="bg-surface-0 dark:bg-surface-900 p-6 shadow-sm rounded-xl w-full md:w-1/3 flex flex-col gap-4"
          >
            <!-- Título del panel -->
            <div class="text-sm font-semibold text-cyan-700 mb-2">
              Documentos requeridos
            </div>

            <!-- Lista de documentos -->
            <div
              class="grid grid-cols-1 divide-y divide-gray-200 bg-white rounded border border-gray-200 overflow-hidden"
            >
              <div
                v-for="doc in documentosEsperados"
                :key="doc.id"
                class="grid grid-cols-[auto_1fr_auto] items-center px-3 py-2 text-sm gap-3"
              >
                <!-- Ícono de estado -->
                <div>
                  <i
                    :class="[
                      'pi text-base',
                      doc.archivo?.guardado
                        ? 'pi-check text-cyan-600'
                        : doc.archivo
                        ? 'pi-exclamation-triangle text-yellow-500'
                        : 'pi-exclamation-triangle text-gray-400',
                    ]"
                  ></i>
                </div>

                <!-- Nombre + estado -->
                <div class="flex flex-col min-w-0">
                  <span
                    v-if="doc.archivo?.guardado"
                    class="text-xs text-gray-600 truncate"
                  >
                    <p class="text-cyan-600">Cargado:</p>
                    {{ doc.archivo.nombre }}
                  </span>
                  <span
                    v-else-if="doc.archivo"
                    class="text-xs text-gray-600 truncate"
                  >
                    <p class="text-yellow-500">Pendiente:</p>
                    {{ doc.archivo.nombre }}
                  </span>
                  <span v-else class="text-xs text-gray-500"> Sin subir </span>
                  <span
                    class="text-gray-800 truncate max-w-[calc(100%-10px)] text-sm"
                    :title="doc.nombre"
                    >{{ doc.nombre }}</span
                  >
                </div>

                <!-- Acciones -->
                <div class="flex items-center gap-2 justify-end">
                  <template v-if="doc.archivo?.guardado">
                    <button
                      class="text-xs px-2 py-[2px] border border-cyan-600 text-cyan-700 rounded hover:bg-cyan-50 transition"
                      @click="descargar(doc.archivo)"
                    >
                      Descargar
                    </button>
                  </template>

                  <template v-if="!doc.archivo">
                    <label
                      class="text-xs px-2 py-[2px] border border-cyan-600 text-cyan-700 rounded cursor-pointer hover:bg-cyan-50 transition"
                      title="Subir archivo"
                    >
                      Subir
                      <input
                        type="file"
                        class="hidden"
                        @change="
                          (event) => {
                            const target = event.target as HTMLInputElement;
                            if (target && target.files) {
                              subirArchivo(doc.id, target.files[0]);
                            }
                          }
                        "
                      />
                    </label>
                  </template>

                  <template v-if="doc.archivo">
                    <button
                      class="text-xs px-2 py-[2px] border border-red-500 text-red-600 rounded hover:bg-red-50 transition"
                      @click="confirmarEliminacion(doc.id)"
                    >
                      Eliminar
                    </button>
                  </template>
                </div>
              </div>
            </div>
            <Button
              label="Subir Documentos"
              icon="pi pi-upload"
              size="small"
              class="w-full mt-6"
              aria-label="Subir Documentos"
              @click="subirDocumentos"
            />
          </div>
        </div>
      </BlockUI>
    </div>
    <!-- Toast para notificaciones -->
    <Toast class="chinchorro-toast" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import Swal from "sweetalert2";
//import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import UsuarioPanel from "../components/UsuarioPanel.vue";
import { useAuthStore } from "../store/authStore";
import { useCandidatoStore } from "../store/candidatoStore";
//import { useSession } from "../composables/useSession";
import type { Candidato, Documento } from "../types";

const authStore = useAuthStore();
const store = useCandidatoStore();
/* const toast = useToast(); */
const router = useRouter();
//const { getTiempoRestante } = useSession();

//console.log("Tiempo restante de sesión:", getTiempoRestante(), "segundos");

const estadosCivil = [
  { id: 1, nombre: "Soltero" },
  { id: 2, nombre: "Casado" },
  { id: 3, nombre: "Divorciado" },
  { id: 4, nombre: "Viudo" },
];

const documentos = ref<Documento[]>([]);
const form = ref<Candidato>();
const documentosEsperados = ref<Documento[]>([]);
const loading = computed(() => store.loading ?? true);

onBeforeMount(async () => {
  form.value = await authStore.candidato;
});

onMounted(async () => {
  documentosEsperados.value = await store.estados.documentos;
  console.log("form.vale", form.value);
  console.log("store.vale", form.value);
});

function subirArchivo(id: any, archivo: File) {
  const doc: any = documentosEsperados.value.find((d: any) => d.id === id);
  if (doc) {
    doc.archivo = { id, nombre: archivo.name, guardado: false };
  }
}

function confirmarEliminacion(id: any) {
  Swal.fire({
    title: "¿Eliminar documento?",
    text: 'Esta acción revertirá el estado a "Sin subir".',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarArchivo(id);
      Swal.fire("Eliminado", "El documento ha sido eliminado.", "success");
    }
  });
}

function eliminarArchivo(id: any) {
  const doc: any = documentosEsperados.value.find((d: any) => d.id === id);
  if (doc) {
    doc.archivo = null;
  }
}

function descargar(archivo: any) {
  window.open(`/api/files/${archivo.id}`, "_blank");
}

function subirDocumentos() {
  Swal.fire(
    "Documentos subidos",
    "Tus archivos han sido registrados",
    "success"
  );
}

async function actualizarDatos() {
  console.log("id candidato", authStore.user.idCandidato);
  console.log("Datos del formulario:", form.value);
  await store.value.updateCandidato(authStore.user.idCandidato, form.value);
  Swal.fire(
    "Datos Almacenados",
    "Tu información ha sido registrada correctamente",
    "success"
  );
}

function onRegionChange() {
  console.log("entro al metodo");
  console.log("form.value.region_id", form.value.region_id);
  console.log("store.value", store);

  if (form.value.region_id && store) {
    console.log("entro al if");

    store.loadComunas(form.value.region_id);
  }
}

function cerrarSesion() {
  Swal.fire({
    title: "¿Cerrar sesión?",
    text: "¿Está seguro que desea cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      authStore.logout();
      Swal.fire("See You!", "Nos vemos pronto.", "success");
      router.push("/");
    }
  });
}
</script>

<style scoped>
.fade-height-enter-active,
.fade-height-leave-active {
  transition: all 0.5s ease;
}
.fade-height-enter-from,
.fade-height-leave-to {
  opacity: 0;
  transform: scaleY(0.98);
}

.xs {
  font-size: 0.75rem !important; /* Tamaño de fuente más pequeño */
}

.chinchorro-toast .p-toast-message {
  background-color: #2c3e50;
  color: #ecf0f1;
  border-left: 5px solid #00b894;
  font-family: "Roboto", sans-serif;
}

.chinchorro-toast .p-toast-icon-close {
  color: #ecf0f1;
}

.text-07 {
  font-size: 0.875rem !important; /* Tamaño de fuente más pequeño */
}
/* Contenedor principal: layout horizontal con chips y trigger */
::v-deep(.p-multiselect) {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 0.5rem !important;
  padding: 0.06rem 0.5rem !important;
}

/* Chips: se envuelven correctamente */
::v-deep(.p-multiselect-label) {
  flex: 1 1 auto !important;
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.25rem !important;
  align-items: center !important;
  white-space: normal !important;
}

/* Trigger (ícono): se mantiene alineado */
::v-deep(.p-multiselect-trigger) {
  flex: 0 0 auto !important;
  display: flex !important;
  align-items: center !important;
  padding: 0 !important;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
