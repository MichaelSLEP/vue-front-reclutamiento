<template>
  <div class="dark:bg-surface-950 px-4 py-16 md:px-10 lg:px-16">
    <img
      src="../assets/Logotipo-Chinchorro-web-01.png"
      alt="Logotipo Chinchorro"
      class="h-auto w-60 mb-6"
    />
    <div
      class="bg-surface-0 dark:bg-surface-900 p-6 md:p-8 shadow-sm rounded-xl w-full max-w-md mx-auto flex flex-col"
    >
      <div class="flex flex-col items-center gap-2 mb-4">
        <img
          src=""
          alt="Logo Contrataciones Slep Chinchorro"
          srcset="../assets/favicon-fb.ico"
          class="w-15 mb-3 self-center"
        />
        <div class="flex flex-col items-center gap-1 w-full">
          <div
            class="text-surface-900 dark:text-surface-0 text-lg font-semibold leading-tight text-center w-full"
          >
            Crear cuenta nueva
          </div>
          <div class="text-center w-full">
            <span
              class="text-surface-700 dark:text-surface-200 text-sm leading-normal"
            >
              Bienvenido al sistema de reclutamiento del SLEP Chinchorro
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full mb-4">
        <div class="flex flex-col gap-1 w-full">
          <label
            for="rut"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Rut
          </label>
          <InputText
            id="rut"
            type="text"
            v-model="rut"
            @input="onRutInput"
            placeholder="15678432-1"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label
            for="name"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Nombre completo
          </label>
          <InputText
            id="name"
            v-model="nombre"
            type="text"
            placeholder="Juan Pérez"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label
            for="email2"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Correo electrónico
          </label>
          <InputText
            id="email2"
            v-model="correo"
            @input="validarCorreo"
            type="email"
            placeholder="correo@ejemplo.cl"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label
            for="password2"
            class="text-surface-900 dark:text-surface-0 text-sm font-medium"
          >
            Contraseña
          </label>
          <InputText
            id="password2"
            type="password"
            v-model="password"
            @input="validarPassword"
            placeholder="Contraseña segura"
            class="w-full text-sm placeholder:text-xs px-2 py-1.5 h-9 rounded-md shadow-sm"
          />
        </div>

        <div class="flex items-start gap-2 text-sm">
          <Checkbox id="terms" v-model="acceptedTerms" :binary="true" />
          <label
            for="terms"
            class="text-surface-900 dark:text-surface-0 leading-normal"
          >
            Acepto los
            <a
              class="text-primary font-medium hover:text-primary-emphasis cursor-pointer"
              @click="modalVisible = true"
            >
              términos y condiciones
            </a>
          </label>
        </div>
      </div>

      <Button
        label="Registrarse"
        icon="pi pi-user-plus"
        size="small"
        class="w-full rounded-md"
        :disabled="!acceptedTerms"
        aria-label="Registrarse en el sistema"
        @click="registrarUsuario"
      />
    </div>

    <TerminosModal v-model:visible="modalVisible" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TerminosModal from "../components/modal/TerminosModal.vue";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import {
  validarRut,
  formatearRut,
  validarCorreo,
  validarPassword,
  limpiarRut,
} from "../utils/validaciones";

const nombre = ref("");
const rut = ref("");
const correo = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();
const acceptedTerms = ref(false);
const modalVisible = ref(false);
let count = 0;

function onRutInput(e) {
  const target = e.target;
  if (target.value === "") {
    rut.value = "";
    return;
  }
  rut.value = formatearRut(target.value);
}

async function registrarUsuario() {
  if (!nombre.value.trim()) {
    Swal.fire({ icon: "warning", title: "Nombre requerido" });
    return;
  }

  if (!validarRut(rut.value)) {
    Swal.fire({ icon: "warning", title: "RUT inválido" });
    return;
  }

  if (!validarCorreo(correo.value)) {
    Swal.fire({ icon: "warning", title: "Correo inválido" });
    return;
  }

  if (!validarPassword(password.value)) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña insegura",
      text: "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
    });
    return;
  }

  try {
    const rutLimpio = limpiarRut(rut.value);
    count++;
    await auth.registrar({
      nombre: nombre.value,
      rut: rutLimpio,
      correo: correo.value,
      password: password.value,
    });

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: `Bienvenido, ${auth.nombre}`,
    });

    router.push("/formulario");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al registrar",
      text: error.message,
    });
  }
}
</script>
