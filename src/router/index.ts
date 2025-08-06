import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FormularioView from "../views/FormularioView.vue";
import FormularioOldView from "../views/FormOldView.vue";
import StarterView from "../views/StarterView.vue";

const routes = [
  {
    path: "/",
    name: "starter",
    component: StarterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/formulario",
    name: "formulario",
    component: FormularioView,
  },
  {
    path: "/formulario2",
    name: "formulario2",
    component: FormularioOldView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
