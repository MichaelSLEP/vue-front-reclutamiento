<template>
  <div class="mb-4">
    <label class="block text-sm font-semibold mb-1 text-gray-700">{{
      label
    }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>
