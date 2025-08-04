<template>
  <div
    class="bg-white rounded-xl shadow-lg p-6 space-y-4 border-l-4 border-amber-300"
  >
    <div class="flex items-center gap-3">
      <i :class="icon" class="text-xl text-emerald-500"></i>
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();
</script>
