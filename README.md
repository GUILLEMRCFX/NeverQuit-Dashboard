# NeverQuit Dashboard

Dashboard de gestión de cuentas de trading en prop firms (FTMO, Alpha Capital, Orion, etc.)

---

## Estructura de Ramas (Git Flow)

Este proyecto usa un flujo de trabajo profesional con 3 tipos de ramas:

```
main        → Producción. Siempre estable. Nunca se toca directamente.
develop     → Desarrollo. Aquí se integran cambios antes de subir a main.
feature/*   → Funcionalidades nuevas. Se crean desde develop y se mergean a develop.
fix/*       → Correcciones de bugs. Se crean desde develop (o main si es urgente).
```

### Flujo visual

```
main ──────────────────────────────────────────► (siempre estable)
        ▲                           ▲
        │  merge cuando está listo  │
develop ─────────────────────────────────────►
        ▲           ▲
        │  merge     │  merge
feature/x ──►   fix/y ──►
```

---

## Configuración inicial del repositorio

> Ejecutar solo una vez, desde tu máquina local.

```bash
# 1. Clonar el repositorio
git clone https://github.com/GUILLEMRCFX/NeverQuit-Dashboard.git
cd NeverQuit-Dashboard

# 2. Crear la rama develop desde main
git checkout main
git checkout -b develop
git push -u origin develop

# 3. Verificar que tienes las dos ramas principales
git branch -a
```

---

## Flujo de trabajo diario

### Cuando quieres hacer un cambio o añadir algo nuevo:

```bash
# 1. Asegúrate de estar en develop actualizado
git checkout develop
git pull origin develop

# 2. Crea una rama para tu cambio
git checkout -b feature/nombre-descriptivo
# Ejemplos:
# git checkout -b feature/exportar-json
# git checkout -b feature/nueva-prop-firm-ftmo
# git checkout -b fix/calculo-roi

# 3. Haz tus cambios en el código...

# 4. Guarda los cambios
git add .
git commit -m "feat: descripción del cambio"

# 5. Sube tu rama
git push -u origin feature/nombre-descriptivo
```

### Cuando el cambio está listo y probado:

```bash
# Mergear a develop
git checkout develop
git merge feature/nombre-descriptivo
git push origin develop

# Eliminar la rama de feature (ya no hace falta)
git branch -d feature/nombre-descriptivo
git push origin --delete feature/nombre-descriptivo
```

### Cuando develop está estable y quieres publicar a producción:

```bash
git checkout main
git merge develop
git push origin main

# Opcionalmente, crear un tag de versión
git tag -a v1.1.0 -m "Versión 1.1.0 - descripción de cambios"
git push origin v1.1.0
```

---

## Convención de nombres de commits

Usa prefijos para identificar el tipo de cambio:

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de diseño/CSS |
| `refactor:` | Reorganización de código (sin cambiar funcionalidad) |
| `docs:` | Documentación |
| `chore:` | Tareas de mantenimiento |

**Ejemplos:**
```
feat: añadir exportación de datos a JSON
fix: corregir cálculo de ROI cuando no hay payouts
style: mejorar diseño del tab CEO View
docs: actualizar README con instrucciones de deploy
```

---

## Protección de la rama main en GitHub

Para evitar cambios accidentales en producción, configura estas protecciones en GitHub:

1. Ve a tu repositorio → **Settings** → **Branches**
2. Click en **Add branch protection rule**
3. Branch name pattern: `main`
4. Activa:
   - **Require a pull request before merging** ✅
   - **Require approvals** (1 aprobación mínimo) ✅ *(si trabajas en equipo)*
   - **Do not allow bypassing the above settings** ✅

Esto hace que nadie pueda hacer push directo a `main` — todo tiene que pasar por un Pull Request.

---

## Estructura del proyecto

```
NeverQuit-Dashboard/
├── index.html              ← Aplicación principal (HTML + CSS + JS)
├── never-quit-dashboard-v3.html  ← Backup de versión anterior
└── README.md               ← Este archivo
```

---

## Stack técnico

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Gráficos:** Chart.js (via CDN)
- **Datos:** Browser localStorage
- **Fuentes:** Google Fonts - Inter

---

## Acceso

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | Administrador |
| demo | demo123 | Demo / Solo lectura |

> ⚠️ Cambiar las credenciales antes de hacer el proyecto público.
