export function crearTabla(data) {
    if(!Array.isArray(data)) {
        return null;
    }

    const tabla = document.createElement("table");
    // tabla.classList.add("table-all");
    tabla.classList.add("table");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    // tabla.classList.add("lista-hoverable");

    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}

function crearCabecera(row) {

    const cabecera = document.createElement("thead");
    const tr = document.createElement("tr");
    // tr.classList.add("lista-light-grey");

    for (const key in row) {
        if(key != "id" && key != "pass") {
            const th= document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }
    }

    cabecera.appendChild(tr);
    return cabecera;
}

function crearCuerpo(data) {

    const cuerpo = document.createElement("tbody");

    data.forEach((element) => {
        const fila = document.createElement("tr");
        for (const atributo in element) {
            if(atributo === "id") {
                fila.setAttribute("data-id",element[atributo]);
            } else if(atributo != "pass"){
                const td= document.createElement("td");
                td.textContent = element[atributo];
                fila.appendChild(td);
                fila.classList.add("puntero");
            }
        }

        const filas = cuerpo.children;
        cuerpo.appendChild(fila);

    });
    return cuerpo;
}

export function buscarPorId(datos,id) {
   return datos.find((element) => element.id == id);
}

export function crearTarjetas(datos) {

    const $sectionCards = document.querySelector("#anuncios");

    const $template = document.getElementById("template-card").content;

    const fragment = document.createDocumentFragment();


    // console.log($template);

    datos.forEach((el) => {
      // Importamos el template del html con el método importNode
      // que recibe el nodo a importar y un booleano que indica
      // que tambien hay que importar las etiquetas interiores
      let $plantilla = document.importNode($template, true);

      $plantilla.querySelector(".animal").setAttribute("src", (el.animal == "perro") ? "./recursos/dog.png" : "./recursos/cat.png");

      $plantilla.querySelector("p").innerHTML = el.descripcion;
      $plantilla.querySelector("h4").innerHTML = "$" + el.precio;

      $plantilla.querySelector(".raza").innerHTML = el.raza;
      $plantilla.querySelector(".nacimiento").innerHTML = el.nacimiento;
      $plantilla.querySelector(".vacunas").innerHTML = el.vacunas;

      fragment.appendChild($plantilla);
    });

    $sectionCards.appendChild(fragment);


}
