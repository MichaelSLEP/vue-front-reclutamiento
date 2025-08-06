<template>
  <div class="dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-30 w-auto"
    />
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8"
    >
      <div class="flex flex-col items-center gap-4 mb-8">
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

        <div class="flex flex-col gap-6 w-full mb-8">
          <DocumentUpload @update:documento="handleDocumento" />
        </div>
      </div>
    </div>

    <div class="md:w-2/3 w-full flex flex-col">
      <!-- Panel lateral de archivos subidos -->
      <div class="md:w-1/3 w-full flex flex-col gap-4">
        <label
          class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
        >
          Archivos Subidos
        </label>
        <div
          class="w-full max-h-[600px] overflow-y-auto border border-gray-200 rounded shadow-md divide-y divide-gray-200 bg-white dark:bg-surface-800"
        >
          <div
            v-if="Object.keys(uploadedFiles).length === 0"
            class="px-4 py-3 text-sm text-gray-500"
          >
            No se han subido archivos aún.
          </div>
          <div
            v-else
            v-for="(file, tipo) in uploadedFiles"
            :key="tipo"
            class="flex items-center justify-between px-4 py-3"
          >
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">{{ file.tipo }}</span>
              <span class="text-sm font-medium text-gray-800">{{
                file.archivo.name
              }}</span>
              <span class="text-xs text-gray-600">
                {{ getFriendlyType(file.archivo.type) }} ·
                {{ formatSize(file.archivo.size) }}
              </span>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              rounded
              text
              @click="removeFile(tipo)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import DocumentUpload from "../components/DocumentUpload.vue";

const form = ref({
  documentos: [] as Array<{ tipo: string; file: File | null }>,
});

function handleDocumento(doc: { tipo: string; file: File | null }) {
  form.value.documentos.push(doc);
}

const uploadedFiles = ref({});

function removeFile(key) {
  delete uploadedFiles.value[key];
}
function formatSize(size) {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  else if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function getFriendlyType(type) {
  const types = {
    "application/pdf": "PDF",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "application/msword": "Word",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word",
    "application/vnd.ms-excel": "Excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel",
  };
  return types[type] || type;
}
</script>
<style scoped></style>
