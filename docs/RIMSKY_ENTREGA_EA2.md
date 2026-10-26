# Mil Sabores — entrega del módulo de productos (Rimsky)

## Qué se implementó

- Catálogo con búsqueda por nombre/descripción y filtro de categoría combinables.
- Tarjetas de productos con navegación al detalle mediante `codigo`.
- Detalle público y administrativo con estado de disponibilidad, precio, descripción e imagen.
- Administración de productos: listado, creación, edición y eliminación con confirmación.
- Formularios controlados, categorías coherentes con el catálogo, precio entero positivo, código único e imagen opcional.
- Una sola lista compartida por `App.jsx` mediante `useProductos.js` (hook de Christian), con persistencia en `localStorage`.
- CSS adaptable para formulario y tabla administrativa.
- Pruebas escritas con sintaxis Jasmine para utilidades y componentes.

## Dependencias de otros integrantes

- Login, registro, sesión y administración de usuarios: Lucía. No se ha inventado una autenticación.
- Menú administrativo y rutas comunes: Christian; el módulo utiliza las rutas ya presentes en `router.jsx`.
- `validarProducto.js` compartido: Lucía, en coordinación con Rimsky. Este módulo incluye `validarDatosProducto.js` como validación local, sin suplantar su entrega.
- Configuración ejecutable de Karma/Jasmine y cobertura: integración coordinada C/R/L. Los archivos `test/` son casos preparados; **no se presentan como ejecutados**.

## Prueba manual (usar un producto ficticio)

1. Abrir `/productos`; buscar por nombre y combinar búsqueda con categoría.
2. Abrir una torta y confirmar que aparece su nombre, precio e imagen.
3. Abrir `/producto/NOEXISTE` y confirmar el mensaje de producto inexistente.
4. Abrir `/admin/productos` directamente mientras el login de Lucía esté pendiente.
5. Crear `ZZ999` con datos válidos y comprobar que aparece en catálogo y administración.
6. Intentar repetir `ZZ999`; comprobar rechazo por código duplicado.
7. Intentar precio 0, negativo y texto; comprobar rechazo.
8. Editar nombre, categoría, precio y disponibilidad de `ZZ999`; comprobar cambios inmediatos.
9. Recargar F5; comprobar persistencia de los cambios.
10. Eliminar `ZZ999`; comprobar desaparición en catálogo y administración tras F5.
11. Revisar las vistas a 375 px y 1280 px de ancho.

## Comandos de verificación

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Para ejecutar `test/`, Christian debe integrar el empaquetado JSX y el arranque de Karma/Jasmine acordados en el reparto. No ejecutar los archivos `.spec.jsx` directamente con Node.

## Nota para el informe

Registrar fecha, navegador, caso probado, resultado real y captura. No declarar pruebas automatizadas aprobadas sin ejecutar Karma/Jasmine. No declarar acceso protegido al panel `/admin` antes de integrar la sesión de Lucía.
