# EG RENTA 🇬🇶

**La plataforma de alquiler de Guinea Ecuatorial.** Casas, apartamentos y oficinas en alquiler en Malabo, Bata, Sipopo, Mongomo y todo el país. Los inquilinos buscan y filtran propiedades; los propietarios y agentes inmobiliarios publican sus anuncios gratis.

> Servicio pensado y disponible únicamente para Guinea Ecuatorial.

## Características

- 🔎 **Buscador** por zona/ciudad, tipo (apartamento, casa, oficina, local), habitaciones y precio máximo (en FCFA).
- 🏙️ **Zonas icónicas** de Guinea Ecuatorial (Malabo, Bata, Sipopo, Mongomo) con ilustraciones inspiradas en sus monumentos.
- 🏠 **Fichas de propiedad** con fotos, precio, superficie, habitaciones y contacto directo por teléfono / WhatsApp.
- 📝 **Publicar propiedad**: formulario para que dueños y agentes añadan sus anuncios al instante.
- 🎨 **Identidad local**: colores de la bandera nacional (azul, verde, blanco, rojo y la estrella amarilla).
- 📱 Diseño responsive (móvil, tablet y escritorio).

## Tecnología

Sitio estático — HTML, CSS y JavaScript puro, sin dependencias ni compilación. Se puede alojar gratis en GitHub Pages.

```
eg-renta/
├── index.html
├── assets/
│   ├── styles.css
│   ├── app.js
│   └── favicon.svg
├── .nojekyll
└── README.md
```

## Ver en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo (por ejemplo `eg-renta`) en GitHub.
2. Sube estos archivos (ver `PUBLICAR-EN-GITHUB.md`).
3. En **Settings → Pages**, elige la rama `main` y carpeta `/ (root)`.
4. Tu web quedará publicada en `https://<tu-usuario>.github.io/eg-renta/`.

## Notas

- Las propiedades incluidas son **ejemplos de demostración** (precios y teléfonos ficticios) para mostrar cómo funciona la plataforma.
- Las publicaciones nuevas se guardan en memoria durante la sesión del navegador (demo). Para persistencia real se conectaría una base de datos.

---
© EG RENTA · *Unidad · Paz · Justicia*
