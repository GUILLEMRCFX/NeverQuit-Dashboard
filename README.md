# NeverQuit Dashboard

Dashboard de gestión de cuentas de trading en prop firms (FTMO, Alpha Capital, Orion, etc.)

> ⚠️ **Estado actual:** Proyecto en desarrollo activo. Migración a Supabase en progreso.

---

## 📋 Descripción

NeverQuit Dashboard es una aplicación web personal para centralizar y visualizar el seguimiento de cuentas de trading en distintas prop firms. Permite registrar cuentas, resultados, payouts y métricas clave desde una sola interfaz.

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Gráficos | [Chart.js](https://www.chartjs.org/) via CDN |
| Fuentes | Google Fonts – Inter |
| Auth | Supabase Auth *(en integración)* |
| Base de datos | Supabase (PostgreSQL) *(en integración)* |
| Almacenamiento temporal | Browser localStorage *(siendo reemplazado)* |

---

## 📁 Estructura del proyecto

```
NeverQuit-Dashboard/
├── index.html                      ← Aplicación principal (HTML + CSS + JS)
├── never-quit-dashboard-CLEAN.html ← Versión limpia de referencia
├── auth.js                         ← Lógica de autenticación (Supabase)
├── logo.png                        ← Logo del proyecto
└── README.md                       ← Este archivo
```

---

## 🚀 Instrucciones de instalación

> Al ser un proyecto frontend sin bundler, no hay dependencias que instalar. Solo necesitas un navegador y (opcionalmente) un servidor local.

### 1. Clonar el repositorio

```bash
git clone https://github.com/GUILLEMRCFX/NeverQuit-Dashboard.git
cd NeverQuit-Dashboard
```

### 2. Configurar variables de entorno (Supabase)

Crea un archivo `.env` o define directamente en `auth.js` tus credenciales de Supabase:

```js
const SUPABASE_URL = "https://xxxx.supabase.co"
const SUPABASE_ANON_KEY = "your-anon-key"
```

> ⚠️ Nunca subas claves reales al repositorio. Añade `.env` a tu `.gitignore`.

### 3. Abrir la aplicación

Puedes abrirla directamente en el navegador:

```bash
open index.html
```

O usar un servidor local (recomendado para evitar problemas de CORS con Supabase):

```bash
# Con VS Code: instala la extensión Live Server y haz click en "Go Live"
# Con Python:
python -m http.server 8080
```

---

## 🔐 Variables de entorno / Configuración

| Variable | Descripción |
|----------|-------------|
| `SUPABASE_URL` | URL de tu proyecto en Supabase |
| `SUPABASE_ANON_KEY` | Clave anon pública de Supabase |

> Las credenciales de usuario admin se gestionan desde el panel de Supabase Auth. No deben estar hardcodeadas en el código.

---

## 🌿 Git Flow / Estructura de ramas

```
main      → Producción. Siempre estable.
develop   → Desarrollo. Aquí se integran los cambios antes de pasar a main.
feature/* → Nuevas funcionalidades (se crean desde develop).
fix/*     → Correcciones de bugs (se crean desde develop).
```

### Flujo diario

```bash
# 1. Partir siempre desde develop actualizado
git checkout develop
git pull origin develop

# 2. Crear rama para el cambio
git checkout -b feature/nombre-descriptivo

# 3. Hacer cambios, commit y subir
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/nombre-descriptivo

# 4. Mergear a develop cuando esté listo
git checkout develop
git merge feature/nombre-descriptivo
git push origin develop

# 5. Cuando develop esté estable, mergear a main
git checkout main
git merge develop
git push origin main
```

### Convención de commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de diseño/CSS |
| `refactor:` | Reorganización de código |
| `docs:` | Documentación |
| `chore:` | Mantenimiento |

---

## 📸 Capturas de pantalla

> *Próximamente — añadir imágenes de la interfaz aquí.*

```markdown
![Dashboard principal](screenshots/dashboard.png)
![Vista CEO](screenshots/ceo-view.png)
```

---

## 🗺️ Roadmap

- [x] MVP con localStorage
- [x] Sistema de autenticación básico
- [ ] Migración completa a Supabase
- [ ] Persistencia de datos en la nube
- [ ] Multi-dispositivo sincronizado
- [ ] Deploy en producción (Netlify / Vercel)

---

## 👤 Autor

**GUILLEMRCFX** — Proyecto personal de trading dashboard.
