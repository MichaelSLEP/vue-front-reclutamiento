// src/services/authService.js
const API_BASE = "http://localhost:8000/api/auth";

export async function registrarUsuario(datos: {
  usuario: string;
  nombre: string;
  password: string;
  email: string;
}) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrar");
  }

  return await res.json();
}

export async function loginUsuario(datos: {
  usuario: string;
  password: string;
}) {
  console.log("Datos de login:", datos);

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Credenciales inválidas");
  }

  return await res.json();
}
