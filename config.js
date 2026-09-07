/* =============================================================
   CONFIGURACIÓN — el único archivo que necesitas tocar
   =============================================================

   MODO MOCK (por defecto)
   -----------------------
   Deja `domain` y `storefrontToken` vacíos. La tienda funciona con
   8 productos inventados. Ideal para capturas: nada que se caiga,
   nada externo, control total.

   MODO SHOPIFY (datos reales, SOLO LECTURA)
   -----------------------------------------
   Rellena los dos campos y recarga. La tienda pinta tus productos
   reales (títulos, precios, imágenes, stock) desde la Storefront API.

   No hay pagos, no hay checkout, no se escribe nada en tu tienda.
   El token de Storefront es de solo lectura de catálogo.

   Cómo saco el token (2 min):
   1. Shopify admin → Configuración → Aplicaciones y canales de venta
   2. "Desarrollar aplicaciones" → Crear una aplicación
   3. Configuración de Storefront API → marca:
        unauthenticated_read_product_listings
        unauthenticated_read_product_inventory
   4. Instalar la app → copia el "Storefront API access token"

   Ese token es público por diseño (va en el navegador en cualquier
   headless de Shopify). Aun así: no lo pegues en un repo público.
============================================================= */

window.SHOPIFY_CONFIG = {
  // Ej: "mi-tienda.myshopify.com"  (sin https://, sin barra final)
  domain: "",

  // Storefront API access token (empieza por letras/números, ~32 chars)
  storefrontToken: "",

  // Versión de la API. Súbela cuando Shopify saque una nueva.
  apiVersion: "2025-07",

  // Cuántos productos traer del catálogo
  productLimit: 12,
};

/* -------------------------------------------------------------
   MARCA DE LA TIENDA FICTICIA (solo se usa en modo mock;
   en modo Shopify el nombre lo coge de tu tienda real)
------------------------------------------------------------- */
window.STORE_BRAND = {
  // Ponlo en true cuando hayas dejado las imágenes en img/
  // (nombres exactos en img/LEEME.txt). En false se pintan
  // bloques de tono neutro y no se piden archivos inexistentes.
  photos: true,

  name: "NUAN22",
  tagline: "Ropa de mujer · Barcelona",
  announcement: "Envío gratis a partir de 90 € · Devoluciones en 30 días",
};
