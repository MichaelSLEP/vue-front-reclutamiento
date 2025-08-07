<template>
  <div class="dark:bg-surface-950 px-4 py-10 md:py-16 md:px-10 lg:px-16">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-auto w-60 mb-6"
    />
    <div
      class="bg-surface-0 dark:bg-surface-900 p-6 md:p-8 shadow-sm rounded-xl w-full max-w-md mx-auto flex flex-col"
    >
      <img
        src=""
        alt="Logo Contrataciones Slep Chinchorro"
        srcset="../assets/favicon-fb.ico"
        class="w-15 h-auto mb-3 self-center"
      />

      <div class="flex flex-col items-center gap-2 mb-4">
        <div
          class="text-surface-900 dark:text-surface-0 text-lg font-semibold leading-tight text-center w-full"
        >
          Sistema de Reclutamiento
        </div>
        <div class="text-center w-full">
          <span
            class="text-surface-700 dark:text-surface-200 text-sm leading-normal"
          >
            Bienvenido al Servicio Local de Educación Pública Chinchorro
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full mb-4">
        <div class="flex flex-col gap-1 w-full">
          <label
            for="email1"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Ingrese su Rut
          </label>
          <InputText
            id="email1"
            type="text"
            placeholder="17557157-K"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label
            for="password1"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Contraseña
          </label>
          <InputText
            id="password1"
            type="password"
            placeholder="Password"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2"
        >
          <div class="flex items-center gap-2">
            <Checkbox id="rememberme1" v-model="checked1" :binary="false" />
            <label
              for="rememberme1"
              class="text-surface-900 dark:text-surface-0 text-sm"
            >
              Recuérdame
            </label>
          </div>
          <a
            class="text-primary text-sm font-medium cursor-pointer hover:text-primary-emphasis"
          >
            ¿Olvidó su contraseña?
          </a>
        </div>
      </div>

      <Button
        label="Iniciar Sesión"
        icon="pi pi-user"
        size="small"
        class="w-full rounded-md"
        :pt="{
          root: {
            class:
              'flex justify-center items-center gap-2 text-sm py-2 h-9 bg-primary text-white hover:bg-primary-emphasis transition-all duration-300',
          },
          icon: {
            class: '!text-base !leading-normal',
          },
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked1 = ref(true);
</script>
