<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    <SectionCard title="Datos Personales">
      <FormField label="RUT">
        <InputMask v-model="form.rut" mask="99999999-*" />
      </FormField>
      <FormField label="Nombre Completo">
        <InputText v-model="form.nombre_completo" />
      </FormField>
      <FormField label="Teléfono">
        <InputText v-model="form.telefono" />
      </FormField>
      <FormField label="Correo">
        <InputText v-model="form.correo" />
      </FormField>
      <FormField label="Dirección">
        <Textarea v-model="form.direccion" rows="2" />
      </FormField>
      <FormField label="Región">
        <Select
          v-model="form.region_id"
          :options="regiones"
          @change="onRegionChange"
        />
      </FormField>
      <FormField label="Comuna">
        <Select v-model="form.comuna_id" :options="comunas" />
      </FormField>
    </SectionCard>

    <SectionCard title="Documentos">
      <DocumentUpload v-model="form.documentos" />
      <ul class="mt-4 space-y-2">
        <li
          v-for="(doc, i) in form.documentos"
          :key="i"
          class="flex justify-between items-center bg-white p-2 rounded shadow"
        >
          <div>
            <p class="font-semibold">{{ doc.archivo.name }}</p>
            <p class="text-sm text-gray-500">{{ doc.tipo }}</p>
          </div>
          <Button
            icon="pi pi-trash"
            severity="danger"
            @click="removeDocument(i)"
          />
        </li>
      </ul>
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/FormField.vue";
import SectionCard from "../components/SectionCard.vue";
import DocumentUpload from "../components/DocumentUpload.vue";

const form: any = ref({
  rut: "",
  nombre_completo: "",
  telefono: "",
  correo: "",
  direccion: "",
  region_id: null,
  comuna_id: null,
  estado_civil_id: null,
  titulo_profesional_id: null,
  nacionalidad_id: null,
  cargos: [],
  documentos: [],
});

const regiones: any = [];
const comunas: any = [];
const onRegionChange = () => {
  /* lógica dependiente */
};
const removeDocument = (index: number) =>
  form.value.documentos.splice(index, 1);
</script>
