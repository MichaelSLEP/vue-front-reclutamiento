// src/stores/authStore.ts
import { defineStore } from "pinia";
import { loginUsuario, registrarUsuario } from "../services/authservice";

interface AuthState {
  usuario: string | null;
  token: string | null;
  nombre: string | null;
  email: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    usuario: null,
    token: null,
    nombre: null,
    email: null,
  }),
  actions: {
    async login(payload: { usuario: string; password: string }) {
      const res = await loginUsuario(payload);
      console.log("res", res);

      this.usuario = payload.usuario;
      this.token = res.token;
      this.nombre = res.user.nombre;
      this.email = res.user.correo;

      localStorage.setItem("token", res.token);
      localStorage.setItem("usuario", payload.usuario);
      localStorage.setItem("nombre", res.user.nombre);
      /*localStorage.setItem("email", res.email); */
    },
    logout() {
      this.usuario = null;
      this.token = null;
      this.nombre = null;
      this.email = null;
      localStorage.clear();
    },
    cargarDesdeStorage() {
      this.usuario = localStorage.getItem("usuario");
      this.token = localStorage.getItem("token");
      this.nombre = localStorage.getItem("nombre");
      /* this.email = localStorage.getItem("email"); */
    },
    async registrar(payload: {
      nombre: string;
      rut: string;
      correo: string;
      password: string;
    }) {
      const res = await registrarUsuario({
        usuario: payload.rut,
        nombre: payload.nombre,
        email: payload.correo,
        password: payload.password,
      });
      this.token = res.token;
      this.nombre = res.user.nombre;
      this.email = res.user.correo;
      this.usuario = res.user.usuario;

      console.log("res.nombre", res.user.nombre);
      console.log("this.nombre", this.nombre);
    },
  },
});
