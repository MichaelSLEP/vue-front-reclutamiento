<template>
  <MainNavbar />
  <div
    class="relative grid gap-6 min-h-screen px-8 py-6 bg-white/30 backdrop-invert backdrop-opacity-10"
  >
    <div class="flex gap-6 items-start w-full mx-auto">
      <CustomCardWithHeader
        title="Postulación a Cargo"
        icon="pi pi-user-edit"
        class="max-w-5xl w-full mx-auto"
      >
        <div class="space-y-6">
          <!-- 🧍 Datos Personales + 📎 Adjuntos en paralelo -->
          <div
            class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start"
          >
            <!-- 🧍 Datos Personales -->
            <SectionCard
              icon="pi pi-user"
              class="flex-1"
              title="Datos Personales"
            >
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-0">
                  <FormField label="RUT" required>
                    <InputText v-model="form.rut" class="w-full" />
                  </FormField>

                  <FormField label="Nombre Completo" required>
                    <InputText v-model="form.nombre_completo" class="w-full" />
                  </FormField>
                </div>

                <FormField label="Dirección Particular" required>
                  <InputText v-model="form.direccion" class="w-full" />
                </FormField>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Región" required>
                    <Select
                      v-model="form.region"
                      :options="regiones"
                      optionLabel="nombre"
                      placeholder="Región"
                      class="w-full"
                      @change="handleRegionChange"
                    />
                  </FormField>

                  <FormField label="Comuna" required>
                    <Select
                      v-model="form.comuna"
                      :options="comunasFiltradas"
                      optionLabel="nombre"
                      placeholder="Comuna"
                      :disabled="!form.region"
                      class="w-full"
                    />
                  </FormField>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Correo Electrónico" required>
                    <InputText
                      v-model="form.email"
                      type="email"
                      class="w-full"
                    />
                  </FormField>

                  <FormField label="Teléfono de Contacto" required>
                    <InputText v-model="form.telefono" class="w-full" />
                  </FormField>
                </div>

                <FormField label="Título Profesional" required>
                  <Select
                    v-model="form.titulo_profesional"
                    :options="titulosProfesionales"
                    optionLabel="nombre"
                    placeholder="Título Profesional"
                    class="w-full"
                  />
                </FormField>

                <FormField label="Disponibilidad de Horario">
                  <MultiSelect
                    v-model="form.disponibilidad"
                    :options="horariosDisponibles"
                    display="chip"
                    class="w-full"
                  />
                </FormField>

                <FormField label="Remuneración Esperada">
                  <InputNumber
                    v-model="form.renta"
                    mode="currency"
                    currency="CLP"
                    locale="es-CL"
                    class="w-full"
                  />
                </FormField>

                <FormField label="Cargos a los que Postula (1 a 3)">
                  <MultiSelect
                    v-model="form.cargos"
                    :options="availablePositions"
                    optionLabel="name"
                    display="chip"
                    :maxSelectedLabels="3"
                    :selectionLimit="3"
                    class="w-full"
                  />
                </FormField>

                <FormField label="Presentación Personal">
                  <Textarea
                    v-model="form.presentacion_personal"
                    autoResize
                    rows="4"
                    placeholder="Cuéntanos brevemente sobre ti"
                    class="w-full"
                  />
                </FormField>
              </div>
            </SectionCard>

            <!-- 📎 Documentos Adjuntos -->
            <SectionCard
              icon="pi pi-upload"
              class="w-[360px] flex flex-col justify-between transition-all duration-500 ease-in-out"
              title="Adjuntar Documentos"
            >
              <FormField label="Tipo de Documento" required>
                <Listbox
                  v-model="doc.tipo"
                  :options="tipoDocumentos"
                  optionLabel="label"
                  class="w-full"
                />
              </FormField>

              <FileUpload
                v-model="doc.archivo"
                name="documento"
                customUpload
                :uploadHandler="handleUpload"
                class="w-full"
                chooseLabel="Seleccionar archivo"
              />

              <div
                v-for="(d, index) in form.documentos"
                :key="index"
                class="flex justify-between items-center mt-4 border p-3 rounded-lg shadow hover:shadow-md transition"
              >
                <div>
                  <p class="font-semibold">{{ d.tipo.label }}</p>
                  <p class="text-sm text-gray-500">{{ d.archivo.name }}</p>
                </div>
                <Button
                  icon="pi pi-trash"
                  class="p-button-danger p-button-sm"
                  @click="removeDocument(index)"
                />
              </div>
            </SectionCard>
          </div>
        </div>

        <!-- ✅ Botón de envío -->
        <template #footer>
          <div class="flex justify-end">
            <Button
              label="Guardar Cambios"
              icon="pi pi-save"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
              @click="guardarCambios"
            />
          </div>
        </template>
      </CustomCardWithHeader>

      <DocumentStatusList :documents="estadoDocumentos" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import FormField from "../components/FormField.vue";
import SectionCard from "../components/SectionCard.vue";
import CustomCardWithHeader from "../components/CustomCardWithHeader.vue";
import DocumentStatusList from "../components/DocumentStatusList.vue";
import MainNavbar from "../components/MainNavbar.vue";

// 📦 Formulario principal
const form = ref({
  rut: "",
  nombre_completo: "",
  direccion: "",
  comuna: null,
  region: null as { id: number; nombre: string } | null,
  email: "",
  telefono: "",
  titulo_profesional: null as { nombre: string } | null,
  presentacion_personal: "",
  cargos: [],
  disponibilidad: [],
  renta: null,
  documentos: [] as { tipo: { label: string }; archivo: File }[],
});

// 🗂 Documento temporal
const doc = ref({
  tipo: null as { label: string } | null,
  archivo: null as File | null,
});

// 🎓 Títulos profesionales
const titulosProfesionales = [
  { nombre: "Ingeniero Civil" },
  { nombre: "Psicólogo" },
  { nombre: "Arquitecto" },
  { nombre: "Administrador Público" },
  { nombre: "Contador Auditor" },
];

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
    ? comunas.filter((c) => c.regionId === form.value.region!.id)
    : []
);

function handleRegionChange() {
  form.value.comuna = null;
}

// 📄 Estado documental simulado
const estadoDocumentos = [
  { id: 1, nombre: "CURRICULUM VITAE", loaded: true },
  { id: 2, nombre: "CERTIFICADO DE NACIMIENTO", loaded: false },
  // ...
];

// 🧰 Valores auxiliares
const availablePositions = [
  { name: "Jefe de Proyecto" },
  { name: "Analista Funcional" },
  { name: "Desarrollador Frontend" },
];

const tipoDocumentos = [
  { label: "Certificado Magíster" },
  { label: "Diplomado" },
  { label: "Certificado Otro" },
];

const horariosDisponibles = [
  "Mañana",
  "Tarde",
  "Fin de Semana",
  "Horario Completo",
];

// 📎 Carga de documento individual
const handleUpload = ({ files }: { files: File[] }) => {
  if (doc.value.tipo && files.length > 0) {
    form.value.documentos.push({
      tipo: doc.value.tipo,
      archivo: files[0],
    });
    doc.value.tipo = null;
    doc.value.archivo = null;
  }
};

// 🧹 Eliminar documento
const removeDocument = (index: number) => {
  Swal.fire({
    title: "¿Eliminar documento?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      form.value.documentos.splice(index, 1);
      Swal.fire("Eliminado", "Documento eliminado con éxito", "success");
    }
  });
};

// ✅ Validación del formulario
/* function validarFormulario() {
  const camposObligatorios = [
    form.value.rut,
    form.value.nombre_completo,
    form.value.direccion,
    form.value.region,
    form.value.comuna,
    form.value.email,
    form.value.telefono,
    form.value.titulo_profesional,
  ];

  if (camposObligatorios.includes("") || camposObligatorios.includes(null)) {
    Swal.fire({
      icon: "error",
      title: "Faltan campos obligatorios",
      text: "Por favor, completa todos los datos requeridos.",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Formulario válido",
    text: "¡Puedes continuar con el diseño o integrar el backend cuando estés listo!",
  });
} */

function guardarCambios() {
  // ⚙️ Validación ligera o backend opcional
  Swal.fire({
    icon: "success",
    title: "Datos actualizados",
    text: "Tu información ha sido guardada correctamente.",
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
</style>
