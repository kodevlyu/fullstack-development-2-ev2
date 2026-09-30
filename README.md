# 🧁 Pastelería 1000 Sabores — React + Vite

**Desarrollo Fullstack II · DSY1104**
**EA2 — Migración a React + Pruebas Unitarias con Jasmine/Karma**

---

## 📌 Descripción del proyecto

**Pastelería 1000 Sabores** es una aplicación web desarrollada originalmente en **HTML, CSS y JavaScript** durante EA1.

En EA2, el proyecto se encuentra en **proceso de migración a React + Vite**, manteniendo:

* La estructura modular trabajada durante el curso.
* Las reglas de validación originales.
* El diseño responsivo.
* La administración de productos y usuarios.
* La lógica del carrito.
* La separación de responsabilidades mediante componentes, páginas, hooks y utilidades.

EA2 incorpora además:

* Pruebas unitarias con **Jasmine + Karma**.
* Pruebas de lógica, comportamiento y DOM.
* Documentación técnica.
* Revisión de compatibilidad móvil.
* Trabajo mediante ramas Git.
* Integración entre los módulos desarrollados por cada integrante.

> **Estado del proyecto:** la migración a React no se encuentra declarada como completa. El desarrollo se realiza progresivamente de acuerdo con la guía y los requisitos de EA2.

---

## 🧩 Tecnologías utilizadas

| Tecnología          | Uso                                     |
| ------------------- | --------------------------------------- |
| **React**           | Desarrollo de la interfaz y componentes |
| **Vite**            | Herramienta de desarrollo y build       |
| **React Bootstrap** | Componentes y estructura visual         |
| **JavaScript ES6+** | Lógica de aplicación                    |
| **Jasmine**         | Framework de pruebas                    |
| **Karma**           | Ejecución de pruebas                    |
| **ChromeHeadless**  | Ejecución automatizada de pruebas       |
| **LocalStorage**    | Persistencia local de datos             |
| **CSS**             | Estilos por componente                  |
| **Oxlint**          | Análisis y revisión del código          |

---

## 🏗️ Estructura del proyecto

```text
tienda-react/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .oxlintrc.json
├── .gitignore
├── README.md
├── karma.conf.cjs
│
├── public/
│   └── img/
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── router.jsx
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Encabezado.jsx
│   │   ├── Encabezado.css
│   │   ├── Portada.jsx
│   │   ├── Portada.css
│   │   ├── PiePagina.jsx
│   │   ├── PiePagina.css
│   │   ├── Catalogo.jsx
│   │   ├── Catalogo.css
│   │   ├── TarjetaProducto.jsx
│   │   ├── TarjetaProducto.css
│   │   ├── Buscador.jsx
│   │   ├── Buscador.css
│   │   ├── FiltroCategoria.jsx
│   │   ├── FiltroCategoria.css
│   │   ├── Carrito.jsx
│   │   ├── Carrito.css
│   │   ├── MenuAdmin.jsx
│   │   └── MenuAdmin.css
│   │
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Inicio.css
│   │   ├── Nosotros.jsx
│   │   ├── Nosotros.css
│   │   ├── Blogs.jsx
│   │   ├── Blogs.css
│   │   ├── DetalleBlog.jsx
│   │   ├── DetalleBlog.css
│   │   ├── Contacto.jsx
│   │   ├── Contacto.css
│   │   ├── Productos.jsx
│   │   ├── Productos.css
│   │   ├── DetalleProducto.jsx
│   │   ├── DetalleProducto.css
│   │   ├── Registro.jsx
│   │   ├── Registro.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── NoEncontrado.jsx
│   │   └── NoEncontrado.css
│   │
│   ├── pages/admin/
│   │   ├── InicioAdmin.jsx
│   │   ├── InicioAdmin.css
│   │   ├── ProductosAdmin.jsx
│   │   ├── ProductosAdmin.css
│   │   ├── DetalleProductoAdmin.jsx
│   │   ├── DetalleProductoAdmin.css
│   │   ├── NuevoProducto.jsx
│   │   ├── NuevoProducto.css
│   │   ├── EditarProducto.jsx
│   │   ├── EditarProducto.css
│   │   ├── UsuariosAdmin.jsx
│   │   ├── UsuariosAdmin.css
│   │   ├── DetalleUsuarioAdmin.jsx
│   │   ├── DetalleUsuarioAdmin.css
│   │   ├── NuevoUsuario.jsx
│   │   ├── NuevoUsuario.css
│   │   ├── EditarUsuario.jsx
│   │   └── EditarUsuario.css
│   │
│   ├── hooks/
│   │   ├── useCarrito.js
│   │   ├── useProductos.js
│   │   └── useUsuarios.js
│   │
│   ├── data/
│   │   ├── productos.js
│   │   ├── regionesComunas.js
│   │   └── blogs.js
│   │
│   └── utils/
│       ├── formatoPrecio.js
│       ├── filtrarProductos.js
│       ├── guardarProductos.js
│       ├── operacionesCarrito.js
│       ├── guardarCarrito.js
│       ├── validarProducto.js
│       ├── validarUsuario.js
│       ├── validarContacto.js
│       ├── guardarUsuarios.js
│       └── sesion.js
│
├── test/
│   ├── setup.js
│   ├── unit/
│   ├── components/
│   └── mocks/
│
└── docs/
    ├── reparto.md
    ├── plan-pruebas.md
    ├── informe-ea2.md
    └── evidencias/
```

---

## 🔐 Reglas de validación

Las reglas de validación implementadas durante EA1 se mantienen y se integran progresivamente en la migración a React.

### Inicio de sesión

* Correo obligatorio.
* Máximo 100 caracteres.
* Dominios permitidos:

  * `@duoc.cl`
  * `@profesor.duoc.cl`
  * `@gmail.com`
* Contraseña obligatoria.
* Entre 4 y 10 caracteres.

### Contacto

* Nombre obligatorio.
* Nombre con máximo 100 caracteres.
* Correo obligatorio.
* Correo con máximo 100 caracteres.
* Dominios permitidos:

  * `@duoc.cl`
  * `@profesor.duoc.cl`
  * `@gmail.com`
* Comentario obligatorio.
* Comentario con máximo 500 caracteres.

### Registro / Mantenedor de usuarios

* RUN validado mediante dígito verificador.
* Entre 7 y 9 caracteres.
* Sin puntos ni guion.
* Nombre con máximo 50 caracteres.
* Apellidos con máximo 100 caracteres.
* Correo con máximo 100 caracteres.
* Dominios permitidos:

  * `@duoc.cl`
  * `@profesor.duoc.cl`
  * `@gmail.com`
* Contraseña entre 4 y 10 caracteres.
* Confirmación de contraseña obligatoria.
* Dirección con máximo 300 caracteres.

### Mantenedor de productos

* Código con mínimo 3 caracteres.
* Nombre con máximo 100 caracteres.
* Descripción opcional, máximo 500 caracteres.
* Precio mínimo `0`.
* El precio permite valores decimales.
* Stock entero, mínimo `0`.
* Categoría obligatoria.

---

## 👥 Responsabilidades por integrante

### 🟦 Christian Quiroz Roa

* Inicio.
* Nosotros.
* Blogs.
* DetalleBlog.
* Contacto.
* Encabezado.
* Portada.
* PiePagina.
* Carrito.
* Navegación general.
* Pruebas de sus componentes.
* CSS de sus módulos.

### 🟩 Rimsky Farías Soto

* Catálogo.
* DetalleProducto.
* Buscador y filtros.
* Administración de productos (CRUD).
* Persistencia del catálogo.
* Router.
* Pruebas de catálogo y administración.
* CSS de sus módulos.

### 🟪 Lucía Salazar Delgado

* Registro.
* Login.
* Administración de usuarios (CRUD).
* Validaciones compartidas.
* Gestión de sesión local.
* Pruebas de validaciones, sesión y usuarios.
* CSS de sus módulos.

---

## 🔀 Flujo de trabajo con Git

El proyecto utiliza ramas independientes para facilitar el desarrollo e integración de los módulos.

### Ramas principales

```text
main
├── christian-front
├── rimsky-admin
└── lucia-usuarios
```

### Crear una rama

```bash
git checkout -b rimsky-admin
```

### Registrar y subir cambios

```bash
git add .
git commit -m "feat: módulo admin productos"
git push origin rimsky-admin
```

### Integrar cambios a `main`

La integración se realiza una vez revisados y aprobados los cambios correspondientes.

```bash
git checkout main
git pull
git merge rimsky-admin
git push origin main
```

---

## 🧪 Pruebas unitarias

EA2 incorpora pruebas unitarias utilizando **Jasmine + Karma**.

### Configuración

* **Jasmine:** framework de pruebas.
* **Karma:** test runner.
* **ChromeHeadless:** navegador utilizado para ejecución automatizada.
* `karma.conf.cjs`: configuración del entorno de pruebas.

### Distribución del trabajo

* **Rimsky:** configuración inicial del entorno de pruebas.
* **Christian:** configuración y ejecución de Karma.
* **Lucía:** limpieza de datos y cobertura.
* **Cada integrante:** desarrollo de pruebas correspondientes a sus módulos.

### Ejecutar las pruebas

```bash
npm test
```

---

## 📱 Revisión responsive

La aplicación se revisa mediante:

* Chrome DevTools en modo dispositivo móvil.
* iPhone SE.
* iPhone 12.
* Google Pixel.
* Samsung Galaxy.
* Dispositivo móvil físico conectado a la misma red, cuando corresponda.

### Elementos revisados

* Catálogo.
* Detalle de producto.
* Carrito.
* Formularios.
* Administración.
* Navegación.
* Adaptación de componentes.
* Ausencia de scroll horizontal no deseado.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd tienda-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 4. Generar build de producción

```bash
npm run build
```

### 5. Ejecutar pruebas

```bash
npm test
```

---

## 📄 Consideraciones del proyecto

* La migración desde HTML, CSS y JavaScript hacia React se encuentra **en proceso**.
* Las reglas de validación originales de EA1 se mantienen durante la migración.
* Los estilos se organizan por componente y página.
* Jasmine + Karma forman parte del sistema de pruebas de EA2.
* El proyecto no utiliza Jest ni Testing Library.
* Se evita incorporar componentes o interfaces personalizados que no sean necesarios para los requisitos del proyecto.
* La implementación relacionada con AWS se contempla para **EA3**.

---

## 📚 Documentación

La carpeta `docs/` contiene documentación complementaria del proyecto:

```text
docs/
├── reparto.md
├── plan-pruebas.md
├── informe-ea2.md
└── evidencias/
```

---

## 🧁 Créditos

Proyecto desarrollado por:

* **Christian Quiroz Roa**
* **Lucía Salazar Delgado**
* **Rimsky Farías Soto**

**Asignatura:** Desarrollo Fullstack II · DSY1104
**Evaluación:** EA2 — Migración a React + Pruebas Unitarias con Jasmine/Karma
