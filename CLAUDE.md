# FitTracker Pro — guía para continuar el proyecto

App web de seguimiento de entrenamientos (Gym & Casa). **Estática**, sin build ni
framework: todo el HTML/CSS/JS vive en `index.html`.

## Stack e infraestructura
- **Frontend**: `index.html` (todo inline), `exercises-data.js` (catálogo base de ejercicios),
  `firebase-config.js` (config pública de Firebase + `APPCHECK_SITE_KEY`).
- **Backend**: Firebase — proyecto **`fittracker-pro-819b6`** (Auth con Google + Firestore).
- **Hosting**: Vercel — proyecto `fittracker-pro` (team `alejandro-giglios-projects`).
  - **URL producción real: https://pushgym.vercel.app** (deploy automático al pushear a `main`).
  - ⚠️ Ojo: `fittracker-pro.vercel.app` y `workgym.vercel.app` son OTROS proyectos del usuario.
- **Repo GitHub**: `alejandrogiglio87-lgtm/fittracker-pro` (branch `main`).
- **PWA**: `manifest.webmanifest` + `sw.js` (service worker, network-first) + `icon.svg`.
- **APIs externas** (todas gratis, sin key, con CORS): ExerciseDB `oss.exercisedb.dev`,
  traducción `api.mymemory.translated.net`, video del login `assets.mixkit.co`.

## Cómo correr en local
```
python -m http.server 8000
```
Abrir **http://localhost:8000** (NO `127.0.0.1` — Firebase authorized domains usa `localhost`).
En localhost, App Check usa un **debug token** (`window.FIREBASE_APPCHECK_DEBUG_TOKEN=true`);
se registra en Firebase Console → App Check → Manage debug tokens.

## Herramientas (ya instaladas y logueadas)
- `gh` (GitHub CLI), `vercel` CLI, `firebase-tools` CLI. No hay MCP de GitHub/Vercel;
  sí está configurado el **MCP de Firebase** en `.mcp.json` (gitignored) — requiere reiniciar.
- En la shell bash de `!`, las CLIs pueden no estar en PATH (usar ruta de `AppData/Roaming/npm`).

## Deploy
- **App** (frontend): `git push origin main` → Vercel redeploya a `pushgym.vercel.app`.
- **Reglas Firestore**: `firebase deploy --only firestore:rules --project fittracker-pro-819b6`
  (requiere `firebase login`; es PRODUCCIÓN → pedir OK explícito al usuario).
- **Verificar prod**: `vercel projects ls` (columna *Latest Production URL*).

## Modelo de datos (Firestore `users/{uid}`)
Un documento por usuario. `localStorage` espeja todo con claves `ft-*`.
`collectState()` arma el doc y `pullState()` lo baja; `setDoc` **sobrescribe entero**
(last-write-wins) con debounce de 800ms vía `scheduleSync()`.

| Campo | Contenido |
|---|---|
| `cfg` | mapa `ft-cfg-{day}-{loc}-{id}` → `{series, reps, peso}` |
| `sets` | mapa `ft-{day}-{loc}-{ex}-{set}` → JSON `{t, reps, peso, cal, logId}` (o ISO legacy) |
| `custom` | mapa `ft-custom-{day}-{loc}` → `{added[], removed[], edits{}}` (overrides de ExerciseDB) |
| `log` | array permanente `{id, exId, exName, day, loc, set, t, reps, peso, cal}` — **NO se borra en reset**, base de historial y estadísticas, tope 5000 |
| `days` | array de días editables `{id, nombre, emoji}` |

- **Ejercicios**: `exercisesData` (estático, compartido) + overrides por usuario =
  `getEffectiveExercises(day, loc)`. Los días base son `day1..day4`; días nuevos usan id `d<random>`.
- ⚠️ En `collectState`, chequear `ft-days` **antes** de `ft-day*` (colisión de prefijo).

## Seguridad
- **App Check reCAPTCHA v3 ENFORCED** en Firestore (site key en `firebase-config.js`, secret solo en Firebase).
- `firestore.rules`: cada uid solo su doc; `hasOnly(cfg,sets,custom,log,days)` con topes de tamaño.
- `vercel.json`: headers de seguridad + **CSP en modo Report-Only** (pendiente: pasar a enforcing).

## Convenciones
- Todo inline en `index.html`: un `<script>` clásico (app) + un `<script type="module">` (Firebase) + un `<script>` de registro del SW.
- **Validar sintaxis** sin navegador:
  - Bloques clásicos: `node -e` iterando `/<script>([\s\S]*?)<\/script>/g` con `new Function(...)`.
  - Módulo ESM: extraer a `.mjs` y `node --check`.
  - Lógica pura: tests en Node con `localStorage` mockeado.
- **Paleta** Esmeralda & Océano: sky `#0ea5e9`, emerald `#10b981`, casa azul/cyan, gym esmeralda,
  fondo `#0b1220`, éxito `#22c55e`. Fuentes: **Space Grotesk** (títulos) + **Inter** (cuerpo).

## Estado actual (hecho)
Series/reps/peso editables · login Google + gate · guardado por usuario en la nube ·
progreso/stats/celebración · seguridad (reglas + App Check + headers/CSP) · gestor de ejercicios
ExerciseDB (agregar/quitar/editar + traducción es) · log persistente · historial cronológico con
borrado · días editables · estadísticas por rango (calorías/semana, top ejercicios, evolución) ·
"última vez" por ejercicio · contador X/Y series · barra Casa/Gym sticky · timer de descanso ·
rediseño visual + login con video · PWA instalable + offline · responsive.

## 🧭 Mejoras futuras (roadmap)

### Datos de "entrenador" (alto valor)
- **Volumen por grupo muscular / semana** 👑: series efectivas por músculo (zona óptima 10–20).
  Usa `targetMuscles`/`bodyParts` de ExerciseDB. **Requiere guardar el músculo en cada entrada del
  `log`** (para ejercicios de ExerciseDB ya está disponible; a los ejercicios base `day1..4` hay
  que mapearles el grupo muscular).
- **Récords personales (PR) + 1RM estimado** por ejercicio (fórmula Epley/Brzycki con reps+peso) y
  tendencia de progresión (¿mejora o meseta?). Fácil: los datos ya están en el `log`.
- **RPE (esfuerzo percibido)** por serie/ejercicio + **notas** (sensaciones/técnica).
- **Peso corporal + objetivos** (tracker con gráfico y meta).
- **Adherencia**: racha de entrenamientos + calendario de actividad (heatmap tipo GitHub).
- **Balance** empuje/tirón y tren superior/inferior.
- **Recuperación / alertas**: "no entrenás pecho hace N días".

### Técnicas / otras
- Pasar **CSP de Report-Only a enforcing** (tras confirmar que no hay violaciones en consola).
- **Reordenar ejercicios** dentro del día (drag o ▲▼).
- **Export/import** de datos del usuario (backup/JSON).
- Sync con **merge** en vez de last-write-wins (evitar pisadas entre dispositivos/pestañas).
- **Archivar/paginar el `log`** si supera el tope de 5000 (o el límite de 1MB del doc).
- Considerar habilitar **Firestore offline persistence** para mejor experiencia sin señal.

### Nota de arquitectura para lo de "por músculo"
Enriquecer `edbToExercise()` y el `log` con `muscle`/`bodyPart`. Para los ejercicios base, agregar
un campo de músculo en `exercisesData` o una tabla de mapeo por id. Con eso, agregar en la sección
de Estadísticas un gráfico de series por músculo/semana.
