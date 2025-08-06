<template>
  <Dialog
    header="Términos y Condiciones"
    v-model:visible="visible"
    modal
    :style="{ width: '90vw', maxWidth: '700px' }"
    class="rounded-xl p-4"
  >
    <div
      class="text-surface-700 dark:text-surface-200 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2"
    >
      <p>
        Al crear una cuenta en el Sistema de Reclutamiento del SLEP Chinchorro,
        usted acepta los siguientes términos y condiciones:
      </p>
      <ul class="list-disc ml-5 space-y-2">
        <li>
          <strong>Uso Responsable:</strong> El sistema debe ser utilizado
          únicamente con fines legítimos relacionados con procesos de
          reclutamiento institucional.
        </li>
        <li>
          <strong>Protección de Datos:</strong> La información será tratada
          conforme a la Ley N°19.628 sobre Protección de la Vida Privada.
        </li>
        <li>
          <strong>Autenticidad:</strong> El usuario declara que los antecedentes
          entregados son verídicos y actualizados.
        </li>
        <li>
          <strong>Seguridad:</strong> Mantener la confidencialidad de su
          contraseña es su responsabilidad.
        </li>
        <li>
          <strong>Modificaciones:</strong> El SLEP puede modificar estos
          términos previa comunicación.
        </li>
        <li>
          <strong>Propiedad:</strong> El contenido y diseño están protegidos por
          derechos institucionales.
        </li>
        <li>
          <strong>Soporte:</strong> Para dudas o solicitudes, contactar a
          <a class="text-primary hover:text-primary-emphasis"
            >reclutamiento@chinchorro.cl</a
          >.
        </li>
      </ul>
    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const emit = defineEmits(["update:visible"]);
const cerrarModal = () => {
  visible.value = false;
  emit("update:visible", false);
};
</script>
<style scoped>
/* Estilos personalizados para el modal */
</style>
