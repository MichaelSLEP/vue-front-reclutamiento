<template>
  <aside
    class="w-72 bg-white border-l border-gray-200 px-4 py-6 flex flex-col gap-4 overflow-y-auto"
  >
    <div
      v-for="doc in documents"
      :key="doc.nombre"
      :class="{
        'bg-green-100 text-green-700': doc.loaded,
        'bg-red-100 text-red-700': !doc.loaded,
      }"
      class="p-3 rounded-md mb-2 text-sm font-medium"
    >
      {{ doc.nombre }} — {{ doc.loaded ? "Completado" : "Pendiente" }}
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  documents: {
    id: number;
    nombre: string;
    loaded: boolean;
  }[];
}>();
</script>
