<template>
  <section
    class="bg-white rounded-xl shadow-2xl p-8 border border-gray-200 space-y-6"
  >
    <div v-if="title || icon" class="flex items-center gap-3 mb-4">
      <i v-if="icon" :class="icon" class="text-xl text-emerald-500"></i>
      <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    </div>

    <slot />

    <div v-if="$slots.footer" class="pt-6">
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  icon?: string;
}>();
</script>
