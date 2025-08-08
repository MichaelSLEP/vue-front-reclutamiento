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
      <UsuarioPanel :nombre="usuario.nombre" :onCerrarSesion="cerrarSesion" />
    </header>

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
                Gracias por tu interés en formar parte de nuestra red educativa.
                Completa los siguientes datos para ingresar al sistema de
                reclutamiento y mantener tu perfil disponible para futuras
                oportunidades laborales.
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
                placeholder="correo@ejemplo.cl"
                class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-1">
              <label
                for="fono"
                class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                >Teléfono de contacto</label
              >
              <InputText
                id="fono"
                type="number"
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
                v-model="form.region"
                :options="regiones"
                size="small"
                optionLabel="nombre"
                placeholder="Región"
                class="w-full h-9"
                @change="handleRegionChange"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-1">
              <label
                for="comuna"
                class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                >Comuna</label
              >
              <Select
                v-model="form.comuna"
                :options="comunasFiltradas"
                size="small"
                optionLabel="nombre"
                placeholder="Comuna"
                :disabled="!form.region"
                class="w-full text-sm h-9"
              />
            </div>
          </div>

          <!-- Título y Estado Civil -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-1 flex flex-col gap-1">
              <label
                for="tprofesional"
                class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                >Título Profesional</label
              >
              <Select
                v-model="form.titulo_profesional"
                :options="titulosProfesionales"
                size="small"
                optionLabel="nombre"
                placeholder="Título Profesional"
                class="w-full text-sm h-9"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-1">
              <label
                for="estado_civil"
                class="text-surface-900 dark:text-surface-0 text-sm font-medium"
                >Estado Civil</label
              >
              <Select
                v-model="form.estado_civil"
                :options="estadosCivil"
                optionLabel="nombre"
                size="small"
                placeholder="Estado Civil"
                class="w-full text-sm h-9"
              />
            </div>
          </div>

          <!-- Presentación y Cargos -->
          <div class="flex flex-col gap-1">
            <label
              for="ppersonal"
              class="text-surface-900 dark:text-surface-0 text-sm font-medium"
              >Presentación Personal</label
            >
            <Textarea
              v-model="form.presentacion_personal"
              autoResize
              rows="4"
              placeholder="Cuéntanos brevemente sobre ti"
              class="w-full text-sm placeholder:text-xs px-2 py-1.5 rounded-md shadow-sm"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label
              for="tprofesional"
              class="text-surface-900 dark:text-surface-0 text-sm font-medium"
              >Cargos a los que Postula (1 a 3)</label
            >
            <MultiSelect
              v-model="form.cargos"
              :options="availablePositions"
              optionLabel="name"
              display="chip"
              :maxSelectedLabels="3"
              :selectionLimit="3"
              class="w-full text-sm h-9"
            />
          </div>
        </div>

        <!-- Botón final -->
        <Button
          label="Guardar Datos"
          icon="pi pi-user-plus"
          size="small"
          class="w-full mt-6"
          aria-label="Actualizar Datos"
          @click="subirDocumentos"
        />
      </div>

      <!-- 🟥 Panel lateral de archivos subidos -->
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
            <div class="flex flex-col">
              <span v-if="doc.archivo?.guardado" class="text-xs text-gray-600">
                <p class="text-cyan-600">Cargado:</p>
                {{ doc.archivo.nombre }}
              </span>
              <span v-else-if="doc.archivo" class="text-xs text-gray-600">
                <p class="text-yellow-500">Pendiente:</p>
                {{ doc.archivo.nombre }}
              </span>
              <span v-else class="text-xs text-gray-500"> Sin subir </span>
              <span class="text-gray-800 truncate">{{ doc.nombre }}</span>
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

              <template v-else>
                <label
                  class="text-xs px-2 py-[2px] border border-cyan-600 text-cyan-700 rounded cursor-pointer hover:bg-cyan-50 transition"
                  title="Subir archivo"
                >
                  Subir
                  <input
                    type="file"
                    class="hidden"
                    @change="
                      (event) => subirArchivo(doc.id, event.target.files[0])
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

    <!-- Toast para notificaciones -->
    <Toast class="chinchorro-toast" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { useToast } from "primevue/usetoast";
import UsuarioPanel from "../components/UsuarioPanel.vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const toast = useToast();
const router = useRouter();

// 🌍 Regiones y comunas
const regiones = [
  { id: 1, nombre: "Arica y Parinacota" },
  { id: 2, nombre: "Tarapacá" },
];

const comunas = [
  { id: 1, nombre: "Arica", regionId: 1 },
  { id: 2, nombre: "Putre", regionId: 1 },
  { id: 3, nombre: "Iquique", regionId: 2 },
];

const comunasFiltradas = computed(() =>
  form.value.region
    ? comunas.filter((c) => c.regionId === form.value.region?.id)
    : []
);

function handleRegionChange() {
  form.value.comuna = null;
}

// 🎓 Títulos profesionales
const titulosProfesionales = [
  { nombre: "Ingeniero Civil" },
  { nombre: "Psicólogo" },
  { nombre: "Arquitecto" },
  { nombre: "Administrador Público" },
  { nombre: "Contador Auditor" },
];

// 👰 Estado Civil
const estadosCivil = [
  { nombre: "Soltero" },
  { nombre: "Casado" },
  { nombre: "Divorciado" },
  { nombre: "Viudo" },
];

// 🧰 Cargos disponibles
const availablePositions = [
  { name: "Jefe de Proyecto" },
  { name: "Analista Funcional" },
  { name: "Desarrollador Frontend" },
];
// 📝 Formulario reactivo
const form = ref({
  comuna: null,
  region: null,
  titulo_profesional: null,
  estado_civil: null,
  rut: "",
  presentacion_personal: "",
  cargos: [],
  documentos: ref([]),
});

// 📄 Documentos esperado
const documentosEsperados = ref([
  { id: 1, nombre: "Contrato firmado", archivo: null },
  {
    id: 2,
    nombre: "Certificado médico",
    archivo: { id: 22, nombre: "certificado.pdf", guardado: true },
  },
  { id: 4, nombre: "Antecedentes penales", archivo: null },
  { id: 5, nombre: "Certificado de título", archivo: null },
  { id: 6, nombre: "Certificado de nacimiento", archivo: null },
  { id: 7, nombre: "Certificado de residencia", archivo: null },
  { id: 8, nombre: "Currículum Vitae", archivo: null },
  { id: 9, nombre: "Carta de presentación", archivo: null },
  { id: 11, nombre: "Referencias laborales", archivo: null },
  { id: 12, nombre: "Otros documentos", archivo: null },
]);

function subirArchivo(id, archivo) {
  const doc = documentosEsperados.value.find((d) => d.id === id);
  if (doc) {
    doc.archivo = { nombre: archivo.name, guardado: false };
  }
}

function confirmarEliminacion(id) {
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

function eliminarArchivo(id) {
  const doc = documentosEsperados.value.find((d) => d.id === id);
  if (doc) {
    doc.archivo = null;
  }
}

function descargar(archivo) {
  window.open(`/api/files/${archivo.id}`, "_blank");
}

// 🚀 Simular subida
const subirDocumentos = () => {
  Swal.fire(
    "Documentos subidos",
    "Tus archivos han sido registrados",
    "success"
  );
};
console.log("auth del Create", auth);

onMounted(() => {
  // Simular carga de datos del usuario
  /*   form.value.rut = "17557157-K";
  form.value.region = regiones[0];
  form.value.comuna = comunasFiltradas.value[0];
  form.value.titulo_profesional = titulosProfesionales[0];
  form.value.estado_civil = estadosCivil[0];
  form.value.presentacion_personal = "Hola, soy un candidato entusiasta.";
  form.value.cargos = [availablePositions[0]]; */
  console.log("auth del mount", auth);

  if (auth.nombre) {
    usuario.value = {
      nombre: auth.nombre,
      rut: auth.rut || "",
      email: auth.email || "",
    };
  }
});

const usuario = ref({
  nombre: "Usuario Error",
  rut: "",
  email: "",
});

function cerrarSesion() {
  // Aquí va tu lógica real de logout
  Swal.fire({
    title: "¿Cerrar Session?",
    text: "Esta seguro que desea cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, Salir",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      auth.logout();
      Swal.fire("See You!", "Nos vemos pronto.", "success");
      router.replace("/");
    }
  });
  console.log("Sesión cerrada");
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
  font-size: 0.775rem !important; /* Tamaño de fuente más pequeño */
}
</style>
