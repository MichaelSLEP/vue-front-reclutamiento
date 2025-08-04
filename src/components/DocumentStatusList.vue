<template>
  <aside
    class="w-72 bg-white border-l border-gray-200 px-4 py-6 flex flex-col gap-4 overflow-y-auto"
  >
    <div v-for="doc in documents" :key="doc.id" class="flex items-center gap-3">
      <i
        class="text-xl"
        :class="[
          'pi',
          'pi-file',
          doc.loaded ? 'text-emerald-500' : 'text-gray-400',
          doc.loaded ? '' : 'pi-spin',
        ]"
      />
      <span :class="doc.loaded ? 'text-gray-800' : 'text-gray-400'">
        {{ doc.nombre }}
      </span>
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
