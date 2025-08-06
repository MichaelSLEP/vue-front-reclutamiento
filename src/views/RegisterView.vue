<template>
  <div class="dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-30 w-auto"
    />
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col"
    >
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
            Crear cuenta nueva
          </div>
          <div class="text-center w-full">
            <span class="text-surface-700 dark:text-surface-200 leading-normal">
              Bienvenido al sistema de reclutamiento del SLEP Chinchorro
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 w-full mb-8">
        <div class="flex flex-col gap-2 w-full">
          <label
            for="rut"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >
            Rut
          </label>
          <InputText
            id="rut"
            type="text"
            placeholder="15678432-1"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label
            for="name"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >
            Nombre completo
          </label>
          <InputText
            id="name"
            type="text"
            placeholder="Juan Pérez"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label
            for="email2"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >
            Correo electrónico
          </label>
          <InputText
            id="email2"
            type="email"
            placeholder="correo@ejemplo.cl"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label
            for="password2"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >
            Contraseña
          </label>
          <InputText
            id="password2"
            type="password"
            placeholder="Contraseña segura"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>

        <div class="flex items-center gap-2">
          <Checkbox id="terms" v-model="acceptedTerms" :binary="true" />
          <label
            for="terms"
            class="text-surface-900 dark:text-surface-0 leading-normal"
          >
            Acepto los
            <a
              class="text-primary font-medium hover:text-primary-emphasis cursor-pointer"
              @click="modalVisible = true"
              >términos y condiciones</a
            >
          </label>
        </div>
      </div>

      <Button
        label="Registrarse"
        icon="pi pi-user-plus"
        class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
        :disabled="!acceptedTerms"
        aria-label="Registrarse en el sistema"
      />
    </div>

    <TerminosModal v-model:visible="modalVisible" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TerminosModal from "../components/modal/TerminosModal.vue";

const acceptedTerms = ref(false);
const modalVisible = ref(false);
</script>
<style scoped></style>
