console.log("SFID: JavaScript conectado correctamente");
document.addEventListener("DOMContentLoaded", () => {



  const menuBoton = document.getElementById("menuBoton");
  const menu = document.getElementById("menu");

  if (menuBoton && menu) {
    menuBoton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");

      menuBoton.setAttribute("aria-expanded", String(abierto));
      menuBoton.textContent = abierto ? "✕" : "☰";
    });

    document.querySelectorAll("#menu a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        menuBoton.setAttribute("aria-expanded", "false");
        menuBoton.textContent = "☰";
      });
    });
  }



  const temaBoton = document.getElementById("temaBoton");

  if (temaBoton) {
    temaBoton.addEventListener("click", () => {
      const oscuro = document.body.classList.toggle("oscuro");

      temaBoton.textContent = oscuro ? "☀" : "☾";

      temaBoton.setAttribute(
        "aria-label",
        oscuro ? "Activar tema claro" : "Activar tema oscuro"
      );
    });
  }

  const fotos = [
    "Civil2.jpeg",
    "Civil3.jpeg",
    "Civil4.jpeg",
    "Electromecanica1.png",
    "Electricidad1.jpeg",
    "SoldaduraMMA2.jpeg",
    "SoldaduraMMA3.jpeg",
    "Fontaneria1.jpeg",
    "GasLP1.jpeg",
    "AiresAcondicionados3.jpeg"
  ];

  let posicion = 0;

  const imagenCarrusel = document.getElementById("imagenCarrusel");
  const contadorImagen = document.getElementById("contadorImagen");
  const miniaturas = document.getElementById("miniaturas");
  const anterior = document.getElementById("anterior");
  const siguiente = document.getElementById("siguiente");

  if (imagenCarrusel && contadorImagen &&
      miniaturas && anterior && siguiente) {

    function mostrarFoto(indice) {

      posicion = (indice + fotos.length) % fotos.length;

      imagenCarrusel.src = "img/" + fotos[posicion];

      imagenCarrusel.alt =
        "Proyecto realizado por SFID - Imagen " + (posicion + 1);

      contadorImagen.textContent =
        "Fotografía " + (posicion + 1) + " de " + fotos.length;

      const botones = miniaturas.querySelectorAll("button");

      botones.forEach((boton, i) => {
        boton.classList.toggle("activa", i === posicion);
        boton.setAttribute("aria-pressed", String(i === posicion));
      });
    }

    

    fotos.forEach((foto, indice) => {

      const boton = document.createElement("button");
      boton.type = "button";

      boton.setAttribute(
        "aria-label",
        "Ver fotografía " + (indice + 1)
      );

      const imagen = document.createElement("img");

      imagen.src = "img/" + foto;
      imagen.alt = "Miniatura del proyecto " + (indice + 1);
      imagen.loading = "lazy";

      boton.appendChild(imagen);

      boton.addEventListener("click", () => {
        mostrarFoto(indice);
        reiniciarCarrusel();
      });

      miniaturas.appendChild(boton);
    });

   

    anterior.addEventListener("click", () => {
      mostrarFoto(posicion - 1);
      reiniciarCarrusel();
    });

  

    siguiente.addEventListener("click", () => {
      mostrarFoto(posicion + 1);
      reiniciarCarrusel();
    });


    let intervaloCarrusel;

    function iniciarCarrusel() {
      intervaloCarrusel = setInterval(() => {
        mostrarFoto(posicion + 1);
      }, 5000);
    }

    function reiniciarCarrusel() {
      clearInterval(intervaloCarrusel);
      iniciarCarrusel();
    }

  

    mostrarFoto(0);
    iniciarCarrusel();
  }



  const formulario = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");

  if (formulario && resultado) {

    formulario.addEventListener("submit", evento => {

      evento.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    

      if (nombre.length < 2) {
        resultado.textContent =
          "Por favor, escribe tu nombre completo.";
        return;
      }

     

      if (!correoValido) {
        resultado.textContent =
          "Por favor, escribe un correo electrónico válido.";
        return;
      }


      if (mensaje.length < 10) {
        resultado.textContent =
          "El mensaje debe contener al menos 10 caracteres.";
        return;
      }


      resultado.textContent =
        "Formulario validado correctamente. Se abrirá tu aplicación de correo.";

      const asunto = encodeURIComponent(
        "Consulta desde la página web de SFID"
      );

      const cuerpo = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
      );

      window.location.href =
        `mailto:starling0393@icloud.com?subject=${asunto}&body=${cuerpo}`;

    });
  }


  const volverArriba = document.getElementById("volverArriba");

  if (volverArriba) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 350) {
        volverArriba.classList.add("visible");
      } else {
        volverArriba.classList.remove("visible");
      }

    });

    volverArriba.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });
  }


  const anio = document.getElementById("anio");

  if (anio) {
    anio.textContent = new Date().getFullYear();
  }

});
