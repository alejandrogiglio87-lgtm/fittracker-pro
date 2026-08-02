# FitTracker Pro — Recap de sesión (para retomar)

> Documento de continuación. Para el detalle técnico profundo, ver **`CLAUDE.md`**.
> Última sesión: hasta el 2 de agosto de 2026.

## 🔗 Accesos rápidos
- **App en vivo (producción):** https://pushgym.vercel.app
- **Repo:** https://github.com/alejandrogiglio87-lgtm/fittracker-pro (branch `main`)
- **Firebase console:** https://console.firebase.google.com/project/fittracker-pro-819b6
- **Estado del repo:** limpio, todo commiteado y desplegado. Último commit: `1346a6f`.

## ▶️ Cómo retomar
```bash
# correr en local
python -m http.server 8000
# abrir http://localhost:8000  (localhost, NO 127.0.0.1)

# desplegar app a producción
git push origin main            # Vercel redeploya solo a pushgym.vercel.app

# desplegar reglas de Firestore (es producción → confirmar antes)
firebase deploy --only firestore:rules --project fittracker-pro-819b6
```
CLIs ya instaladas y logueadas: `gh`, `vercel`, `firebase`. MCP de Firebase configurado.

## ✅ Qué está hecho y funcionando
1. **Editable**: series (+/-), reps y peso por ejercicio (Casa y Gym), persistido.
2. **Login con Google** + gate de autenticación (no se entra sin loguear).
3. **Guardado por usuario en la nube** (Firestore) — todo es privado por usuario.
4. **Seguridad**: reglas Firestore endurecidas, **App Check reCAPTCHA v3 ENFORCED**,
   headers + CSP (en Report-Only).
5. **Gestor de ejercicios ExerciseDB**: agregar / quitar / editar / reemplazar, con
   **traducción al español** (MyMemory) y buscador en español/inglés.
6. **Log de entrenamiento persistente** (guarda reps/peso de cada serie; sobrevive al reset).
7. **Historial** cronológico único (día+lugar+reps+peso) con **borrado de entradas**.
8. **Días editables** por usuario (renombrar, emoji, reordenar, agregar/quitar).
9. **Estadísticas por rango** (7d/30d/3m/todo): calorías/semana, top ejercicios,
   evolución de un ejercicio.
10. **UX**: "última vez" por ejercicio, contador X/Y series, barra Casa/Gym sticky,
    **timer de descanso** (30s–10m), Gym por defecto.
11. **Rediseño visual**: paleta Esmeralda & Océano, tipografía Space Grotesk,
    **login con video** de fondo + animaciones.
12. **PWA**: instalable en el celular + funciona offline (manifest + service worker).
13. **Responsive** (auditado en mobile).

## ⏳ Pendientes inmediatos (chicos)
- **CSP: pasar de Report-Only a enforcing** — usar la app un rato, revisar F12 → Console
  que no haya violaciones de `Content-Security-Policy-Report-Only`, y ahí endurecer en `vercel.json`.
- (Opcional) Reiniciar Claude Code para activar el **MCP de Firebase**.

## 🧭 Mejoras futuras (backlog acordado)
Ver detalle y notas de implementación en **`CLAUDE.md` → sección Roadmap**. Resumen:

**Datos de "entrenador":**
- Volumen por grupo muscular / semana (zona óptima 10–20). *Requiere guardar el músculo en el `log`.*
- PRs + 1RM estimado (Epley/Brzycki) + tendencia de progresión.
- RPE (esfuerzo) + notas por serie/ejercicio.
- Peso corporal + objetivos (gráfico + meta).
- Adherencia: racha + calendario de actividad (heatmap).
- Balance empuje/tirón y tren sup/inf; alertas "hace N días que no entrenás X".

**Técnicas:**
- Reordenar ejercicios dentro del día · Export/import de datos · Sync con merge (multi-device)
  · Archivar/paginar el `log` si crece · Firestore offline persistence.

## ⚠️ Cosas para tener en cuenta (gotchas)
- URL de producción real = **pushgym.vercel.app** (`fittracker-pro.vercel.app` y
  `workgym.vercel.app` son OTROS proyectos del usuario).
- En local, App Check usa un **debug token** ya registrado; si se rompe el sync en localhost,
  revisar ese token en App Check → Manage debug tokens.
- El `setDoc` **sobrescribe el doc entero** (last-write-wins): dos dispositivos a la vez se pisan.
- En `collectState`, `ft-days` se chequea **antes** de `ft-day*` (colisión de prefijo).
- Validar cambios sin navegador: `new Function()` por bloque `<script>` + `node --check` del módulo.
