# 💰 CashTrackr

## 📋 Descripción del Proyecto

**CashTrackr** es una aplicación web completa de gestión de presupuestos y gastos personales desarrollada como proyecto educativo. Permite a los usuarios crear cuentas, gestionar presupuestos, registrar gastos y obtener insights visuales sobre sus finanzas personales.

## 🎯 Funcionalidades Principales

- ✅ **Autenticación de usuarios** (registro, login, recuperación de contraseña)
- ✅ **Confirmación de cuenta por email**
- ✅ **Gestión de presupuestos** (crear, editar, eliminar)
- ✅ **Registro de gastos** asociados a presupuestos
- ✅ **Dashboard administrativo** con visualización de datos
- ✅ **Perfiles de usuario** editables
- ✅ **API REST completa** con validaciones
- ✅ **Cobertura de pruebas** unitarias e integración

## 🛠️ Tecnologías Utilizadas

### Backend (API REST)

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset tipado de JavaScript
- **PostgreSQL** - Base de datos relacional
- **Sequelize TypeScript** - ORM para bases de datos SQL
- **JWT** - Autenticación basada en tokens
- **bcrypt** - Hashing de contraseñas
- **Nodemailer** - Envío de emails
- **Jest** - Framework de testing
- **Express Validator** - Validación de datos
- **Express Rate Limit** - Limitación de peticiones
- **Winston** - Sistema de logging
- **Morgan** - HTTP request logger

### Frontend (Aplicación Web)

- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Headless UI** - Componentes accesibles sin estilos
- **Heroicons** - Biblioteca de iconos
- **Chakra UI Pin Input** - Componente de entrada PIN
- **React Circular Progressbar** - Gráficos circulares de progreso
- **React Toastify** - Notificaciones toast
- **Zod** - Validación de esquemas
- **Server Actions** - Funciones del servidor de Next.js

### Herramientas de Desarrollo

- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Nodemon** - Recarga automática en desarrollo
- **ts-node** - Ejecución directa de TypeScript
- **Supertest** - Testing de HTTP

## 📁 Estructura del Proyecto

```
CASHTRACKR/
├── cashtrackr_backend/          # API REST en Node.js + TypeScript
│   ├── src/
│   │   ├── config/              # Configuraciones (DB, rate limiting, email)
│   │   ├── controllers/         # Controladores de la API
│   │   ├── middlewares/         # Middlewares (auth, validación, errores)
│   │   ├── models/              # Modelos de Sequelize
│   │   ├── routes/              # Rutas de la API
│   │   ├── utils/               # Utilidades (JWT, auth, tokens)
│   │   ├── emails/              # Templates de emails
│   │   ├── tests/               # Pruebas unitarias e integración
│   │   └── data/                # Scripts de datos
│   └── coverage/                # Reportes de cobertura de pruebas
└── cashtrackr_frontend/         # Aplicación Next.js
    ├── app/                     # App Router de Next.js 14
    │   ├── admin/               # Panel administrativo
    │   ├── auth/                # Páginas de autenticación
    │   └── api/                 # API routes (si las hay)
    ├── components/              # Componentes React reutilizables
    │   ├── admin/               # Componentes del admin
    │   ├── auth/                # Componentes de autenticación
    │   ├── budgets/             # Componentes de presupuestos
    │   ├── expenses/            # Componentes de gastos
    │   ├── profile/             # Componentes de perfil
    │   └── ui/                  # Componentes de UI generales
    ├── actions/                 # Server Actions de Next.js
    └── src/                     # Utilidades y servicios del frontend
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL
- npm o yarn

### Backend

1. **Navegar al directorio del backend:**

   ```bash
   cd cashtrackr_backend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear archivo `.env` con:

   ```env
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/cashtrackr
   JWT_SECRET=tu_jwt_secret_aqui
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_contraseña_de_aplicacion
   FRONTEND_URL=http://localhost:3000
   ```

4. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

5. **Ejecutar pruebas:**
   ```bash
   npm test
   npm run test:coverage
   ```

### Frontend

1. **Navegar al directorio del frontend:**

   ```bash
   cd cashtrackr_frontend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear archivo `.env` con:

   ```env
   API_URL=http://localhost:4000
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

## 📚 Aprendizajes del Curso

### Conceptos Backend

- **Arquitectura MVC** - Separación de responsabilidades
- **API REST** - Diseño de endpoints RESTful
- **Autenticación JWT** - Tokens de acceso y seguridad
- **ORM con Sequelize** - Mapeo objeto-relacional
- **Middleware pattern** - Funciones intermedias en Express
- **Testing** - Pruebas unitarias e integración con Jest
- **Validación de datos** - Express Validator
- **Rate limiting** - Protección contra abuso
- **Hashing de contraseñas** - Seguridad con bcrypt
- **Envío de emails** - Confirmación de cuentas
- **Logging** - Monitoreo y debugging

### Conceptos Frontend

- **Next.js App Router** - Nuevo sistema de rutas
- **Server Actions** - Funciones del servidor
- **React Server Components** - Componentes del servidor
- **TypeScript** - Tipado estático en React
- **Tailwind CSS** - CSS utility-first
- **Gestión de estado** - Estado local de React
- **Validación de formularios** - Zod schemas
- **Componentes reutilizables** - Arquitectura modular
- **Responsive design** - Diseño adaptativo
- **UX/UI patterns** - Patrones de experiencia de usuario

### Conceptos Full-Stack

- **Comunicación Cliente-Servidor** - API consumption
- **Autenticación end-to-end** - JWT flow completo
- **Manejo de errores** - Error boundaries y middleware
- **Despliegue** - Preparación para producción
- **Performance** - Optimización de aplicaciones web
- **Seguridad** - Best practices de seguridad web

## 🔧 Scripts Disponibles

### Backend

- `npm run dev` - Modo desarrollo con recarga automática
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar versión compilada
- `npm test` - Ejecutar pruebas
- `npm run test:coverage` - Pruebas con cobertura
- `npm run test:watch` - Pruebas en modo watch

### Frontend

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm start` - Servidor de producción
- `npm run lint` - Linter de código

## 📄 Licencia

ISC License - Proyecto con fines educativos

## 👨‍💻 Autor

**Rodrigo Flores**

- GitHub: [@rodofla](https://github.com/rodofla)

---

_Proyecto desarrollado como parte de un curso de desarrollo web full-stack con Node.js, TypeScript, React y Next.js_
