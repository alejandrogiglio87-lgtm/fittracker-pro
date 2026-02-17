# 💪 FitTracker Pro

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**FitTracker Pro** es una aplicación web moderna para seguimiento de entrenamientos con diseño premium y soporte para entrenamientos en casa y gimnasio.

## ✨ Características

- 🏠 **Dual Mode**: Entrena en casa o en el gimnasio
- 📊 **Estadísticas en Tiempo Real**: Series, ejercicios, progreso y calorías
- ⏱️ **Timestamps**: Registra la hora exacta de cada serie
- 💾 **Persistencia Local**: Guarda tu progreso en localStorage
- 📱 **100% Responsive**: Funciona perfecto en móvil, tablet y desktop
- 🎨 **Diseño Premium**: Glassmorphism, gradientes y animaciones suaves
- 🔥 **23 Ejercicios**: 4 días de rutina completa

## 🚀 Demo en Vivo

**Deploy en Vercel**: [Ver Demo](https://tu-url.vercel.app)

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación ni dependencias

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/fittracker-pro.git

# Entrar al directorio
cd fittracker-pro

# Abrir en el navegador
# Opción 1: Doble click en index.html
# Opción 2: Usar un servidor local
python -m http.server 8000
# Luego visitar: http://localhost:8000
```

## 📦 Deploy en Vercel

### Método 1: Desde GitHub (Recomendado)

1. Subí el proyecto a tu repositorio de GitHub
2. Andá a [vercel.com](https://vercel.com)
3. Click en "New Project"
4. Importá tu repositorio de GitHub
5. Configuración:
   - **Framework Preset**: Other
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío o poner `.`)
6. Click en "Deploy"
7. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### Método 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd fittracker-pro
vercel

# Para producción
vercel --prod
```

### Método 3: Drag & Drop

1. Andá a [vercel.com/new](https://vercel.com/new)
2. Arrastrá la carpeta del proyecto
3. Click en "Deploy"

## 🏋️ Estructura de Entrenamientos

### Día 1 - TORSO
- 🏠 Casa: 7 ejercicios con mancuernas y barra
- 🏢 Gym: 7 ejercicios en máquinas

### Día 2 - PIERNAS
- 🏠 Casa: 4 ejercicios con peso libre
- 🏢 Gym: 5 ejercicios en máquinas

### Día 3 - PUSH
- 🏠 Casa: Ejercicios de empuje

### Día 4 - PULL
- 🏠 Casa: Ejercicios de tracción

## 🎨 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Glassmorphism, gradientes, animaciones
- **JavaScript**: Vanilla JS (sin frameworks)
- **Google Fonts**: Inter

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Personalización

### Cambiar Colores

Editá las variables CSS en `index.html`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gym-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --casa-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### Agregar Ejercicios

Editá el objeto `ejercicios` en el JavaScript:

```javascript
const ejercicios = {
    casa: {
        day1: [
            {
                nombre: 'Tu Ejercicio',
                nombre_en: 'Your Exercise',
                series: 3,
                reps: 12,
                // ...
            }
        ]
    }
}
```

## 📊 Features Avanzadas

- **LocalStorage**: Guarda progreso automáticamente
- **Timestamps**: Registra hora exacta de cada serie
- **Cálculo de Calorías**: Estimación basada en MET values
- **Historial**: Visualiza todos tus entrenamientos pasados
- **Selector Inteligente**: Cambia entre gym/casa dinámicamente

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Creá una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrí un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Imágenes de ejercicios de [GymVisual](https://www.gymvisual.com/)
- Diseño inspirado en apps fitness premium
- Fuente Inter de Google Fonts

## 📝 Changelog

### Version 1.0.0 (2024)
- ✨ Lanzamiento inicial
- 🎨 Diseño premium con glassmorphism
- 🏠 Modo casa y gimnasio
- 📊 Sistema de estadísticas
- 💾 Persistencia local
- 📱 Diseño responsive completo

## 🐛 Reportar Bugs

Encontraste un bug? [Abrí un issue](https://github.com/tu-usuario/fittracker-pro/issues)

## ⭐ Support

Si te gusta el proyecto, dale una estrella ⭐ en GitHub!

---

**Made with 💪 and ❤️**
