# 🖥️ Arquitectura del Frontend

El frontend del sistema de marcador de baloncesto está diseñado como una **Single Page Application (SPA)** desarrollada en **Angular**, con una arquitectura modular, escalable y orientada a componentes reutilizables.

Su objetivo es ofrecer una **interfaz moderna, responsiva y dinámica** que permita a los usuarios interactuar con las funcionalidades del sistema —gestión de equipos, jugadores, partidos y reportería— de manera fluida y segura.

---

## 🎯 Objetivos del Frontend

- Proporcionar una interfaz atractiva, intuitiva y consistente con la temática del baloncesto.  
- Permitir la autenticación de usuarios y el acceso a las funcionalidades según su rol.  
- Mostrar los datos provenientes de los microservicios del backend (vía API REST).  
- Generar una buena experiencia de usuario (UX) mediante animaciones, alertas y componentes dinámicos.  
- Permitir la descarga de reportes PDF generados por el backend.

---

## 🧩 Estructura General del Proyecto

El frontend se encuentra desarrollado en **Angular 17+**, usando **TypeScript**, **HTML5**, **SCSS** y **Bootstrap** como base de estilos.  
La estructura se organiza de forma modular para mantener la mantenibilidad y escalabilidad del sistema.

### Estructura de carpetas principal:

src/
├── app/
│ ├── core/ # Servicios, interceptores y guards de seguridad
│ ├── features/ # Módulos funcionales (auth, equipos, jugadores, marcador, reportería)
│ ├── shared/ # Componentes y utilidades reutilizables
│ ├── app.component.* # Componente raíz
│ ├── app.routes.ts # Definición de rutas
│ └── app.config.ts # Configuración general
├── assets/ # Imágenes, íconos y logotipos del sistema
└── styles.scss # Estilos globales 


---

## 🧠 Arquitectura de Componentes

El frontend sigue el patrón **Smart & Dumb Components**:

- **Smart Components (contenedores):** manejan la lógica de negocio, obtienen datos del backend y coordinan los componentes hijos.  
- **Dumb Components (presentacionales):** se encargan únicamente de la presentación (HTML y SCSS) y la interacción visual.


---

## 🔒 Seguridad y Navegación

El sistema implementa autenticación y control de acceso directamente en el frontend:

- **authGuard:** impide el acceso a rutas protegidas sin autenticación.  
- **accessGuard:** restringe rutas según los permisos del usuario.
- **JWT Interceptor:** añade el token de autenticación a cada petición HTTP.  

