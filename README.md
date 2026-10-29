# Pastelería 1000 Sabores — React + Vite

**Desarrollo Fullstack II · DSY1104**  
**EA2 — Migración a React + Pruebas Unitarias con Jasmine/Karma**

---

## 1. Descripción del proyecto

**Pastelería 1000 Sabores** es una aplicación web de comercio electrónico desarrollada originalmente en **HTML, CSS y JavaScript** durante EA1.

En EA2, el proyecto se encuentra en proceso de migración a **React + Vite**, manteniendo y adaptando las funcionalidades de la versión original:

- Catálogo de productos.
- Búsqueda y filtrado por categorías.
- Visualización del detalle de productos.
- Carrito de compras.
- Registro e inicio de sesión.
- Administración de productos y usuarios.
- Persistencia de información mediante LocalStorage.
- Formularios y reglas de validación.
- Diseño responsivo.
- Navegación entre páginas.

La arquitectura se organiza mediante componentes, páginas, hooks, utilidades y módulos de datos para facilitar el mantenimiento, la reutilización y las pruebas.

EA2 incorpora también pruebas automatizadas con **Jasmine y Karma**, medición de cobertura mediante **Istanbul**, documentación técnica y trabajo colaborativo mediante Git y GitHub.

> **Estado del proyecto:** migración e integración progresiva a React. La ejecución de pruebas es satisfactoria, pero la cobertura global todavía no alcanza el objetivo del 80%.

---

## 2. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de interfaces y componentes |
| Vite | Servidor de desarrollo y compilación |
| React Bootstrap | Componentes y estructura visual |
| JavaScript ES6+ | Lógica de aplicación |
| Jasmine | Framework de pruebas automatizadas |
| Karma | Ejecución de pruebas |
| EdgeHeadless | Navegador utilizado en la ejecución validada |
| Istanbul | Instrumentación y medición de cobertura |
| karma-coverage | Generación de informes de cobertura |
| Babel | Instrumentación del código fuente |
| LocalStorage | Persistencia local de datos |
| CSS | Estilos de componentes y páginas |
| Oxlint | Análisis estático del código |
| Git y GitHub | Control de versiones y colaboración |

---

## 3. Estructura del proyecto

La aplicación utiliza una estructura modular. El siguiente árbol presenta los principales directorios y archivos del proyecto, incluyendo los componentes de cobertura incorporados en EA2.

```text
tienda-react/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── README.md
├── karma.conf.cjs
│
├── public/
│   └── img/
│
├── scripts/
│   └── build-tests.mjs
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
│   │   ├── Portada.jsx
│   │   ├── PiePagina.jsx
│   │   ├── Catalogo.jsx
│   │   ├── TarjetaProducto.jsx
│   │   ├── Buscador.jsx
│   │   ├── FiltroCategoria.jsx
│   │   ├── Carrito.jsx
│   │   └── MenuAdmin.jsx
│   │
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Blogs.jsx
│   │   ├── DetalleBlog.jsx
│   │   ├── Contacto.jsx
│   │   ├── Productos.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Registro.jsx
│   │   ├── Login.jsx
│   │   ├── NoEncontrado.jsx
│   │   │
│   │   └── admin/
│   │       ├── InicioAdmin.jsx
│   │       ├── ProductosAdmin.jsx
│   │       ├── DetalleProductoAdmin.jsx
│   │       ├── NuevoProducto.jsx
│   │       ├── EditarProducto.jsx
│   │       ├── UsuariosAdmin.jsx
│   │       ├── DetalleUsuarioAdmin.jsx
│   │       ├── NuevoUsuario.jsx
│   │       └── EditarUsuario.jsx
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
│   │   ├── useUsuarios.spec.jsx
│   │   └── useUsuariosCRUD.spec.jsx
│   └── mocks/
│
├── coverage/                 # Generado automáticamente
│   ├── html/
│   │   └── index.html
│   └── coverage-summary.json
│
└── docs/
    ├── reparto.md
    ├── plan-pruebas.md
    ├── informe-ea2.md
    └── evidencias/
```

**Nota:** el árbol es una representación resumida basada en la estructura documentada del proyecto. Debe contrastarse con el repositorio para verificar la existencia y ubicación de todos los archivos.

---

## 4. Funcionalidades principales

### Catálogo de productos

- Visualización de productos disponibles.
- Búsqueda por nombre.
- Filtrado por categorías.
- Acceso al detalle de cada producto.

### Carrito de compras

- Incorporación de productos.
- Modificación de cantidades.
- Eliminación de productos.
- Cálculo de totales.
- Persistencia local.

### Autenticación y usuarios

- Registro de usuarios.
- Validación de formularios.
- Inicio y cierre de sesión.
- Administración de usuarios.
- Operaciones CRUD.

### Administración de productos

- Listado de productos.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Validación de datos.
- Persistencia de cambios.

Las funcionalidades se integran progresivamente durante EA2. Su inclusión en esta descripción no implica que todos los flujos estén completamente validados de extremo a extremo.

---

## 5. Reglas de validación

Las reglas de validación definidas durante EA1 se mantienen como referencia para su implementación en React.

### Inicio de sesión

- Correo obligatorio.
- Máximo 100 caracteres.
- Dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Contraseña obligatoria.
- Contraseña entre 4 y 10 caracteres.

### Contacto

- Nombre obligatorio, máximo 100 caracteres.
- Correo obligatorio, máximo 100 caracteres.
- Dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Comentario obligatorio, máximo 500 caracteres.

### Registro y administración de usuarios

- RUN validado mediante dígito verificador.
- RUN entre 7 y 9 caracteres, sin puntos ni guion.
- Nombre con máximo 50 caracteres.
- Apellidos con máximo 100 caracteres.
- Correo con máximo 100 caracteres.
- Dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Contraseña entre 4 y 10 caracteres.
- Confirmación de contraseña obligatoria.
- Dirección con máximo 300 caracteres.

### Administración de productos

- Código con mínimo 3 caracteres.
- Nombre con máximo 100 caracteres.
- Descripción opcional, máximo 500 caracteres.
- Precio mínimo de `0`.
- Precio con valores decimales permitidos.
- Stock entero, mínimo `0`.
- Categoría obligatoria.

---

## 6. Pruebas automatizadas

El proyecto utiliza **Jasmine + Karma** para ejecutar pruebas automatizadas sobre lógica de negocio, utilidades, componentes y comportamientos de la aplicación.

La configuración de cobertura permite identificar qué partes del código se ejecutan durante las pruebas y cuáles requieren mayor validación.

### Herramientas de pruebas

| Herramienta | Función |
|---|---|
| Jasmine | Definición de suites, expectativas y casos de prueba |
| Karma | Ejecución de pruebas en navegador |
| EdgeHeadless | Ejecución automatizada sin interfaz gráfica |
| Istanbul | Instrumentación del código |
| karma-coverage | Recopilación y generación de reportes |
| Babel | Integración de la instrumentación con la compilación de pruebas |

### Ejecución de pruebas

Para ejecutar las pruebas configuradas en el proyecto:

```bash
npm test
```

Para ejecutar las pruebas con instrumentación y generar los informes de cobertura:

```bash
npm run test:coverage
```

El comando de cobertura ejecuta la construcción de pruebas instrumentadas mediante `scripts/build-tests.mjs` y posteriormente inicia Karma.

### Resultados de la ejecución

**Fecha de referencia: 29 de octubre de 2026.**

| Indicador | Resultado |
|---|---:|
| Archivos de pruebas | 31 |
| Pruebas ejecutadas | 132 |
| Pruebas aprobadas | 132 |
| Pruebas fallidas | 0 |
| Porcentaje de aprobación | 100% |

**Resultado:** la totalidad de los casos ejecutados finalizó satisfactoriamente.

Esto confirma el resultado de las pruebas ejecutadas, pero no garantiza por sí solo la ausencia de defectos ni la cobertura completa del sistema.

---

## 7. Cobertura de código

La cobertura se obtiene mediante la instrumentación de código con Istanbul y la ejecución de las pruebas a través de Karma.

### Resultados globales

| Métrica | Elementos cubiertos | Cobertura | Objetivo |
|---|---:|---:|---:|
| Statements | 404 / 686 | 58,89% | 80% |
| Branches | 409 / 752 | 54,38% | 80% |
| Functions | 114 / 191 | 59,68% | 80% |
| Lines | 352 / 577 | 61,00% | 80% |

**Estado:** ninguna de las cuatro métricas globales alcanza todavía el objetivo del 80%.

### Cobertura por directorio

| Directorio | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `src/` | 66,66% | 46,15% | 75,00% | 66,66% |
| `src/components/` | 43,24% | 48,53% | 40,42% | 47,42% |
| `src/context/` | 100,00% | 100,00% | 100,00% | 100,00% |
| `src/data/` | 100,00% | 80,00% | 100,00% | 100,00% |
| `src/hooks/` | 65,78% | 53,57% | 85,00% | 72,91% |
| `src/pages/` | 30,87% | 15,21% | 40,90% | 28,88% |
| `src/pages/admin/` | 17,54% | 13,72% | 32,00% | 23,68% |
| `src/utils/` | 85,71% | 81,13% | 95,91% | 86,61% |

### Interpretación

Los resultados permiten identificar diferencias entre módulos:

- **Utilidades:** presentan una cobertura superior al 80% en las cuatro métricas.
- **Hooks:** presentan buena cobertura de funciones, pero requieren más pruebas de sentencias, ramas y líneas.
- **Componentes:** requieren ampliar los escenarios de interacción y validación.
- **Páginas:** presentan una cobertura reducida, especialmente en decisiones y flujos alternativos.
- **Administración:** constituye una de las áreas prioritarias para incorporar nuevas pruebas.

### Limitaciones de la medición

Los porcentajes corresponden al conjunto de módulos instrumentados e incluidos en la ejecución de pruebas.

Para afirmar que representan la totalidad del código fuente, es necesario verificar adicionalmente que todos los archivos pertinentes de `src/` estén incluidos en el proceso de instrumentación.

### Informes generados

El reporte HTML puede consultarse en:

```text
coverage/html/index.html
```

El resumen en formato JSON se genera en:

```text
coverage/coverage-summary.json
```

Estos archivos son resultados generados automáticamente y no forman parte del código fuente que debe mantenerse versionado.

---

## 8. Mejoras de cobertura pendientes

Para avanzar hacia el objetivo del 80%, se prioriza:

1. Incorporar pruebas de páginas administrativas y formularios.
2. Ampliar los casos de autenticación, validación y gestión de sesiones.
3. Probar escenarios de error y flujos alternativos.
4. Verificar operaciones CRUD con datos válidos e inválidos.
5. Revisar las ramas de código no ejecutadas.
6. Comprobar que todos los módulos pertinentes estén incluidos en el reporte.

Las pruebas deben verificar comportamientos y resultados esperados, no limitarse a ejecutar código para incrementar artificialmente los porcentajes.

---

## 9. Instalación y ejecución

### Requisitos

- Node.js y npm.
- Git.
- Navegador compatible con la configuración de Karma.
- Visual Studio Code u otro editor de desarrollo.

### Clonar el repositorio

```bash
git clone https://github.com/kodevlyu/fullstack-development-2-ev2.git
cd fullstack-development-2-ev2
```

### Instalar dependencias

```bash
npm ci
```

`npm ci` utiliza las versiones registradas en `package-lock.json`, lo que facilita la reproducción del entorno de trabajo.

### Ejecutar la aplicación

```bash
npm run dev
```

### Generar la compilación de producción

```bash
npm run build
```

### Ejecutar el análisis estático

```bash
npm run lint
```

### Ejecutar pruebas con cobertura

```bash
npm run test:coverage
```

### Consultar el informe

Abrir el siguiente archivo en un navegador después de ejecutar las pruebas:

```text
coverage/html/index.html
```

---

## 10. Trabajo colaborativo con Git

El proyecto utiliza Git y GitHub para administrar versiones, desarrollar funcionalidades en ramas independientes y revisar cambios antes de incorporarlos a la rama principal.

### Flujo de trabajo

```text
main
│
├── feature/<funcionalidad>
│
└── feature/cobertura-pruebas
    └── 9526da1
```

Las ramas de funcionalidades se integran mediante Pull Requests, previa revisión del equipo.

### Crear una rama

```bash
git switch main
git pull origin main
git switch -c feature/nueva-funcionalidad
```

### Revisar modificaciones

```bash
git status
git diff
```

### Preparar archivos

```bash
git add ruta/del/archivo
```

Se recomienda seleccionar explícitamente los archivos que correspondan a cada cambio, evitando incorporar reportes generados o archivos temporales.

### Registrar cambios

```bash
git commit -m "feat: describir funcionalidad implementada"
```

### Publicar una rama

```bash
git push -u origin feature/nueva-funcionalidad
```

### Integración

La integración a `main` debe realizarse después de revisar los cambios y validar las pruebas correspondientes.

---

## 11. Responsabilidades por integrante

### Christian Quiroz Roa

- Inicio.
- Nosotros.
- Blogs y detalle de blog.
- Contacto.
- Encabezado.
- Portada.
- Pie de página.
- Carrito.
- Navegación general.
- Pruebas de sus componentes.
- CSS de sus módulos.

### Rimsky Farías Soto

- Catálogo de productos.
- Detalle de producto.
- Buscador y filtros.
- Administración de productos (CRUD).
- Persistencia del catálogo.
- Integración del router.
- Pruebas de catálogo y administración.
- CSS de sus módulos.
- Configuración e incorporación de medición de cobertura mediante Karma/Istanbul.
- Pruebas adicionales de autenticación y CRUD de usuarios.

### Lucía Salazar Delgado

- Registro.
- Login.
- Administración de usuarios (CRUD).
- Validaciones compartidas.
- Gestión de sesión local.
- Pruebas de validaciones, sesión y usuarios.
- CSS de sus módulos.

Esta distribución corresponde a las responsabilidades del equipo y puede complementarse con los commits y Pull Requests para identificar contribuciones concretas.

---

## 12. Revisión responsive

La aplicación contempla revisiones de adaptación a distintos tamaños de pantalla mediante las herramientas de desarrollo del navegador.

### Dispositivos de referencia

- iPhone SE.
- iPhone 12.
- Google Pixel.
- Samsung Galaxy.
- Dispositivos móviles físicos, cuando corresponda.

### Elementos por verificar

- Navegación general.
- Catálogo de productos.
- Detalle de producto.
- Carrito de compras.
- Formularios.
- Administración.
- Distribución de componentes.
- Ausencia de desplazamiento horizontal no deseado.

Estas verificaciones deben respaldarse con evidencias de ejecución cuando se declaren completadas.

---

## 13. Documentación

La documentación complementaria del proyecto se organiza en el directorio `docs/`, según la estructura definida para EA2.

```text
docs/
├── reparto.md
├── plan-pruebas.md
├── informe-ea2.md
└── evidencias/
```

También se dispone de un informe de pruebas y cobertura correspondiente a la ejecución del 29 de octubre de 2026, con resultados, análisis y evidencias.

---

## 14. Consideraciones del proyecto

- La migración de HTML, CSS y JavaScript a React se desarrolla progresivamente.
- Se mantienen las reglas de validación establecidas durante EA1.
- La aplicación utiliza componentes, páginas, hooks y utilidades.
- Las pruebas automatizadas se implementan mediante Jasmine y Karma.
- La medición de cobertura se realiza con Istanbul y karma-coverage.
- El proyecto no utiliza Jest ni Testing Library.
- Los reportes de cobertura son artefactos generados, no archivos fuente.
- Las 132 pruebas ejecutadas aprobaron satisfactoriamente.
- La cobertura global permanece por debajo del 80%.
- La integración de cambios a `main` requiere revisión.
- La implementación relacionada con AWS se contempla para EA3.

---

## 15. Créditos

Proyecto académico desarrollado por:

- **Christian Quiroz Roa**
- **Lucía Salazar Delgado**
- **Rimsky Farías Soto**

**Institución:** Duoc UC — Sede Melipilla  
**Asignatura:** Desarrollo Fullstack II  
**Código:** DSY1104  
**Evaluación:** EA2 — Migración a React y Pruebas Unitarias con Jasmine/Karma  
**Última actualización documental:** 29 de octubre de 2026

---


**Asignatura:** Desarrollo Fullstack II · DSY1104
**Evaluación:** EA2 — Migración a React + Pruebas Unitarias con Jasmine/Karma

## Estado de pruebas EA2

132/132 pruebas aprobadas. Cobertura medida con Karma e Istanbul.
=======
**Estado general:** pruebas automatizadas satisfactorias (132/132), cobertura de código implementada y disponible para análisis, con mejoras pendientes para alcanzar el objetivo del 80%.

