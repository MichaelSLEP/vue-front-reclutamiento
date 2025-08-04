<template>
  <div class="flex w-full min-h-screen">
    <div class="flex-1">
      <CustomCard
        class="max-w-6xl mx-auto space-y-10 bg-gradient-to-br from-rose-100 via-amber-100 to-emerald-100"
      >
        <!-- 🧍 Datos Personales -->
        <SectionCard icon="pi pi-user" title="Datos Personales">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="RUT">
              <InputText
                v-model="form.rut"
                placeholder="12.345.678-9"
                class="w-full"
              />
            </FormField>

            <FormField label="Nombre Completo">
              <InputText
                v-model="form.nombre_completo"
                placeholder="Ej. Juan Pérez González"
                class="w-full"
              />
            </FormField>

            <FormField label="Dirección Particular">
              <InputText
                v-model="form.direccion"
                placeholder="Calle, número, depto."
                class="w-full"
              />
            </FormField>

            <FormField label="Comuna">
              <AutoComplete
                v-model="form.comuna"
                :suggestions="filteredComunas"
                :complete-method="filterComunas"
                placeholder="Ej. Providencia"
                class="w-full"
              />
            </FormField>

            <FormField label="Región">
              <Listbox
                v-model="form.region"
                :options="regionesChile"
                optionLabel="label"
                class="w-full"
              />
            </FormField>

            <FormField label="Correo Electrónico">
              <InputText
                v-model="form.email"
                type="email"
                placeholder="ejemplo@correo.com"
                class="w-full"
              />
            </FormField>

            <FormField label="Teléfono de Contacto">
              <InputText
                v-model="form.telefono"
                placeholder="+56 9 1234 5678"
                class="w-full"
              />
            </FormField>

            <FormField label="Título Profesional">
              <AutoComplete
                v-model="form.titulo_profesional"
                :suggestions="filteredTitulos"
                :complete-method="filterTitulos"
                field="label"
                placeholder="Ej. Ingeniero Civil"
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
        <SectionCard icon="pi pi-upload" title="Documentos Adjuntos">
          <FormField label="Tipo de Documento">
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

        <div class="flex justify-end pt-4">
          <Button
            label="Enviar Postulación"
            icon="pi pi-check"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
          />
        </div>
      </CustomCard>
    </div>

    <DocumentStatusList :documents="estadoDocumentos" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";
import FormField from "../components/FormField.vue";
import SectionCard from "../components/SectionCard.vue";
import CustomCard from "../components/customCard.vue";
import DocumentStatusList from "../components/DocumentStatusList.vue";

// Formulario principal
const form = ref<{
  rut: string;
  nombre_completo: string;
  direccion: string;
  comuna: string | null;
  region: { label: string } | null;
  email: string;
  telefono: string;
  titulo_profesional: { label: string } | null;
  presentacion_personal: string;
  cargos: { name: string }[];
  disponibilidad: string[];
  renta: number | null;
  documentos: { tipo: { label: string }; archivo: File }[];
}>({
  rut: "",
  nombre_completo: "",
  direccion: "",
  comuna: null,
  region: null,
  email: "",
  telefono: "",
  titulo_profesional: null,
  presentacion_personal: "",
  cargos: [],
  disponibilidad: [],
  renta: null,
  documentos: [],
});

// Documento temporal
const doc = ref<{
  tipo: { label: string } | null;
  archivo: File | null;
}>({
  tipo: null,
  archivo: null,
});

// Títulos profesionales
const titulosProfesionales = [
  { label: "Ingeniero Civil" },
  { label: "Psicólogo" },
  { label: "Arquitecto" },
  { label: "Administrador Público" },
  { label: "Contador Auditor" },
];
const filteredTitulos: any = ref([]);
const filterTitulos = (event: any) => {
  const query = event.query.toLowerCase();
  filteredTitulos.value = titulosProfesionales.filter((t) =>
    t.label.toLowerCase().includes(query)
  );
};

// Comunas y regiones
const comunasChile = [
  "Arica",
  "Iquique",
  "Antofagasta",
  "Copiapó",
  "La Serena",
  "Valparaíso",
  "Viña del Mar",
  "Santiago",
  "Providencia",
  "Rancagua",
  "Talca",
  "Concepción",
  "Temuco",
  "Puerto Montt",
];
const filteredComunas: any = ref([]);
const filterComunas = (event: any) => {
  const query = event.query.toLowerCase();
  filteredComunas.value = comunasChile.filter((c) =>
    c.toLowerCase().includes(query)
  );
};

const regionesChile = [
  { label: "Arica y Parinacota" },
  { label: "Tarapacá" },
  { label: "Antofagasta" },
  { label: "Atacama" },
  { label: "Coquimbo" },
  { label: "Valparaíso" },
  { label: "Metropolitana" },
  { label: "O’Higgins" },
  { label: "Maule" },
  { label: "Biobío" },
  { label: "La Araucanía" },
  { label: "Los Ríos" },
  { label: "Los Lagos" },
  { label: "Aysén" },
  { label: "Magallanes" },
];

const estadoDocumentos = [
  { id: 1, nombre: "CURRICULUM VITAE", loaded: true },
  { id: 2, nombre: "CERTIFICADO DE NACIMIENTO", loaded: false },
  { id: 3, nombre: "FOTOCOPIA CÉDULA IDENTIDAD", loaded: false },
  { id: 4, nombre: "CERTIFICADO AFILIACIÓN SISTEMA DE SALUD", loaded: true },
  { id: 5, nombre: "CERTIFICADO DE AFILIACIÓN AFP", loaded: false },
  { id: 6, nombre: "CERTIFICADO DE TÍTULO", loaded: false },
  {
    id: 7,
    nombre: "CERTIFICADO DE INHABILIDADES PARA TRABAJAR CON MENORES DE EDAD",
    loaded: false,
  },
  { id: 8, nombre: "CERTIFICADO DE MALTRATO RELEVANTE", loaded: false },
  {
    id: 9,
    nombre: "DECLARACIÓN JURADA SOBRE PENSIÓN DE ALIMENTOS",
    loaded: false,
  },
  { id: 10, nombre: "CERTIFICADO DE EXPERIENCIA LABORAL", loaded: false },
  { id: 11, nombre: "POSTÍTULO", loaded: false },
  { id: 12, nombre: "CERTIFICADO NACIMIENTO HIJOS", loaded: false },
  { id: 13, nombre: "CERTIFICADO MATRIMONIO", loaded: false },
  { id: 14, nombre: "CERTIFICADO APV", loaded: false },
  { id: 15, nombre: "DECLARACIÓN JURADA SIMPLE", loaded: false },
  { id: 16, nombre: "CERTIFICADO DE ANTECEDENTES", loaded: false },
];

// Otros
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

// Acciones
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
</script>
