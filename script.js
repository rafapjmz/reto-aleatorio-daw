(function () {
  "use strict";

  var retos = [
    { id: "js-dado", titulo: "Dado de 6 caras", tecnologia: "JavaScript", dificultad: "Fácil", descripcion: "Genera un número aleatorio entre 1 y 6 y muéstralo en pantalla con un botón.", pista: "Math.floor(Math.random() * 6) + 1" },
    { id: "js-filtro", titulo: "Filtrar anomalías", tecnologia: "JavaScript", dificultad: "Media", descripcion: "Dado un array de temperaturas, usa filter para quedarte solo con las superiores a 30 grados.", pista: "temperaturas.filter(t => t > 30)" },
    { id: "js-reduce", titulo: "Ventas por categoría", tecnologia: "JavaScript", dificultad: "Reto", descripcion: "Con un array de ventas, usa reduce para sumar el total de cada categoría en un objeto.", pista: "reduce((acc, v) => ({ ...acc, [v.categoria]: (acc[v.categoria] || 0) + v.importe }), {})" },
    { id: "js-vocales", titulo: "Contador de vocales", tecnologia: "JavaScript", dificultad: "Media", descripcion: "Cuenta las vocales de una frase usando map, filter y reduce, sin bucles.", pista: "Convierte la frase a minúsculas con toLowerCase y filtra con includes." },
    { id: "js-buscar", titulo: "Buscador en vivo", tecnologia: "JavaScript", dificultad: "Reto", descripcion: "Filtra una lista de nombres mientras escribes, usando addEventListener('input') y filter.", pista: "Escucha el evento input del campo y vuelve a pintar la lista." },
    { id: "php-tabla", titulo: "Tabla de multiplicar", tecnologia: "PHP", dificultad: "Fácil", descripcion: "Muestra la tabla de multiplicar de un número usando dos bucles for anidados.", pista: "for ($i = 1; $i <= 10; $i++) dentro de otro bucle." },
    { id: "php-form", titulo: "Formulario validado", tecnologia: "PHP", dificultad: "Media", descripcion: "Recibe un formulario, valida nombre y correo y muestra los errores sin perder los datos.", pista: "filter_var($email, FILTER_VALIDATE_EMAIL)" },
    { id: "php-matriz", titulo: "Medias de una matriz", tecnologia: "PHP", dificultad: "Reto", descripcion: "Recorre un array bidimensional y calcula la media de cada fila con arrays y bucles.", pista: "array_sum($fila) / count($fila)" },
    { id: "java-fizzbuzz", titulo: "FizzBuzz", tecnologia: "Java", dificultad: "Fácil", descripcion: "Del 1 al 100 imprime Fizz si es múltiplo de 3, Buzz si es de 5 y FizzBuzz si es de ambos.", pista: "Comprueba primero el múltiplo de 15." },
    { id: "java-extremos", titulo: "Mayor y menor", tecnologia: "Java", dificultad: "Media", descripcion: "Encuentra el mayor y el menor de un array de enteros en una sola pasada.", pista: "Inicializa max y min con el primer elemento." },
    { id: "c-validar", titulo: "Leer y validar", tecnologia: "C", dificultad: "Fácil", descripcion: "Pide un número por teclado y vuelve a preguntar hasta que esté entre 1 y 10.", pista: "Comprueba el valor devuelto por scanf." },
    { id: "c-invertir", titulo: "Invertir un array", tecnologia: "C", dificultad: "Media", descripcion: "Invierte un array de enteros en el mismo sitio, sin usar un segundo array.", pista: "Intercambia posiciones i y n-1-i hasta la mitad." }
  ];

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var filtroTec = document.getElementById("filtro-tecnologia");
  var filtroDif = document.getElementById("filtro-dificultad");
  var stats = document.getElementById("stats");
  var ruleta = document.getElementById("ruleta");
  var girar = document.getElementById("girar");
  var resultado = document.getElementById("resultado");
  var verPista = document.getElementById("ver-pista");
  var guardar = document.getElementById("guardar");
  var cajaPista = document.getElementById("r-pista");
  var listaGuardados = document.getElementById("lista-guardados");
  var numGuardados = document.getElementById("num-guardados");
  var vacio = document.getElementById("vacio");
  var confeti = document.getElementById("confeti");

  var actual = null;
  var guardados = [];
  try {
    guardados = JSON.parse(window.localStorage.getItem("retos-guardados") || "[]");
    if (!Array.isArray(guardados)) guardados = [];
  } catch (error) {
    guardados = [];
  }

  function disponibles() {
    return retos.filter(function (reto) {
      var tec = filtroTec.value === "todas" || reto.tecnologia === filtroTec.value;
      var dif = filtroDif.value === "todas" || reto.dificultad === filtroDif.value;
      return tec && dif;
    });
  }

  function actualizarStats() {
    var lista = disponibles();
    var resumen = lista.reduce(function (acc, reto) {
      acc[reto.dificultad] = (acc[reto.dificultad] || 0) + 1;
      return acc;
    }, {});
    var partes = ["Fácil", "Media", "Reto"]
      .filter(function (nivel) { return resumen[nivel]; })
      .map(function (nivel) { return resumen[nivel] + " " + nivel.toLowerCase(); });
    stats.textContent = lista.length + " retos disponibles" + (partes.length ? " · " + partes.join(" · ") : " · ajusta los filtros");
  }

  function mostrar(reto) {
    actual = reto;
    document.getElementById("r-tecnologia").textContent = reto.tecnologia;
    document.getElementById("r-dificultad").textContent = reto.dificultad;
    document.getElementById("r-titulo").textContent = reto.titulo;
    document.getElementById("r-descripcion").textContent = reto.descripcion;
    cajaPista.textContent = "💡 " + reto.pista;
    cajaPista.hidden = true;
    verPista.setAttribute("aria-expanded", "false");
    verPista.textContent = "Ver pista 💡";
    guardar.textContent = guardados.indexOf(reto.id) === -1 ? "Guardar reto ⭐" : "Quitar de guardados ✅";
    resultado.hidden = false;
  }

  function lanzarConfeti() {
    if (reduceMotion) return;
    var colores = ["#60a5fa", "#a78bfa", "#f472b6", "#fbbf24", "#34d399"];
    for (var i = 0; i < 28; i += 1) {
      (function (indice) {
        var particula = document.createElement("i");
        particula.style.left = Math.random() * 100 + "%";
        particula.style.background = colores[indice % colores.length];
        particula.style.animationDelay = Math.random() * 0.3 + "s";
        particula.style.animationDuration = 1 + Math.random() * 0.8 + "s";
        confeti.appendChild(particula);
        window.setTimeout(function () { particula.remove(); }, 2600);
      })(i);
    }
  }

  function renderGuardados() {
    listaGuardados.innerHTML = guardados.map(function (id) {
      var reto = retos.find(function (item) { return item.id === id; });
      if (!reto) return "";
      return "<li>" + reto.titulo + ' <button type="button" data-id="' + id + '" aria-label="Quitar ' + reto.titulo + '">×</button></li>';
    }).join("");
    numGuardados.textContent = String(guardados.length);
    vacio.hidden = guardados.length > 0;
  }

  girar.addEventListener("click", function () {
    var lista = disponibles();
    if (!lista.length) {
      stats.textContent = "No hay retos con esos filtros · prueba otra combinación";
      return;
    }

    var elegido = lista[Math.floor(Math.random() * lista.length)];
    resultado.hidden = true;
    girar.disabled = true;
    girar.textContent = "Girando…";
    ruleta.classList.add("girando");
    var vueltas = 4 + Math.floor(Math.random() * 3);
    var angulo = Math.floor(Math.random() * 360);
    ruleta.style.transform = "rotate(" + (vueltas * 360 + angulo) + "deg)";

    window.setTimeout(function () {
      mostrar(elegido);
      ruleta.classList.remove("girando");
      girar.disabled = false;
      girar.textContent = "Girar ruleta 🎲";
      lanzarConfeti();
    }, reduceMotion ? 150 : 2600);
  });

  [filtroTec, filtroDif].forEach(function (filtro) {
    filtro.addEventListener("change", function () {
      actualizarStats();
      resultado.hidden = true;
    });
  });

  verPista.addEventListener("click", function () {
    var abierta = cajaPista.hidden === false;
    cajaPista.hidden = abierta;
    verPista.setAttribute("aria-expanded", String(!abierta));
    verPista.textContent = abierta ? "Ver pista 💡" : "Ocultar pista 🙈";
  });

  guardar.addEventListener("click", function () {
    if (!actual) return;
    var pos = guardados.indexOf(actual.id);
    if (pos === -1) {
      guardados.push(actual.id);
      guardar.textContent = "Quitar de guardados ✅";
    } else {
      guardados.splice(pos, 1);
      guardar.textContent = "Guardar reto ⭐";
    }
    try {
      window.localStorage.setItem("retos-guardados", JSON.stringify(guardados));
    } catch (error) {
      /* almacenamiento no disponible: la lista sigue funcionando en esta sesión */
    }
    renderGuardados();
  });

  listaGuardados.addEventListener("click", function (event) {
    var boton = event.target.closest("button[data-id]");
    if (!boton) return;
    guardados = guardados.filter(function (id) { return id !== boton.getAttribute("data-id"); });
    try {
      window.localStorage.setItem("retos-guardados", JSON.stringify(guardados));
    } catch (error) {
      /* almacenamiento no disponible */
    }
    if (actual && boton.getAttribute("data-id") === actual.id) guardar.textContent = "Guardar reto ⭐";
    renderGuardados();
  });

  actualizarStats();
  renderGuardados();
})();
