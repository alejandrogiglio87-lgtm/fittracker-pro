# 🚀 Guía de Deployment

## 📦 Deploy en Vercel (Recomendado)

### Opción 1: Desde GitHub

1. **Subir a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/fittracker-pro.git
git push -u origin main
```

2. **Deploy en Vercel:**
   - Andá a [vercel.com](https://vercel.com)
   - Click "New Project"
   - Importá tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración
   - Click "Deploy"
   - ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción 3: Drag & Drop

1. Andá a [vercel.com/new](https://vercel.com/new)
2. Arrastrá la carpeta `fittracker-pro`
3. Click "Deploy"

---

## 🐙 Subir a GitHub

```bash
# Navegar al proyecto
cd fittracker-pro

# Inicializar git
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "FitTracker Pro v1.0.0"

# Crear rama main
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/TU-USUARIO/fittracker-pro.git

# Push
git push -u origin main
```

---

## 🌐 Deploy en Netlify

### Desde GitHub:
1. Conectá tu repo de GitHub en [netlify.com](https://netlify.com)
2. Build settings:
   - Build command: (vacío)
   - Publish directory: `.`
3. Deploy

### Drag & Drop:
1. Andá a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastrá la carpeta `fittracker-pro`
3. ¡Listo!

---

## 🔧 Configuración Personalizada

### Variables de Entorno (si las necesitás en el futuro)

Creá un archivo `.env.local`:
```
NEXT_PUBLIC_API_URL=tu-api-url
```

---

## ✅ Checklist Pre-Deploy

- [ ] Probá localmente: `python -m http.server 8000`
- [ ] Verificá que todas las imágenes cargan
- [ ] Probá en móvil (responsive)
- [ ] Revisá la consola del navegador (F12) por errores
- [ ] Actualizá el README.md con tu info
- [ ] Probá el selector Gym/Casa
- [ ] Verificá que las series se guardan

---

## 📱 Dominio Personalizado

### En Vercel:
1. Settings → Domains
2. Agregar dominio custom
3. Configurar DNS

### En Netlify:
1. Domain settings → Add custom domain
2. Seguir instrucciones DNS

---

## 🔄 Actualizaciones

```bash
# Hacer cambios
git add .
git commit -m "Descripción de cambios"
git push

# Vercel y Netlify deployean automáticamente
```

---

## 🆘 Troubleshooting

**Problema:** Imágenes no cargan
- Verificá que la carpeta `workout/` está en el mismo nivel que `index.html`

**Problema:** JavaScript no funciona
- Verificá que `exercises-data.js` se carga correctamente
- Abrí la consola (F12) para ver errores

**Problema:** LocalStorage no guarda
- Verificá que estés usando HTTPS o localhost
- Algunos navegadores bloquean localStorage en HTTP

---

## 📊 Analytics (Opcional)

Podés agregar Google Analytics editando el `index.html`:

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
  ...
</head>
```

---

¡Listo para deployar! 🚀
