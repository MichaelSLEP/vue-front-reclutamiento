<template>
  <div class="relative min-h-[40rem] lg:min-h-0 flex lg:flex-row flex-col">
    <div
      class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal h-full flex-1"
    >
      <div class="relative flex-1 z-20 flex items-center justify-center">
        <div class="flex items-center justify-center h-full">
          <div
            class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-4 text-center lg:text-left"
          >
            <img
              src=""
              alt="Logo"
              srcset="../assets/Logotipo-Chinchorro-web-01.png"
              class="h-auto mb-8 mx-auto lg:mx-0"
            />
            <h1
              class="text-4xl font-bold text-white-600 md:text-zinc-900 pt-8 mb-6 !leading-tight"
            >
              <span class="font-bold text-5xl text-primary mb-8"
                >SISTEMA DE RECLUTAMIENTO</span
              >
            </h1>

            <p class="font-bold -surface-900 text-3xl mb-8">Bienvenid@</p>

            <p
              class="text-surface-0/90 indent-8 text-justify text-xl leading-normal mb-8 max-w-xl lg:max-w-none"
            >
              En el Servicio Local de Educación Pública Chinchorro, estamos
              comprometidos con la excelencia educativa de la región de Arica y
              Parinacota. Si deseas ser parte de nuestro equipo y contribuir al
              futuro de nuestras comunidades educativas, te invitamos a unirte a
              nuestra plataforma.
            </p>

            <p class="font-bold -surface-900 text-3xl mb-8">¿Cómo empezar?</p>

            <ul class="list-disc list-inside text-left text-xl mb-8">
              <li class="mb-2 text-justify">
                Si ya eres parte de nuestra red, inicia sesión para acceder a tu
                perfil y postular a nuevas oportunidades.
              </li>
              <li class="mb-2 text-justify">
                Si es tu primera visita, regístrate para crear tu cuenta y
                postular a los cargos disponibles.
              </li>
            </ul>
            <div
              class="flex items-center gap-4 justify-center lg:justify-start"
            >
              <Button label="INICIAR SESIÓN" type="button" />
              <Button label="REGISTRARSE" type="button" outlined />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute lg:relative inset-0 lg:inset-auto flex-1">
        <div
          class="absolute lg:hidden inset-0 bg-surface-900/60 dark:bg-surface-900/80 z-10"
        />
        <img
          src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-1.png"
          alt="hero-1"
          class="h-full w-full object-cover xl:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
//import Button from "primevue/button";
</script>
