// src/stores/authStore.ts
import { defineStore } from "pinia";
import { loginUsuario, registrarUsuario } from "../services/authservice";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const userDataStore = ref({
    usuario: "",
    token: "",
    nombre: "",
    email: "",
  });

  async function login(payload: { usuario: string; password: string }) {
    const res = await loginUsuario(payload);
    console.log("res_LOGIN", res.user);

    userDataStore.value.usuario = payload.usuario;
    userDataStore.value.token = res.token;
    userDataStore.value.nombre = res.user.nombre;
    userDataStore.value.email = res.user.correo;

    localStorage.setItem("token", res.token);
    localStorage.setItem("usuario", payload.usuario);
    localStorage.setItem("nombre", res.user.nombre);
    /*localStorage.setItem("email", res.email); */
  }

  async function logout() {
    userDataStore.value.usuario = "";
    userDataStore.value.token = "";
    userDataStore.value.nombre = "";
    userDataStore.value.email = "";
    localStorage.clear();
  }

  async function cargarDesdeStorage() {
    userDataStore.value.usuario = localStorage.getItem("usuario") || "";
    userDataStore.value.token = localStorage.getItem("token") || "";
    userDataStore.value.nombre = localStorage.getItem("nombre") || "";
    /* this.email = localStorage.getItem("email"); */
  }

  async function registrar(payload: {
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
    userDataStore.value.token = res.token;
    userDataStore.value.nombre = res.user.nombre;
    userDataStore.value.email = res.user.correo;
    userDataStore.value.usuario = res.user.usuario;

    console.log("userDataStore.nombre store", userDataStore.value.nombre);
  }

  return {
    userDataStore,
    login,
    logout,
    cargarDesdeStorage,
    registrar,
  };
});
