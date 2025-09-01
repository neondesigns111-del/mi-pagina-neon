<script>
// ==========================
//  Manejo del cupón 24hs
// ==========================

const DESCUENTO = 0.20;
const DURACION = 24 * 60 * 60 * 1000; // 24 horas en ms

function getCuponData() {
  const data = localStorage.getItem("cuponData");
  return data ? JSON.parse(data) : null;
}

function setCuponData(expiraEn) {
  localStorage.setItem("cuponData", JSON.stringify({ expiraEn }));
}

function clearCuponData() {
  localStorage.removeItem("cuponData");
}

// ==========================
//  Aplicar descuentos en productos
// ==========================
function aplicarDescuentos() {
  const cuponData = getCuponData();
  const ahora = Date.now();

  document.querySelectorAll(".producto").forEach(card => {
    const precioElem = card.querySelector(".precio");
    const descuentoElem = card.querySelector(".precio-descuento");

    if (!precioElem) return;

    const precioOriginal = parseFloat(precioElem.dataset.original);

    if (cuponData && cuponData.expiraEn > ahora) {
      // Cupón activo
      const precioConDescuento = (precioOriginal * (1 - DESCUENTO)).toFixed(2);

      precioElem.classList.add("tachado");

      if (descuentoElem) {
        descuentoElem.textContent = `$${precioConDescuento}`;
        descuentoElem.style.display = "block";
      } else {
        const nuevo = document.createElement("div");
        nuevo.className = "precio-descuento";
        nuevo.textContent = `$${precioConDescuento}`;
        card.appendChild(nuevo);
      }
    } else {
      // Cupón expirado o inexistente
      precioElem.classList.remove("tachado");
      if (descuentoElem) descuentoElem.style.display = "none";
    }
  });
}

// ==========================
//  Contadores (popup + fijo)
// ==========================
function iniciarContadores() {
  const cuponData = getCuponData();
  if (!cuponData) return;

  const ahora = Date.now();
  let tiempoRestante = cuponData.expiraEn - ahora;

  function actualizarContadores() {
    if (tiempoRestante <= 0) {
      clearCuponData();
      document.querySelectorAll(".cupon-popup, .contador-fijo").forEach(e => e.remove());
      aplicarDescuentos();
      return;
    }

    const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
    const mins = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    document.querySelectorAll(".contador-cupon, .contador-fijo span").forEach(el => {
      el.textContent = `${horas}h ${mins}m ${secs}s`;
    });

    tiempoRestante -= 1000;
    setTimeout(actualizarContadores, 1000);
  }

  actualizarContadores();
}

// ==========================
//  Inicialización
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  aplicarDescuentos();
  iniciarContadores();
});
</script>
