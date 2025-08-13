import { defineStore } from "pinia";
import { loginUsuario, registrarUsuario } from "../services/authservice";

interface Usuario {
  id: number | null;
  usuario: string;
  token: string;
  nombre: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      id: null,
      usuario: "",
      token: "",
      nombre: "",
      email: "",
    } as Usuario,
  }),

  getters: {
    getNombreUsuario(state): string {
      return state.user.nombre || state.user.usuario;
    },
  },

  actions: {
    async login(payload: { usuario: string; password: string }) {
      const res = await loginUsuario(payload);
      this.user = {
        id: res.user.id,
        nombre: res.user.nombre,
        usuario: res.user.usuario,
        email: res.user.correo,
        token: res.token,
      };
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

      this.user = {
        id: res.user.id,
        nombre: res.user.nombre,
        usuario: res.user.usuario,
        email: res.user.correo,
        token: res.token,
      };
    },

    logout() {
      this.user = {
        id: null,
        usuario: "",
        token: "",
        nombre: "",
        email: "",
      };
      localStorage.removeItem("auth");
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
