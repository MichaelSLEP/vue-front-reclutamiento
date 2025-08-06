<template>
  <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <img src="../assets/vue.svg" alt="Logo" class="h-8 w-auto" />
      <span class="text-xl font-semibold text-gray-700">Trimzales</span>
    </div>

    <!-- Acciones -->
    <div class="flex items-center gap-4">
      <button class="text-gray-500 hover:text-emerald-600 transition">
        <i class="pi pi-bell text-lg"></i>
      </button>
      <button class="text-gray-500 hover:text-emerald-600 transition">
        <i class="pi pi-cog text-lg"></i>
      </button>
      <div class="flex items-center gap-3">
        <img
          src="../assets/vue.svg"
          alt="Perfil"
          class="h-8 w-8 rounded-full object-cover"
        />
        <span class="hidden md:block text-sm font-medium text-gray-700"
          >Robert Fox</span
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No necesitas lógica aún, pero podrías agregar enlaces dinámicos más adelante.
</script>
