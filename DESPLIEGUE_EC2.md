# Despliegue de la EA2 en EC2 (frontend estático)

**Advertencia:** el registro/login y los roles son una simulación frontend. Los usuarios y sus contraseñas se guardan en localStorage en texto legible, por lo que **no deben usarse credenciales reales ni exponerse como servicio de autenticación público**. La ruta `/admin` no está protegida en servidor. Antes de publicar públicamente una aplicación con cuentas reales, implementar backend, hash de contraseñas, autorización de servidor y HTTPS.

## Comprobaciones previas

```bash
npm ci
npm run lint
npm run build
npm run test
```

## Publicación de demostración (sin datos reales)

1. Crear EC2 Ubuntu, abrir solo 22 desde tu IP y 80/443 según necesidad; instalar Nginx.
2. Compilar `npm run build` localmente y copiar el contenido de `dist/` al directorio del sitio de Nginx.
3. Configurar `try_files $uri $uri/ /index.html;` para que funcionen las rutas de React.
4. Configurar HTTPS si se habilita un dominio público.
5. Comprobar `/`, `/productos`, `/registro`, `/login`, `/admin/usuarios` y recarga de cada ruta.

**No usar cuentas reales ni asumir que el almacenamiento de un navegador se comparte entre clientes.**
