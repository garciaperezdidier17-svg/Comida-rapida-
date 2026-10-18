# Comida-rapida-
Un proyecto ambidios, que busca llevar a tu casa la deliciosa comida costeña.

## Configuración
- **Número de WhatsApp:** se define una sola vez en `js/main.js` (`CONFIG.WHATSAPP_NUMBER`, formato `573146938535`). Confirma que sea el correcto. Los textos visibles del `index.html` (teléfonos, modal) se editan a mano.

## Cómo funcionan los pedidos
Es un sitio estático: no hay servidor ni base de datos. Los pedidos (carrito y pedidos por mayor) **abren WhatsApp con el mensaje ya redactado**; el pedido solo existe cuando el cliente lo envía desde WhatsApp y el negocio lo confirma.

## Publicar en GitHub Pages
1. Sube el proyecto a GitHub (`git add . && git commit -m "..." && git push`).
2. En el repositorio: **Settings → Pages**.
3. En *Build and deployment* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. Espera 1–2 minutos: el sitio queda en `https://<usuario>.github.io/<repositorio>/`.

Nota: GitHub Pages distingue mayúsculas/minúsculas en los nombres de archivo (`Bollo.jpeg` ≠ `bollo.jpeg`).

## Pendiente (requiere backend)
- Suscripción por correo (newsletter): hoy solo valida el campo y avisa que no está disponible.
- Guardar pedidos, historial, pagos en línea, panel administrativo y cuentas de usuario.
- Sección de testimonios: el código del slider existe, pero la sección no está en el HTML.
