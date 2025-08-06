<template>
  <div class="dark:bg-surface-950 px-6 py-12 md:py-20 md:px-12 lg:px-20">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-30 w-auto mb-8"
    />
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col"
    >
      <img
        src=""
        alt="Logo Contrataciones Slep Chinchorro"
        srcset="../assets/favicon-fb.ico"
        class="w-25 mb-4 self-center"
      />

      <div class="flex flex-col items-center gap-4 mb-8">
        <div class="flex items-center gap-4"></div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
          >
            Sistema de Reclutamiento
          </div>
          <div class="text-center w-full">
            <span class="text-surface-700 dark:text-surface-200 leading-normal">
              Bienvenido al Servicio Local de Educación Pública Chinchorro
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 w-full mb-8">
        <div class="flex flex-col gap-2 w-full">
          <label
            for="email1"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
            >Ingrese su Rut</label
          >
          <InputText
            id="email1"
            type="text"
            placeholder="17557157-K"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label
            for="password1"
            class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
            >Contraseña</label
          >
          <InputText
            id="password1"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 shadow-sm rounded-lg"
          />
        </div>
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
        >
          <div class="flex items-center gap-2">
            <Checkbox id="rememberme1" v-model="checked1" :binary="false" />
            <label
              for="rememberme1"
              class="text-surface-900 dark:text-surface-0 leading-normal"
              >Recuérdame</label
            >
          </div>
          <a
            class="text-primary font-medium cursor-pointer hover:text-primary-emphasis"
            >Olvidó su contraseña?</a
          >
        </div>
      </div>
      <Button
        label="Iniciar Sesión"
        icon="pi pi-user"
        class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
      >
        <template #icon>
          <i class="pi pi-user !text-base !leading-normal" />
        </template>
      </Button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const checked1 = ref(true);
</script>
