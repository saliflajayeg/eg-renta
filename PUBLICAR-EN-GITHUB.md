# Publicar EG RENTA en GitHub (para obtener el link) 🔗

El proyecto ya está listo y con un repositorio git inicializado y su primer commit hecho.
Solo faltan tus credenciales de GitHub para subirlo (eso solo lo puedes hacer tú, con tu cuenta).

Elige **una** de estas dos opciones.

---

## ✅ Opción A — La más fácil (web, sin comandos)

1. Entra en https://github.com/new e inicia sesión.
2. **Repository name:** `eg-renta` → botón **Create repository**.
3. En la página del repo, haz clic en **“uploading an existing file”**.
4. Arrastra TODO el contenido de la carpeta `eg-renta` (index.html, la carpeta `assets`, README.md, `.nojekyll`) y pulsa **Commit changes**.
5. Ve a **Settings → Pages**.
6. En **Source**, elige la rama **main** y carpeta **/ (root)** → **Save**.
7. Espera ~1 minuto. Tu web estará en:
   **`https://<tu-usuario>.github.io/eg-renta/`**

---

## ⚙️ Opción B — Por terminal (si usas git)

Desde la carpeta `eg-renta`:

```bash
# 1. Crea el repo en GitHub (con GitHub CLI ya autenticado):
gh repo create eg-renta --public --source=. --push

# — o, si no usas gh, crea el repo vacío en la web y luego:
git remote add origin https://github.com/<tu-usuario>/eg-renta.git
git branch -M main
git push -u origin main
```

Después activa Pages:

```bash
gh api -X POST repos/<tu-usuario>/eg-renta/pages -f source[branch]=main -f source[path]=/
```
(o hazlo desde **Settings → Pages** como en la Opción A, paso 5–6.)

Tu link final: **`https://<tu-usuario>.github.io/eg-renta/`**

---

### ¿Quieres que lo suba yo por ti?
Puedo hacerlo si conectas una cuenta de GitHub a Cowork, o si me das acceso al navegador
para subirlo con tu sesión de GitHub ya iniciada. Solo dímelo cuando vuelvas. 🙂
