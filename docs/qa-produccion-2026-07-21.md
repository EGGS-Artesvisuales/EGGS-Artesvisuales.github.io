# QA de producción — 2026-07-21

Checklist para revisar después de mergear los PR acumulados.

## Estado observado en buscadores

- El dominio raíz `eggs-studio.cl` aparece indexado como selector de idioma.
- Existen páginas indexadas en español e inglés, incluyendo Acerca/About, Docencia y páginas de diagrama.
- Hay rutas antiguas en minúsculas como `/es/acerca` y `/es/diagrama` que pueden seguir recibiendo tráfico orgánico.

## Checklist posterior a merges

### Navegación

- [ ] Confirmar que `Inicio`, `Tienda`, `Servicios`, `Contacto` y las nuevas rutas de `Obra` renderizan en ES/EN/MPD/CHN.
- [ ] Confirmar que el menú móvil abre, cierra y mantiene foco.
- [ ] Confirmar que las rutas antiguas importantes no quedan sin equivalente claro.

### Tienda y checkout

- [ ] Abrir una ficha de print con compra directa.
- [ ] Verificar que el bloque “Más de esta serie” no repite el producto actual.
- [ ] Verificar que el checkout Mercado Pago sigue pidiendo teléfono, ubicación, dirección y zona de despacho.
- [ ] Verificar que publicaciones no aparecen como compra directa.

### Contacto

- [ ] Enviar prueba de formulario con motivo “Comprar obra”.
- [ ] Enviar prueba de formulario con motivo “Encargo, mural o proyecto”.
- [ ] Confirmar que los datos autollenados desde producto se conservan.
- [ ] Confirmar que los correos llegan con asunto y contenido entendible.

### SEO y tarjetas sociales

- [ ] Compartir una landing por WhatsApp/Telegram y verificar título, descripción e imagen.
- [ ] Probar una página sin imagen para confirmar fallback al logo.
- [ ] Revisar que canonical apunte a `https://eggs-studio.cl`.

### Series y obra

- [ ] Abrir landings de Pinturas Infectadas, Paisajes, Banderas, Antipublicidad y El Colgado.
- [ ] Confirmar que Antipublicidad aparece como categoría paraguas.
- [ ] Confirmar que El Colgado se comunica como prints por unidad.
- [ ] Confirmar que `/ES/obra.html`, `/EN/work.html`, `/MPD/obra.html`, `/CHN/obra.html` renderizan.

### Analítica

- [ ] Con consola abierta, escuchar `eggs:conversion` y confirmar eventos:
  - `store_click`
  - `contact_click`
  - `contact_submit`
  - `checkout_start`
- [ ] Si se agrega Google Analytics o Plausible, confirmar que reciben los eventos sin cambiar el código.

## Riesgos conocidos

- Si se mergean PRs fuera de orden y alguno toca los mismos layouts o scripts, revisar conflictos manualmente.
- Las páginas nuevas de Publicaciones son informativas: no deben reactivarse en tienda hasta confirmar catálogo real.
- Las rutas antiguas indexadas deben mantenerse con redirecciones o equivalentes si se decide limpiar estructura más adelante.
