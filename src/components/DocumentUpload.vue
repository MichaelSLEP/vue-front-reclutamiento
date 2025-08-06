<template>
  <div class="w-full space-y-4">
    <!-- Listbox expandido -->
    <div
      class="w-full max-h-96 overflow-y-auto border rounded shadow-md divide-y divide-gray-200"
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
          class="p-button-rounded p-button-text p-button-sm"
          label="Subir Archivo"
          @click="triggerUpload(tipo)"
        />
      </div>
    </div>

    <!-- Preview expandido -->
    <div v-if="Object.keys(uploadedFiles).length" class="space-y-2 w-full">
      <div
        v-for="(file, tipo) in uploadedFiles"
        :key="tipo"
        class="flex items-center justify-between bg-gray-100 rounded px-4 py-3 text-sm w-full"
      >
        <div class="flex items-center gap-3">
          <i class="pi pi-file text-gray-600 text-lg" />
          <div>
            <div class="text-xs text-gray-900">{{ file.tipo }}</div>
            <div class="font-medium text-base">{{ file.archivo.name }}</div>
            <div class="text-xs text-gray-600">
              {{ file.archivo.type }} · {{ formatSize(file.archivo.size) }}
            </div>
          </div>
        </div>

        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-text p-button-sm"
          @click="removeFile(tipo)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const selectedTipo = ref(null);
const uploadedFiles = ref({});

// Activar input file al hacer clic en el botón
function triggerUpload(tipo) {
  const input = document.createElement("input");
  input.type = "file";
  input.className = "hidden";
  input.onchange = (event) => handleFileUpload(tipo, event);
  input.click();
}

// Guardar archivo subido
function handleFileUpload(tipo, event) {
  const file = event.target.files[0];
  if (file) {
    uploadedFiles.value[tipo.value] = {
      archivo: file,
      tipo: tipo.label, // Guardamos el label legible
    };
  }
}

// Eliminar archivo
function removeFile(tipoValue) {
  delete uploadedFiles.value[tipoValue];
}

// Formatear tamaño
function formatSize(bytes) {
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}
</script>
<style scoped>
.border-gray-200 {
  border-color: #cbd5e1; /* Color primario de Tailwind CSS */
}
</style>
