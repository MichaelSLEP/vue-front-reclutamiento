<template>
  <div class="max-w-3xl mx-auto py-10 space-y-6">
    <SectionCard title="Datos de acceso">
      <FormField label="Correo">
        <InputText v-model="form.email" />
      </FormField>
      <FormField label="Contraseña">
        <Password v-model="form.password" toggleMask />
      </FormField>
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
const form = {
  email: "",
  password: "",
};
</script>
