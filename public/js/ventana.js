
function mostrarVentana() {
  document.getElementById("ventana-flotante").style.display = "block";
  document.body.classList.add("filtro-activo");
}

function cerrarVentana() {
  document.getElementById("ventana-flotante").style.display = "none";
  document.body.classList.remove("filtro-activo");
}

