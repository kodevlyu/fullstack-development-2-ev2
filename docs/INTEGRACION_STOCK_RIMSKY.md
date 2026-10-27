# Integración de stock — módulo de Rimsky

## Implementación
- Se agregó `stock` entero >= 0 a los 16 productos iniciales, con valor **0** por seguridad: **no representa inventario real**. El administrador debe cargar las cantidades reales antes de habilitar ventas.
- Crear/editar producto exige stock entero no negativo. Se persiste como número en la clave `productos` de `localStorage` mediante el flujo existente.
- Los productos antiguos que ya estaban guardados en `localStorage` se conservan sin alterar. Si no tienen `stock`, se muestran como **Stock pendiente**, no se pueden comprar y se actualizan desde **Editar** asignando la cantidad real. No se sobrescribe la información existente.
- Se mantiene `disponible` como bandera independiente. Un producto con `disponible: false` no se puede comprar aunque tenga stock.
- Administración, tarjeta del catálogo y detalle informan el stock o estado pendiente.
- Se conserva el control de cantidades del carrito implementado por Chris. No se descuenta stock al añadir al carrito.

## Verificación local
```bash
npm ci
npm run lint
npm run build
npm test
```

## Prueba manual sugerida
1. Editar un producto, establecer stock 10 y guardar; comprobar catálogo y carrito.
2. Intentar agregar 11 unidades; debe rechazarse.
3. Editar el mismo producto, establecer stock 0; comprobar «Sin stock» y botón deshabilitado.
4. Crear producto con stock negativo o decimal; comprobar validación.
5. Comprobar que los productos antiguos sin stock permanecen como «Stock pendiente» hasta que se editen.

**Alcance:** no implementa confirmación de compra ni descuento de inventario por venta; esa operación requiere un flujo transaccional definido por el equipo.
