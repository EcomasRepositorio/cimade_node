// Obtén todos los elementos 'tbody' de la tabla
const tbodies = document.querySelectorAll('tbody.tbodygenerate');
const ventana_js = document.getElementById('ventana je')


tbodies.forEach((tbody) => {
  tbody.addEventListener("click", function() {
    const results = JSON.parse(tbody.getAttribute('data-results'));


    var div1 = document.createElement('div');
    div1.setAttribute('id','ventana-flotante');


    var ul = document.createElement('ul');
    ul.setAttribute('id', 'ul_create');


    var li1 = document.createElement('li');
    li1.setAttribute('class', 'text-center');
    li1.setAttribute('id','li_file')
    li1.textContent = 'ORGANIZADO POR:';
    ul.appendChild(li1);

    var li2 = document.createElement('li');
    li2.textContent = results.instituciones;
    li2.setAttribute('class', 'text-center');
    ul.appendChild(li2);

    var li3 = document.createElement('li');
    li3.setAttribute('class', 'text-center');
    li3.setAttribute('id','li_file')
    li3.textContent = 'OTORGADO A:';
    ul.appendChild(li3);

    var li4 = document.createElement('li');
    li4.setAttribute('class', 'text-center');
    li4.textContent = results.nombre
    ul.appendChild(li4);

    var li5 = document.createElement('li');
    li5.setAttribute('class', 'text-center');
    li5.setAttribute('id','li_file')
    li5.textContent = 'NOMBRE DEL EVENTO';
    ul.appendChild(li5);

    var li6 = document.createElement('li');
    li6.setAttribute('class', 'text-center');
    li6.textContent = results.nombre_curso
    ul.appendChild(li6);

    var li7 = document.createElement('li');
    li7.setAttribute('class', 'text-center');
    li7.setAttribute('id','li_file')
    li7.textContent = 'HORAS ACADEMICAS / CREDITOS';
    ul.appendChild(li7);

    var li8 = document.createElement('li');
    li8.setAttribute('class', 'text-center');
    li8.textContent = results.duracion
    ul.appendChild(li8);

    var li9 = document.createElement('li');
    li9.setAttribute('class', 'text-center');
    li9.setAttribute('id','li_file')
    li9.textContent = 'FECHA';
    ul.appendChild(li9);

    var li10 = document.createElement('li');
    li10.setAttribute('class', 'text-center');
    li10.textContent = results.fecha_emitido;
    ul.appendChild(li10);


    div1.appendChild(ul);


    document.body.appendChild(div1);
  });
});
