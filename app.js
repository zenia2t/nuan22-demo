/* =========================================================
   NUAN22 — escaparate de ropa de mujer
   · Modo mock (por defecto) o Shopify Storefront API (lectura)
   · Carrito local. Sin pagos, sin checkout real.
   · Formulario de Konvo: embed real en la sección #ayuda
   · Chat flotante: placeholder (ver KONVO_MOUNT al final)
   ========================================================= */

/* ---------- flags de URL (para capturas) ----------
   ?clean=1       oculta la pastilla de estado
   ?cart=open     abre el carrito con dos prendas dentro
   ?widget=1      muestra el chat FALSO de respaldo (placeholder)
   ?widget=open   lo muestra y abre su panel
                  (el chat real de Konvo se carga siempre)
   ?form=0        oculta la sección de ayuda con el embed
-------------------------------------------------- */
const FLAGS = new URLSearchParams(location.search);

/* ---------- catálogo mock ----------
   `photo` apunta a img/<archivo>. Mientras no exista la foto
   (o con photos:false en config.js) se pinta un bloque de tono
   neutro: no finge ser una imagen, se lee como decisión de diseño.
------------------------------------ */
const MOCK = [
  { id: "n1", title: "Top Lazo", subtitle: "Punto de viscosa", color: "Arena", swatch: "#cdb28c",
    price: 68, photo: "img/p1.jpg", tag: "Nuevo",
    sizes: { XS: true, S: true, M: true, L: false },
    description: "Top de manga corta con abertura y lazo al cuello. Punto de viscosa con caída, sin forro.",
    specs: [["Composición", "94% viscosa, 6% elastano"], ["Confección", "Barcelona"], ["Cuidado", "A mano, en frío"], ["Modelo", "1,74 m · talla S"]] },

  { id: "n2", title: "Jersey Barca", subtitle: "Punto de algodón", color: "Crudo", swatch: "#e5dac2",
    price: 98, photo: "img/p2.jpg", tag: null,
    sizes: { XS: true, S: true, M: true, L: true },
    description: "Jersey de punto grueso con cuello barca y hombro caído. Tejido en un taller de Igualada.",
    specs: [["Composición", "100% algodón"], ["Confección", "Igualada"], ["Cuidado", "Lavado en frío"], ["Modelo", "1,76 m · talla M"]] },

  { id: "n3", title: "Top Vela", subtitle: "Rayas de algodón", color: "Rojo / crudo", swatch: "#c5313b",
    price: 72, photo: "img/p3.jpg", tag: null,
    sizes: { XS: true, S: true, M: false, L: false },
    description: "Top de tirante fino con vuelo asimétrico y raya tejida. Cae suelto desde el pecho.",
    specs: [["Composición", "100% algodón"], ["Confección", "Barcelona"], ["Cuidado", "30 °C"], ["Modelo", "1,75 m · talla S"]] },

  { id: "n4", title: "Camisola Seda", subtitle: "Satén reciclado", color: "Marfil", swatch: "#efe9dd",
    price: 89, photo: "img/p4.jpg", tag: null,
    sizes: { XS: true, S: true, M: true, L: true },
    description: "Camisola de tirante regulable en satén reciclado, con escote en pico y bajo al bies.",
    specs: [["Composición", "100% poliéster reciclado"], ["Confección", "Mataró"], ["Cuidado", "Limpieza en seco"], ["Modelo", "1,77 m · talla S"]] },

  { id: "n5", title: "Tank Base", subtitle: "Algodón peinado", color: "Negro", swatch: "#1c1c1c",
    price: 45, photo: "img/p5.jpg", tag: null,
    sizes: { XS: true, S: true, M: true, L: true },
    description: "Camiseta de tirante ancho en algodón peinado, corte corto y costado sin costura.",
    specs: [["Composición", "95% algodón, 5% elastano"], ["Confección", "Barcelona"], ["Cuidado", "40 °C"], ["Modelo", "1,72 m · talla S"]] },

  { id: "n6", title: "Camisa Denim", subtitle: "Denim lavado", color: "Azul claro", swatch: "#93a9c0",
    price: 125, photo: "img/p6.jpg", tag: null,
    sizes: { XS: false, S: true, M: true, L: true },
    description: "Camisa oversize de denim lavado a la piedra, con bolsillo de parche y bajo recto.",
    specs: [["Composición", "100% algodón"], ["Confección", "Igualada"], ["Cuidado", "Lavado en frío"], ["Modelo", "1,76 m · talla M"]] },

  { id: "n7", title: "Top Cruzado", subtitle: "Jersey elástico", color: "Coral", swatch: "#e8574a",
    price: 58, photo: "img/p7.jpg", tag: null,
    sizes: { XS: true, S: true, M: true, L: false },
    description: "Top cruzado de manga francesa con escote en pico profundo. Se adapta sin marcar.",
    specs: [["Composición", "92% viscosa, 8% elastano"], ["Confección", "Barcelona"], ["Cuidado", "A mano"], ["Modelo", "1,73 m · talla S"]] },

  { id: "n8", title: "Chaqueta Nácar", subtitle: "Piel napa", color: "Crudo", swatch: "#eee5d6",
    price: 320, photo: "img/p8.jpg", tag: "Edición corta",
    sizes: { XS: false, S: true, M: true, L: false },
    description: "Chaqueta corta de piel napa con cuello de contraste en pana. Doce unidades por talla.",
    specs: [["Composición", "Piel napa de cordero"], ["Confección", "Ubrique"], ["Cuidado", "Limpieza especializada"], ["Modelo", "1,75 m · talla S"]] },

  { id: "n9", title: "Top Vuelo", subtitle: "Jersey de viscosa", color: "Rojo", swatch: "#dc3c2b",
    price: 64, photo: "img/p9.jpg", tag: null,
    sizes: { XS: true, S: true, M: true, L: true },
    description: "Top de manga abullonada y cintura ancha, con escote en pico y fruncido bajo el pecho.",
    specs: [["Composición", "95% viscosa, 5% elastano"], ["Confección", "Barcelona"], ["Cuidado", "30 °C"], ["Modelo", "1,74 m · talla S"]] },
];

/* imágenes de ambiente (portada y díptico) */
const SCENES = { hero: "img/hero.jpg", look1: "img/look-1.jpg", look2: "img/look-2.jpg" };

/* ---------- estado ---------- */
const state = { products: [], cart: [], currency: "EUR", source: "mock" };

const $  = (s) => document.querySelector(s);
// En la web publicada no existe la pastilla de estado (es una ayuda de
// desarrollo). Un hueco silencioso evita tener que tocar cada llamada.
const NADA = new Proxy({}, { get: () => () => {}, set: () => true });
const $s = (sel) => document.querySelector(sel) || NADA;
const $$ = (s) => Array.from(document.querySelectorAll(s));

const money = (amount, currency = state.currency) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(amount);

const usePhotos = () => Boolean(window.STORE_BRAND?.photos);

/* bloque de reserva; el tono rota para que la rejilla no sea un muro gris */
function placeholder(i = 0, label = "Nuan22") {
  return `<div class="ph" style="background:var(--tone-${(i % 4) + 1})"><span>${label}</span></div>`;
}

function mediaHTML(p, i = 0) {
  const src = p.image || (usePhotos() ? p.photo : null);
  if (!src) return placeholder(i, p.title || "Nuan22");
  // si la foto no carga, cae al bloque de tono en vez de dejar el hueco roto
  return `<img src="${src}" alt="${p.imageAlt || p.title}"
            onerror="phFallback(this, ${i}, '${(p.title || "").replace(/'/g, "")}')">`;
}

window.phFallback = function (img, i, label) {
  img.outerHTML = placeholder(i, label || "Nuan22");
};

function sceneHTML(key, i, label) {
  const src = usePhotos() ? SCENES[key] : null;
  if (!src) return placeholder(i, label);
  return `<img src="${src}" alt="${label}" onerror="phFallback(this, ${i}, '${label}')">`;
}

/* ---------- Shopify Storefront API (SOLO LECTURA) ---------- */
const QUERY = `
  query Catalogo($n: Int!) {
    shop { name }
    products(first: $n) {
      edges {
        node {
          id
          title
          description
          vendor
          productType
          availableForSale
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 12) { edges { node { title availableForSale } } }
        }
      }
    }
  }`;

async function fetchShopify(cfg) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const res = await fetch(`https://${cfg.domain}/api/${cfg.apiVersion}/graphql.json`, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": cfg.storefrontToken,
      },
      body: JSON.stringify({ query: QUERY, variables: { n: cfg.productLimit || 12 } }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} — revisa dominio y token`);
    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);

    const nodes = json.data.products.edges.map((e) => e.node);
    if (!nodes.length) throw new Error("la tienda no devolvió productos publicados");

    return {
      shopName: json.data.shop?.name || cfg.domain,
      currency: nodes[0].priceRange.minVariantPrice.currencyCode || "EUR",
      products: nodes.map((n) => {
        // las variantes de Shopify se usan como tallas si encajan
        const sizes = {};
        n.variants.edges.forEach(({ node: v }) => { sizes[v.title] = v.availableForSale; });
        return {
          id: n.id,
          title: n.title,
          subtitle: [n.productType, n.vendor].filter(Boolean).join(" · ") || "—",
          price: parseFloat(n.priceRange.minVariantPrice.amount),
          image: n.featuredImage?.url || null,
          imageAlt: n.featuredImage?.altText || n.title,
          tag: null,
          available: n.availableForSale,
          sizes: Object.keys(sizes).length ? sizes : null,
          description: (n.description || "").slice(0, 260),
          specs: [
            ["Marca", n.vendor || "—"],
            ["Categoría", n.productType || "—"],
            ["Disponibilidad", n.availableForSale ? "En stock" : "Agotado"],
          ],
        };
      }),
    };
  } finally {
    clearTimeout(timer);
  }
}

/* ---------- render ---------- */
function renderGrid() {
  $("#grid").innerHTML = state.products.map((p, i) => {
    const sizes = p.sizes
      ? `<div class="card__sizes">${Object.entries(p.sizes)
          .map(([s, ok]) => `<span data-out="${!ok}">${s}</span>`).join("")}</div>`
      : "";
    return `
      <article class="card" data-id="${p.id}">
        <div class="card__media">
          ${mediaHTML(p, i)}
          ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
          ${sizes}
        </div>
        <div class="card__body">
          <div>
            <div class="card__name">${p.title}</div>
            <div class="card__meta">${p.subtitle}</div>
            ${p.swatch ? `<div class="swatches"><i style="background:${p.swatch}"></i></div>` : ""}
          </div>
          <div class="card__price">${p.available === false ? "Agotado" : money(p.price)}</div>
        </div>
      </article>`;
  }).join("");

  const n = state.products.length;
  $("#grid-count").textContent = `${n} pieza${n === 1 ? "" : "s"}`;
}

function renderCart() {
  const lines = state.cart
    .map((l) => ({ ...l, p: state.products.find((p) => p.id === l.id) }))
    .filter((l) => l.p);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.p.price, 0);

  $("#cart-count").textContent = count;

  if (!lines.length) {
    $("#cart-lines").innerHTML = `<div class="cart-empty">Tu carrito está vacío.</div>`;
    $("#cart-foot").hidden = true;
    return;
  }

  $("#cart-lines").innerHTML = lines.map((l, i) => `
    <div class="line" data-id="${l.id}">
      <div class="line__media">${mediaHTML(l.p, i)}</div>
      <div class="line__info">
        <div class="line__name">${l.p.title}</div>
        <div class="line__meta">${l.p.subtitle}${l.size ? ` · Talla ${l.size}` : ""}</div>
        <div class="qty">
          <button data-dec aria-label="Quitar uno">−</button>
          <span>${l.qty}</span>
          <button data-inc aria-label="Añadir uno">+</button>
        </div>
      </div>
      <div class="line__price">${money(l.qty * l.p.price)}</div>
    </div>`).join("");

  $("#cart-total").textContent = money(total);
  $("#cart-foot").hidden = false;
}

let pdp = { id: null, size: null };

function renderPDP(id) {
  const p = state.products.find((x) => x.id === id);
  if (!p) return;

  const entries = p.sizes ? Object.entries(p.sizes) : [];
  const first = entries.find(([, ok]) => ok);
  pdp = { id, size: first ? first[0] : null };

  $("#pdp-body").innerHTML = `
    <div class="pdp__media">${mediaHTML(p, 0)}</div>
    <h2>${p.title}</h2>
    <div class="pdp__meta">${p.subtitle}${p.color ? ` · ${p.color}` : ""}</div>
    <div class="pdp__price">${p.available === false ? "Agotado" : money(p.price)}</div>
    ${entries.length ? `
      <div class="micro" style="color:var(--muted); margin-bottom:10px">Talla</div>
      <div class="sizes" id="pdp-sizes">
        ${entries.map(([s, ok]) => `
          <button data-size="${s}" ${ok ? "" : "disabled"}
                  aria-pressed="${s === pdp.size}">${s}</button>`).join("")}
      </div>` : ""}
    <p class="pdp__desc">${p.description || ""}</p>
    <ul class="specs">
      ${(p.specs || []).map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("")}
    </ul>`;

  const sizeBox = $("#pdp-sizes");
  if (sizeBox) {
    sizeBox.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-size]");
      if (!b || b.disabled) return;
      pdp.size = b.dataset.size;
      sizeBox.querySelectorAll("button").forEach((x) =>
        x.setAttribute("aria-pressed", String(x === b)));
    });
  }

  const add = $("#pdp-add");
  const sinStock = p.available === false || (entries.length > 0 && !first);
  add.disabled = sinStock;
  add.textContent = sinStock ? "Sin stock" : "Añadir al carrito";
}

/* ---------- drawers / overlay / toast ---------- */
function openDrawer(sel) {
  $$(".drawer").forEach((d) => (d.dataset.open = "false"));
  $(sel).dataset.open = "true";
  $("#overlay").dataset.open = "true";
}
function closeDrawers() {
  $$(".drawer").forEach((d) => (d.dataset.open = "false"));
  $("#overlay").dataset.open = "false";
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.dataset.open = "true";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.dataset.open = "false"), 2600);
}

/* ---------- carrito ---------- */
function addToCart(id, size = null, qty = 1) {
  const line = state.cart.find((l) => l.id === id && l.size === size);
  if (line) line.qty += qty;
  else state.cart.push({ id, size, qty });
  renderCart();
}

function bump(id, delta) {
  const line = state.cart.find((l) => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) state.cart = state.cart.filter((l) => l !== line);
  renderCart();
}

/* ---------- eventos ---------- */
function wire() {
  $("#cart-btn").addEventListener("click", () => openDrawer("#cart-drawer"));
  $("#overlay").addEventListener("click", closeDrawers);
  $$("[data-close]").forEach((b) => b.addEventListener("click", closeDrawers));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeDrawers());

  $("#grid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    renderPDP(card.dataset.id);
    openDrawer("#pdp-drawer");
  });

  $("#pdp-add").addEventListener("click", () => {
    if (!pdp.id) return;
    addToCart(pdp.id, pdp.size);
    openDrawer("#cart-drawer");
    toast("Añadido al carrito");
  });

  $("#cart-lines").addEventListener("click", (e) => {
    const line = e.target.closest(".line");
    if (!line) return;
    if (e.target.closest("[data-inc]")) bump(line.dataset.id, +1);
    if (e.target.closest("[data-dec]")) bump(line.dataset.id, -1);
  });

  // Sin pagos. A propósito.
  $("#checkout-btn").addEventListener("click", () =>
    toast("Demo de escaparate · checkout desactivado"));

  $("#search-btn").addEventListener("click", () => toast("Buscador no incluido en la demo"));

  $("#subscribe").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Gracias · te hemos apuntado");
  });

  $$(".filters button").forEach((b) => b.addEventListener("click", () => {
    $$(".filters button").forEach((x) => x.setAttribute("aria-current", String(x === b)));
    toast("Filtros no incluidos en la demo");
  }));

  $s("#status").addEventListener("click", (e) => (e.currentTarget.hidden = true));

  /* chat flotante (placeholder) */
  const konvo = $("#konvo-widget");
  if (konvo) {
    const bottomOut = () => {
      const t = $("#konvo-thread");
      t.scrollTop = t.scrollHeight;
    };
    konvo.__bottomOut = bottomOut;
    $("#konvo-launcher").addEventListener("click", () => {
      const open = konvo.dataset.open === "true";
      konvo.dataset.open = String(!open);
      if (!open) {
        konvo.querySelector(".konvo__badge")?.remove();
        requestAnimationFrame(bottomOut);
      }
    });
    konvo.querySelectorAll(".konvo__chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const thread = $("#konvo-thread");
        const msg = document.createElement("div");
        msg.className = "konvo__msg konvo__msg--user";
        msg.textContent = chip.textContent;
        thread.appendChild(msg);
        bottomOut();
      });
    });
  }
}

/* ---------- arranque ---------- */
async function init() {
  const brand = window.STORE_BRAND || {};
  const cfg = window.SHOPIFY_CONFIG || {};

  if (brand.name) { $("#logo").textContent = brand.name; document.title = brand.name; }
  if (brand.announcement) $("#announce").textContent = brand.announcement;

  $("#hero-media").innerHTML = sceneHTML("hero", 0, "Portada");
  $("#look-1").innerHTML = sceneHTML("look1", 2, "Editorial");
  $("#look-2").innerHTML = sceneHTML("look2", 3, "Editorial");

  if (cfg.domain && cfg.storefrontToken) {
    try {
      const data = await fetchShopify(cfg);
      state.products = data.products;
      state.currency = data.currency;
      state.source = "shopify";
      $("#logo").textContent = data.shopName;
      document.title = data.shopName;
      $s("#status").dataset.mode = "shopify";
      $s("#status-text").textContent = `Shopify · ${cfg.domain}`;
    } catch (err) {
      state.products = MOCK.map((p) => ({ available: true, ...p }));
      $s("#status").dataset.mode = "error";
      $s("#status-text").textContent = `Shopify falló → mock (${err.message})`;
      console.warn("[nuan22] Storefront API:", err);
    }
  } else {
    state.products = MOCK.map((p) => ({ available: true, ...p }));
    $s("#status").dataset.mode = "mock";
    $s("#status-text").textContent = "Datos: mock (sin Shopify)";
  }

  renderGrid();
  renderCart();
  wire();

  /* flags de captura */
  if (FLAGS.get("clean") === "1") $s("#status").hidden = true;

  const w = FLAGS.get("widget");
  if (w === "1" || w === "open") $("#konvo-widget").hidden = false;
  if (w === "open") {
    const k = $("#konvo-widget");
    k.dataset.open = "true";
    k.querySelector(".konvo__badge")?.remove();
    requestAnimationFrame(() => k.__bottomOut?.());
  }

  if (FLAGS.get("form") === "0") $("#ayuda").hidden = true;

  if (FLAGS.get("cart") === "open") {
    const [a, b] = state.products;
    if (a) addToCart(a.id, a.sizes ? Object.keys(a.sizes)[1] : null, 1);
    if (b) addToCart(b.id, b.sizes ? Object.keys(b.sizes)[0] : null, 2);
    openDrawer("#cart-drawer");
  }
}

/* ===========================================================
   KONVO_MOUNT — cómo meter el widget de chat real
   -----------------------------------------------------------
   El formulario de contacto real ya está incrustado en la
   sección #ayuda de index.html. El bloque flotante
   <div class="konvo" id="konvo-widget"> es solo un placeholder
   de diseño para las capturas.

   Para poner el widget de chat real:
   1. Borra ese bloque de index.html (y la sección WIDGET KONVO
      de styles.css si no la vas a usar).
   2. Pega en su lugar el script de embed del chat.
   3. Si no carga en localhost, sirve la página por https con un
      túnel (ngrok/cloudflared) y añade ese dominio a los
      orígenes permitidos en el panel de Konvo.
   =========================================================== */

init();
