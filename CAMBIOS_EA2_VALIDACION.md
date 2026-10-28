# Correcciones EA2 — revisión de Chris/Codex

- Formularios de registro y administración: RUN con dígito verificador, nombre, apellidos, correo, contraseña y confirmación, dirección, región y comuna.
- Validación de contraseña conforme a la referencia EA1: 4 a 10 caracteres.
- Protección de rutas `/admin` y `/admin/*` según sesión con rol `admin` (redirección a login).
- Tarjeta de Usuarios habilitada en el inicio administrativo.
- Excepción de edición para el correo de la cuenta administrativa inicial de demostración.
- Nuevas pruebas de validación de RUN, datos, contraseña y cuenta inicial.

## Límites de esta versión

- Las cuentas antiguas guardadas en localStorage que no tengan RUN, apellidos o dirección deben completar esos datos al editarlas.
- La sesión, los roles y las contraseñas se almacenan en el navegador: es una **simulación académica**, no seguridad real ni una autenticación de servidor.
- La cuenta de administrador inicial solo se carga automáticamente cuando no hay una lista de usuarios persistida en ese origen.
- Las pruebas automáticas y el build deben ejecutarse en un equipo con dependencias instaladas: `npm ci`, `npm run lint`, `npm run test`, `npm run build`.
