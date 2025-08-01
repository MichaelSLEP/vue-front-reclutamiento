<template>
  <div>
    <FileUpload
      name="archivo"
      :customUpload="true"
      accept=".pdf,.doc,.docx"
      @uploader="onUpload"
      auto
      chooseLabel="Seleccionar Documento"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const modelValue: any = defineModel<{ tipo: string; archivo: File }[]>();

const onUpload = (event: any) => {
  const file = event.files[0];
  const tipo = prompt("¿Qué tipo de documento es?");
  if (tipo && file) {
    modelValue.value.push({ tipo, archivo: file });
    emit("update:modelValue", modelValue.value);
  }
};
</script>
