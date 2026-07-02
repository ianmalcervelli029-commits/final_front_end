// ==============================
//   TechFix — script.js
// ==============================

// ==============================
//   PRODUCTOS (13 en total)
// ==============================
var PRODUCTOS = [
  { id:1,  nombre:"PC Gamer Ryzen 5 / RTX 4060 / 16GB / 1TB",  cat:"Computadoras", precio:850,  img:"https://placehold.co/400x260/0f3460/00d4ff?text=PC+Gamer"    },
  { id:2,  nombre:"PC Oficina Intel i5 / 16GB / 512GB SSD",     cat:"Computadoras", precio:480,  img:"https://placehold.co/400x260/0f3460/00d4ff?text=PC+Oficina"  },
  { id:3,  nombre:"PC Básica Celeron / 8GB / 240GB SSD",        cat:"Computadoras", precio:280,  img:"https://placehold.co/400x260/0f3460/00d4ff?text=PC+Basica"   },
  { id:4,  nombre:"Notebook Lenovo IdeaPad Ryzen 5 / 15.6\"",  cat:"Notebooks",    precio:620,  img:"https://placehold.co/400x260/1a1a2e/00d4ff?text=Lenovo"      },
  { id:5,  nombre:"Notebook HP Pavilion i7 / GTX 1650",        cat:"Notebooks",    precio:820,  img:"https://placehold.co/400x260/1a1a2e/00d4ff?text=HP+Pavilion" },
  { id:6,  nombre:"Notebook ASUS VivoBook Ryzen 3 / OLED",     cat:"Notebooks",    precio:490,  img:"https://placehold.co/400x260/1a1a2e/00d4ff?text=ASUS"        },
  { id:7,  nombre:"Monitor 27\" Full HD 144Hz IPS FreeSync",   cat:"Monitores",    precio:310,  img:"https://placehold.co/400x260/16213e/00d4ff?text=Monitor+27"  },
  { id:8,  nombre:"Monitor 24\" Full HD 75Hz HDMI",            cat:"Monitores",    precio:180,  img:"https://placehold.co/400x260/16213e/00d4ff?text=Monitor+24"  },
  { id:9,  nombre:"SSD NVMe 1TB Gen4 — 7450 MB/s",            cat:"Componentes",  precio:95,   img:"https://placehold.co/400x260/0f3460/e94560?text=SSD+1TB"     },
  { id:10, nombre:"Memoria RAM 16GB DDR5 5600MHz",             cat:"Componentes",  precio:72,   img:"https://placehold.co/400x260/0f3460/e94560?text=RAM+16GB"    },
  { id:11, nombre:"Placa de Video RTX 4060 8GB GDDR6",         cat:"Componentes",  precio:420,  img:"https://placehold.co/400x260/0f3460/e94560?text=RTX+4060"   },
  { id:12, nombre:"Kit Periféricos Gamer RGB Mouse + Teclado", cat:"Periféricos",  precio:95,   img:"https://placehold.co/400x260/1a1a2e/e94560?text=Kit+Gamer"  },
  { id:13, nombre:"Auriculares Gamer 7.1 Surround con Mic",    cat:"Periféricos",  precio:65,   img:"https://placehold.co/400x260/1a1a2e/e94560?text=Auriculares" }
];

// ==============================
//   CARRITO
// ==============================
var carrito = JSON.parse(localStorage.getItem("techfix-carrito") || "[]");

function guardarCarrito() {
  localStorage.setItem("techfix-carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id, nombre, precio, img) {
  var existe = null;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) { existe = carrito[i]; break; }
  }
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ id:id, nombre:nombre, precio:precio, img:img, cantidad:1 });
  }
  guardarCarrito();
  actualizarContador();
  renderCarrito();
  mostrarNotif("✅ Agregado al carrito");
}

function eliminar(id) {
  carrito = carrito.filter(function(i){ return i.id !== id; });
  guardarCarrito();
  actualizarContador();
  renderCarrito();
}

function cambiarCantidad(id, val) {
  val = parseInt(val);
  if (val < 1) { eliminar(id); return; }
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) { carrito[i].cantidad = val; break; }
  }
  guardarCarrito();
  actualizarContador();
  renderCarrito();
}

function calcularTotal() {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

// ==============================
//   CARRITO UI
// ==============================
function actualizarContador() {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) total += carrito[i].cantidad;
  var el = document.getElementById("contadorCarrito");
  if (el) el.textContent = total;
}

function renderCarrito() {
  var lista  = document.getElementById("carritoLista");
  var totalEl = document.getElementById("carritoTotal");
  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  var html = "";
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    html += '<div class="carrito-item">';
    html += '<img src="' + item.img + '" alt="' + item.nombre + '" class="carrito-item-img">';
    html += '<div class="carrito-item-info">';
    html += '<p class="carrito-item-nombre">' + item.nombre.substring(0,35) + '...</p>';
    html += '<p class="carrito-item-precio">$' + (item.precio * item.cantidad).toFixed(2) + '</p>';
    html += '<div class="carrito-controles">';
    html += '<button onclick="cambiarCantidad(' + item.id + ',' + (item.cantidad-1) + ')">−</button>';
    html += '<input type="number" value="' + item.cantidad + '" min="1" onchange="cambiarCantidad(' + item.id + ',this.value)">';
    html += '<button onclick="cambiarCantidad(' + item.id + ',' + (item.cantidad+1) + ')">+</button>';
    html += '<button class="btn-eliminar" onclick="eliminar(' + item.id + ')">🗑️</button>';
    html += '</div></div></div>';
  }
  lista.innerHTML = html;

  if (totalEl) totalEl.textContent = "$" + calcularTotal().toFixed(2);
}

function abrirCarrito() {
  var panel = document.getElementById("carritoPanel");
  var ovl   = document.getElementById("overlay");
  if (panel) panel.classList.add("abierto");
  if (ovl)   ovl.classList.add("activo");
  renderCarrito();
}

function cerrarCarrito() {
  var panel = document.getElementById("carritoPanel");
  var ovl   = document.getElementById("overlay");
  if (panel) panel.classList.remove("abierto");
  if (ovl)   ovl.classList.remove("activo");
}

// ==============================
//   NOTIFICACIÓN
// ==============================
function mostrarNotif(msg) {
  var el = document.getElementById("notificacion");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(function(){ el.classList.remove("visible"); }, 2500);
}

// ==============================
//   MOSTRAR PRODUCTOS
// ==============================
function mostrarProductos(cat) {
  var contenedor = document.getElementById("productosContainer");
  if (!contenedor) return;

  var lista = cat === "todos"
    ? PRODUCTOS
    : PRODUCTOS.filter(function(p){ return p.cat === cat; });

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="sin-productos">No hay productos en esta categoría.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < lista.length; i++) {
    var p = lista[i];
    html += '<article class="producto-card">';
    html += '<img src="' + p.img + '" alt="' + p.nombre + '" loading="lazy">';
    html += '<h3>' + p.nombre + '</h3>';
    html += '<p>' + p.cat + '</p>';
    html += '<span class="precio">$' + p.precio.toFixed(2) + '</span>';
    html += '<button class="btn-agregar" onclick="agregarAlCarrito(' + p.id + ',\'' + p.nombre.replace(/'/g,"\\'") + '\',' + p.precio + ',\'' + p.img + '\')">🛒 Agregar al carrito</button>';
    html += '</article>';
  }
  contenedor.innerHTML = html;
}

// ==============================
//   FILTROS
// ==============================
function iniciarFiltros() {
  var botones = document.querySelectorAll(".filtro");
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function() {
      document.querySelectorAll(".filtro").forEach(function(b){ b.classList.remove("activo"); });
      this.classList.add("activo");
      mostrarProductos(this.getAttribute("data-cat"));
    });
  }
}

// ==============================
//   VALIDACIÓN FORMULARIO
// ==============================
function iniciarFormulario() {
  var form = document.getElementById("contactoForm");
  if (!form) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Limpiar errores
    document.querySelectorAll(".error").forEach(function(el){ el.textContent = ""; });
    var msgDiv = document.getElementById("formMensaje");
    if (msgDiv) msgDiv.className = "form-mensaje";

    var valido = true;

    var nombre = document.getElementById("nombre");
    if (nombre && nombre.value.trim().length < 2) {
      document.getElementById("errorNombre").textContent = "Mínimo 2 caracteres.";
      valido = false;
    }

    var email = document.getElementById("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      document.getElementById("errorEmail").textContent = "Correo inválido.";
      valido = false;
    }

    var mensaje = document.getElementById("mensaje");
    if (mensaje && mensaje.value.trim().length < 10) {
      document.getElementById("errorMensaje").textContent = "Mínimo 10 caracteres.";
      valido = false;
    }

    if (!valido) return;

    var btn = document.getElementById("btnEnviar");
    if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }

    try {
      var res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        if (msgDiv) { msgDiv.textContent = "✅ ¡Mensaje enviado! Te contactamos pronto."; msgDiv.classList.add("exito"); }
        form.reset();
      } else {
        throw new Error("error");
      }
    } catch(err) {
      if (msgDiv) { msgDiv.textContent = "⚠️ Error al enviar. Escribinos al WhatsApp."; msgDiv.classList.add("error"); }
    }

    if (btn) { btn.disabled = false; btn.textContent = "Enviar mensaje"; }
  });
}

// ==============================
//   FINALIZAR COMPRA
// ==============================
function iniciarCompra() {
  var btn = document.getElementById("btnComprar");
  if (!btn) return;
  btn.addEventListener("click", function() {
    if (carrito.length === 0) { mostrarNotif("⚠️ Tu carrito está vacío."); return; }
    var total = calcularTotal().toFixed(2);
    var cant  = 0;
    for (var i = 0; i < carrito.length; i++) cant += carrito[i].cantidad;
    alert("✅ ¡Compra realizada!\n\n" + cant + " producto(s)\nTotal: $" + total + "\n\nTe contactamos para coordinar el pago.");
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderCarrito();
    cerrarCarrito();
  });
}

// ==============================
//   INICIO
// ==============================
document.addEventListener("DOMContentLoaded", function() {

  // Carrito — abrir/cerrar
  var btnAbrir  = document.getElementById("btnCarrito");
  var btnCerrar = document.getElementById("cerrarCarrito");
  var overlay   = document.getElementById("overlay");
  if (btnAbrir)  btnAbrir.addEventListener("click", abrirCarrito);
  if (btnCerrar) btnCerrar.addEventListener("click", cerrarCarrito);
  if (overlay)   overlay.addEventListener("click", cerrarCarrito);
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") cerrarCarrito(); });

  // Estado inicial
  actualizarContador();

  // Mostrar productos si estamos en productos.html
  var contenedor = document.getElementById("productosContainer");
  if (contenedor) {
    mostrarProductos("todos");
    iniciarFiltros();
  }

  // Formulario
  iniciarFormulario();

  // Compra
  iniciarCompra();

});
