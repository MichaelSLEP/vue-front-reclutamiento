<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-violet-200"
  >
    <Card class="w-96 shadow-lg">
      <template #title>Ingreso</template>
      <template #content>
        <form class="space-y-4">
          <InputText placeholder="Correo electrónico" />
          <Password placeholder="Contraseña" toggleMask />
          <Button label="Ingresar" class="w-full" />
        </form>
      </template>
    </Card>
  </div>
</template>
