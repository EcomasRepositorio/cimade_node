
let dni = document.getElementById('dni_selection');
let codigo = document.getElementById('codigo_selection');
let nombres = document.getElementById('nombre_selection');
let busqueda = document.getElementById('busqueda');
let switch_v;
dni.addEventListener("click", function () {
  switch_v = 0;
  busqueda.setAttribute('type', 'text');
  busqueda.setAttribute('placeholder', 'Dni')
  busqueda.setAttribute('name', 'busqueda_dni');
});
codigo.addEventListener("click", function () {
  switch_v = 0
  busqueda.setAttribute('type', 'text');
  busqueda.setAttribute('placeholder', 'Codigo')
  busqueda.setAttribute('name', 'busqueda_codigo');
});
nombres.addEventListener("click", function () {
  switch_v = 1
  busqueda.setAttribute('type', 'text');
  busqueda.setAttribute('placeholder', 'Nombres y apellidos')
  busqueda.setAttribute('name', 'busqueda_nombres');
});
