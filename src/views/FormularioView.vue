<template>
  <div class="dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-30 w-auto mb-6"
    />

    <div class="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto">
      <!-- 🟦 Formulario principal -->
      <div
        class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full md:w-2/3 flex flex-col"
      >
        <!-- Encabezado -->
        <div class="flex flex-col items-center gap-4 mb-8">
          <img
            src=""
            alt="Logo Contrataciones Slep Chinchorro"
            srcset="../assets/favicon-fb.ico"
            class="w-25 mb-4 self-center"
          />
          <div class="flex flex-col items-center gap-2 w-full">
            <div
              class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
            >
              Inicia tu proceso de incorporación al SLEP Chinchorron
            </div>
            <div class="text-center w-full">
              <span
                class="text-surface-700 dark:text-surface-200 leading-normal"
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
        <div class="flex flex-col gap-6 w-full mb-8">
          <!-- Rut y Nombre -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-0">
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="rut"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Rut</label
              >
              <InputText
                id="rut"
                type="text"
                placeholder="15678432-1"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <label
                for="name"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Nombre completo</label
              >
              <InputText
                id="name"
                type="text"
                placeholder="Juan Carlos Pérez González"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
            </div>
          </div>

          <!-- Email y Teléfono -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-0">
            <div class="col-span-2 flex flex-col gap-2">
              <label
                for="email2"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Correo electrónico</label
              >
              <InputText
                id="email2"
                type="email"
                placeholder="correo@ejemplo.cl"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="fono"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Teléfono de contacto</label
              >
              <InputText
                id="fono"
                type="number"
                placeholder="56 9 95891234"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
            </div>
          </div>

          <!-- Dirección, Región, Comuna -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-0">
            <div class="col-span-3 flex flex-col gap-2">
              <label
                for="direccion"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Correo Dirección Particular</label
              >
              <InputText
                id="direccion"
                type="email"
                placeholder="Avda. Siempre Viva 123"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="region"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Región</label
              >
              <Select
                v-model="form.region"
                :options="regiones"
                optionLabel="nombre"
                placeholder="Región"
                class="w-full"
                @change="handleRegionChange"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="comuna"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Comuna</label
              >
              <Select
                v-model="form.comuna"
                :options="comunasFiltradas"
                optionLabel="nombre"
                placeholder="Comuna"
                :disabled="!form.region"
                class="w-full"
              />
            </div>
          </div>

          <!-- Título y Estado Civil -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-0">
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="tprofesional"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Título Profesional</label
              >
              <Select
                v-model="form.titulo_profesional"
                :options="titulosProfesionales"
                optionLabel="nombre"
                placeholder="Título Profesional"
                class="w-full"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-2">
              <label
                for="estado_civil"
                class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
                >Estado Civil</label
              >
              <Select
                v-model="form.estado_civil"
                :options="estadosCivil"
                optionLabel="nombre"
                placeholder="Estado Civil"
                class="w-full"
              />
            </div>
          </div>

          <!-- Presentación y Cargos -->
          <div class="col-span-1 flex flex-col gap-2">
            <label
              for="ppersonal"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Presentación Personal</label
            >
            <Textarea
              v-model="form.presentacion_personal"
              autoResize
              rows="4"
              placeholder="Cuéntanos brevemente sobre ti"
              class="w-full"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-2">
            <label
              for="tprofesional"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Cargos a los que Postula (1 a 3)</label
            >
            <MultiSelect
              v-model="form.cargos"
              :options="availablePositions"
              optionLabel="name"
              display="chip"
              :maxSelectedLabels="3"
              :selectionLimit="3"
              class="w-full"
            />
          </div>

          <!-- Listbox para subir archivos -->
          <div class="col-span-1 flex flex-col gap-2">
            <label
              for="documentos"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Adjuntar Documentos</label
            >
            <div
              class="w-full max-h-96 overflow-y-auto border border-gray-200 rounded shadow-md divide-y divide-gray-200"
            >
              <div
                v-for="tipo in tipos"
                :key="tipo.label"
                class="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <span class="text-base font-medium text-gray-600">{{
                  tipo.label
                }}</span>
                <Button
                  icon="pi pi-upload"
                  variant="text"
                  rounded
                  raised
                  class="p-button-sm"
                  label="Subir Archivo"
                  @click="triggerUpload(tipo)"
                />
              </div>
            </div>
          </div>

          <!-- 🔍 Preview del archivo actual -->
          <div
            v-if="archivoActual"
            class="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-surface-800"
          >
            <h4
              class="text-sm font-semibold text-gray-700 dark:text-white mb-2"
            >
              Archivo en proceso de carga
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ archivoActual.name }} •
              {{ getFriendlyType(archivoActual.type) }} •
              {{ formatSize(archivoActual.size) }}
            </p>
          </div>
        </div>

        <!-- Botón final -->
        <Button
          label="Guardar Datos"
          icon="pi pi-user-plus"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2 mt-6"
          aria-label="Guardar Datos"
          @click="subirDocumentos"
        />
      </div>

      <!-- 🟥 Panel lateral de archivos subidos -->
      <div
        class="bg-surface-0 dark:bg-surface-900 p-6 shadow-sm rounded-2xl w-full md:w-1/3 flex flex-col gap-4"
      >
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
          Archivos Subidos
        </h3>

        <div
          class="w-full max-h-[600px] overflow-y-auto border border-gray-200 rounded shadow-md divide-y divide-gray-200 bg-white dark:bg-surface-800"
        >
          <div
            v-if="archivosPrevios.length === 0"
            class="px-4 py-3 text-sm text-gray-500"
          >
            No hay archivos registrados previamente.
          </div>

          <div
            v-else
            v-for="archivo in archivosPrevios"
            :key="archivo.id"
            class="flex items-center justify-between px-4 py-3"
          >
            <div class="flex items-center gap-3">
              <i :class="archivo.icono" class="text-xl text-gray-600" />
              <div class="flex flex-col">
                <span class="text-xs text-gray-500">{{ archivo.tipo }}</span>
                <span class="text-sm font-medium text-gray-800">{{
                  archivo.nombre
                }}</span>
                <span class="text-xs text-gray-600">{{ archivo.tamano }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <Button
                icon="pi pi-download"
                class="w-full py-2 rounded-lg flex justify-center items-center gap-2 mt-6"
                aria-label="Descargar Archivo"
                @click="downloadFile(archivo)"
              />

              <button
                @click="confirmarEliminacion(archivo)"
                class="text-red-500 hover:text-red-700 p-button-sm cursor-pointer"
                aria-label="Eliminar archivo"
                title="Eliminar archivo"
              >
                <i class="pi pi-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast para notificaciones -->
    <Toast class="chinchorro-toast" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const archivoActual = ref(null);

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

// 📂 Tipos de documentos
const tipos = ref([
  { label: "Currículum", value: "cv" },
  { label: "Certificado", value: "cert" },
  { label: "Portafolio", value: "portfolio" },
  { label: "Otros", value: "otros" },
  { label: "Fotografía", value: "foto" },
  { label: "Antecedentes", value: "antecedentes" },
  { label: "Certificado de Título", value: "certificado_titulo" },
  { label: "Certificado de Nacimiento", value: "certificado_nacimiento" },
  { label: "Certificado de Residencia", value: "certificado_residencia" },
  { label: "Certificado de Salud", value: "certificado_salud" },
  { label: "Certificado de Antecedentes", value: "certificado_antecedentes" },
  { label: "Otros Documentos", value: "otros_documentos" },
  { label: "Fotografía Actualizada", value: "foto_actualizada" },
  { label: "Certificado de Estudios", value: "certificado_estudios" },
]);

const archivosPrevios = ref([
  {
    id: 1,
    nombre: "Certificado de antecedentes.pdf",
    tipo: "PDF",
    tamano: "120 KB",
    url: "/archivos/certificado.pdf",
    icono: "pi pi-file-pdf",
  },
  {
    id: 2,
    nombre: "Fotografía.jpg",
    tipo: "Imagen",
    tamano: "450 KB",
    url: "/archivos/foto.jpg",
    icono: "pi pi-image",
  },
]);

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

// 📁 Archivos subidos
const uploadedFiles = ref({});

// 🧠 Mapeo de tipos MIME
function getFriendlyType(mime) {
  const map = {
    "application/pdf": "PDF",
    "image/jpeg": "Imagen JPEG",
    "image/png": "Imagen PNG",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel",
  };
  return map[mime] || mime;
}

// 🎨 Íconos por tipo MIME
function getFileIcon(mime) {
  const map = {
    "application/pdf": "pi pi-file-pdf",
    "image/jpeg": "pi pi-image",
    "image/png": "pi pi-image",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "pi pi-file-word",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "pi pi-file-excel",
  };
  return map[mime] || "pi pi-file";
}

// 📤 Activar input file
function triggerUpload(tipo) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = validTypes.join(",");
  input.onchange = (event) => handleFileUpload(tipo, event);
  input.click();
}

const validTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

// 📥 Manejar subida
function handleFileUpload(tipo, event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!validTypes.includes(file.type)) {
    toast.add({
      severity: "error",
      summary: "Archivo no permitido",
      detail: "Solo se aceptan PDF, JPG, PNG, Word o Excel.",
      life: 4000,
    });
    return;
  }

  archivoActual.value = file;

  uploadedFiles.value[tipo.value] = {
    archivo: file,
    tipo: tipo.label,
  };
}

// 🗑️ Eliminar archivo
function removeFile(tipoValue) {
  delete uploadedFiles.value[tipoValue];
}

// 📏 Formatear tamaño
function formatSize(bytes) {
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

// 📥 Descargar archivo
function downloadFile(archivo) {
  console.log("archivo", archivo);

  if (!archivo || !archivo.id) return;

  const url = URL.createObjectURL(archivo);
  const link = document.createElement("a");
  link.href = url;
  link.download = archivo.name;
  link.click();
  URL.revokeObjectURL(url);
}

const confirmarEliminacion = (archivo) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `Se eliminará el archivo "${archivo.nombre}". Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      archivosPrevios.value = archivosPrevios.value.filter(
        (a) => a.id !== archivo.id
      );
      Swal.fire({
        title: "Eliminado",
        text: "El archivo ha sido eliminado correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

// 🚀 Simular subida
const subirDocumentos = () => {
  Swal.fire(
    "Documentos subidos",
    "Tus archivos han sido registrados",
    "success"
  );
};
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

.chinchorro-toast .p-toast-message {
  background-color: #2c3e50;
  color: #ecf0f1;
  border-left: 5px solid #00b894;
  font-family: "Roboto", sans-serif;
}

.chinchorro-toast .p-toast-icon-close {
  color: #ecf0f1;
}
</style>
