# 🏟️ Backend - Reservas de Canchas de Fútbol

Backend completo con Node.js + Express + MongoDB Atlas + JWT + Google Calendar API.

---

## 📁 Estructura del proyecto

```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js                  # Conexión a MongoDB Atlas
│   │   └── env.js                 # Variables de entorno
│   │
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, Google OAuth2
│   │   ├── userController.js      # CRUD usuarios (admin)
│   │   ├── canchaController.js    # CRUD canchas
│   │   ├── productoController.js  # CRUD productos
│   │   └── reservaController.js   # CRUD reservas + validación horario
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Cancha.js
│   │   ├── Producto.js
│   │   └── Reserva.js
│   │
│   ├── routes/
│   │   ├── index.js               # Router principal
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── canchaRoutes.js
│   │   ├── productoRoutes.js
│   │   └── reservaRoutes.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js      # Verificación JWT
│   │   └── adminMiddleware.js     # Verificación rol admin
│   │
│   ├── services/
│   │   ├── userService.js
│   │   ├── canchaService.js
│   │   ├── productoService.js
│   │   ├── reservaService.js
│   │   └── googleCalendarService.js
│   │
│   ├── app.js                     # Configuración Express
│   └── index.js                   # Entry point
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Instalación y uso

### 1. Clonar e instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/canchas
JWT_SECRET=un_secreto_muy_seguro_aqui

FRONT_URL=http://localhost:5173

# Google Calendar (opcional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### 3. Ejecutar

```bash
# Producción
npm start

# Desarrollo con hot-reload
npm run dev
```

---

## 📡 Endpoints

### AUTH
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login → devuelve JWT |
| GET | `/api/auth/google` | Redirige a Google para vincular Calendar |
| GET | `/api/auth/google/callback` | Callback de Google OAuth2 |

### USUARIOS (solo admin)
| Método | Ruta |
|--------|------|
| GET | `/api/users` |
| GET | `/api/users/:id` |
| DELETE | `/api/users/:id` |

### CANCHAS
| Método | Ruta | Auth |
|--------|------|------|
| GET | `/api/canchas` | Pública |
| GET | `/api/canchas/:id` | Pública |
| POST | `/api/canchas` | Admin |
| PUT | `/api/canchas/:id` | Admin |
| DELETE | `/api/canchas/:id` | Admin |

### PRODUCTOS
| Método | Ruta | Auth |
|--------|------|------|
| GET | `/api/productos` | Pública |
| GET | `/api/productos/:id` | Pública |
| POST | `/api/productos` | Admin |
| PUT | `/api/productos/:id` | Admin |
| DELETE | `/api/productos/:id` | Admin |

### RESERVAS (requieren JWT)
| Método | Ruta |
|--------|------|
| POST | `/api/reservas` |
| GET | `/api/reservas` |
| GET | `/api/reservas/:id` |
| DELETE | `/api/reservas/:id` |

---

## 🔐 Autenticación

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

---

## 📅 Google Calendar

### Flujo para vincular el calendario:

1. El usuario hace login → obtiene JWT
2. El frontend redirige a `GET /api/auth/google?userId=<id>`
3. El usuario autoriza en Google
4. Google llama al callback con el código
5. Los tokens quedan guardados en el documento del usuario en MongoDB
6. En la siguiente reserva, el evento se crea automáticamente en su Google Calendar

---

## 📋 Ejemplo de body para crear reserva

```json
POST /api/reservas
Authorization: Bearer <token>

{
  "canchaId": "663abc123...",
  "fecha": "2025-06-15",
  "horaInicio": "10:00",
  "horaFin": "11:00"
}
```

Si ya hay una reserva en ese horario, la API responde:

```json
{
  "success": false,
  "message": "La cancha ya tiene una reserva en ese horario. Elegí otro turno."
}
```
