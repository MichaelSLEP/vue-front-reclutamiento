// src/utils/validaciones.ts
import { jwtDecode } from "jwt-decode"; // ✅ correcto

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export function validarRut(rut: string): boolean {
  const limpio = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0,
    multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = suma % 11;
  const dvEsperado = resto === 0 ? "0" : resto === 1 ? "K" : String(11 - resto);
  return dv === dvEsperado;
}

export function formatearRut(rut: string): string {
  const limpio = rut.replace(/[^\dkK]/g, "").toUpperCase();
  if (limpio.length < 2) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  const cuerpoFormateado = cuerpo
    .split("")
    .reverse()
    .reduce(
      (acc, char, i) =>
        acc + char + ((i + 1) % 3 === 0 && i + 1 !== cuerpo.length ? "." : ""),
      ""
    )
    .split("")
    .reverse()
    .join("");

  return `${cuerpoFormateado}-${dv}`;
}

export function validarCorreo(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export function validarPassword(pass: string): boolean {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(pass);
}

export function limpiarRut(rut: string): string {
  return rut.replace(/\./g, "").toUpperCase();
}
