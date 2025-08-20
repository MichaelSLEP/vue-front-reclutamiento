import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FormularioView from "../views/FormularioView.vue";
import StarterView from "../views/StarterView.vue";
import { useAuthStore } from "../store/authStore";
import { isTokenExpired } from "../utils/validaciones";

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
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (
    to.meta.requiresAuth &&
    (!auth.user.token || isTokenExpired(auth.user.token))
  ) {
    auth.logout();
    next("/login");
  } else {
    next();
  }
});
