<template>
  <Card>
    <template #title>
      <div class="text-lg font-bold text-blue-700">{{ title }}</div>
    </template>
    <template #content>
      <div class="space-y-4">
        <slot />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
