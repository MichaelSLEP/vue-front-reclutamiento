<template>
  <main
    class="relative h-screen grid lg:grid-cols-2 bg-surface text-dark font-sans"
  >
    <!-- Sección textual -->
    <section
      class="relative z-20 flex items-center justify-center lg:px-6 lg:py-8 p-10"
    >
      <div class="max-w-2xl w-full space-y-6 fade-in">
        <img
          src="../assets/Logotipo-Chinchorro-web-01.png"
          alt="Logo Chinchorro"
          class="mx-0 mb-8 w-70 h-auto"
        />
        <br />
        <br />
        <h1
          class="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-primary leading-tight tracking-tight"
        >
          SISTEMA DE RECLUTAMIENTO
        </h1>

        <p
          class="text-accent text-[clamp(0.875rem,1.25vw,1.125rem)] font-semibold"
        >
          ¡Te damos la bienvenida!
        </p>

        <p
          class="max-w-prose text-[clamp(0.875rem,1.25vw,1rem)] leading-relaxed text-justify"
        >
          En el Servicio Local de Educación Pública Chinchorro, estamos
          comprometidos con la excelencia educativa de la región de Arica y
          Parinacota. Si deseas ser parte de nuestro equipo, te invitamos a
          unirte a nuestra plataforma.
        </p>

        <h2 class="text-lg text-accent font-semibold">¿Cómo empezar?</h2>

        <ul
          class="max-w-prose list-disc list-inside space-y-3 text-[clamp(0.875rem,1.25vw,1rem)] leading-relaxed text-justify"
        >
          <li>
            Si ya eres parte de nuestra red, inicia sesión para acceder a tu
            perfil y mantener tus datos actualizados. Esto nos permitirá
            contactarte cuando surja una oportunidad que se ajuste a tu perfil.
          </li>
          <li>
            Si es tu primera visita, regístrate para crear tu cuenta y formar
            parte del banco de datos del área de Reclutamiento y Selección.
            Cuando exista una vacante que se adapte a tu perfil, nuestro equipo
            te contactará para iniciar el proceso de selección.
          </li>
        </ul>

        <div class="flex flex-wrap gap-4 pt-2">
          <Button
            label="Iniciar sesión"
            size="small"
            icon="pi pi-sign-in"
            class="bg-primary text-white hover:bg-dark transition-all duration-300"
            aria-label="Acceder al perfil de usuario"
            @click="irAlPerfil('/login')"
          />
          <Button
            label="Registrarse"
            size="small"
            icon="pi pi-user-plus"
            @click="irAlPerfil('/register')"
            :pt="{ root: { class: 'btn-cyan' } }"
            aria-label="Acceder al perfil de usuario"
          />
        </div>
      </div>
    </section>

    <!-- Imagen institucional con gradiente -->
    <aside class="relative h-screen" aria-hidden="true">
      <div
        class="absolute inset-0 z-10 bg-gradient-to-r from-primary/70 via-transparent to-accent/70"
      />
      <img
        src="../assets/banner.jpg"
        alt="Imagen institucional Chinchorro"
        loading="lazy"
        class="h-full w-full object-cover xl:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
      />
    </aside>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function irAlPerfil(URL) {
  router.push(URL);
}
</script>

<style>
.fade-in {
  animation: fadeIn 1.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
