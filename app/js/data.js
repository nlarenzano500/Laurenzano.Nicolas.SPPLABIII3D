import { crearTabla, crearTarjetas } from './tabla.js';
import { cargarCampos, limpiarCampos } from './form.js';

const URL = "http://localhost:3002/mascotas";

const cargarSpinner = (borrarTabla) => {
  const divSpinner = document.querySelector("#spinner");

  if (borrarTabla) {
    const $divTabla = document.querySelector("#divTabla");
    while($divTabla.hasChildNodes()) {
      $divTabla.removeChild($divTabla.firstChild);
    }
  }

  if (!divSpinner.hasChildNodes()) {
    const spinner = document.createElement("img");
    spinner.setAttribute("src", "./recursos/loading.gif");
    spinner.setAttribute("alt", "Imagen spinner");
    divSpinner.appendChild(spinner);
  }
};

const eliminarSpinner = () => {
  const divSpinner = document.querySelector("#spinner");

  while (divSpinner.hasChildNodes()) {
    divSpinner.removeChild(divSpinner.firstChild);
  }
};


export const actualizarTabla = () => {
  
  cargarSpinner(true);
  
  const $divTabla = document.querySelector("#divTabla");
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        // console.log(data);
        $divTabla.appendChild(crearTabla(data));

      } else {
        console.error(xhr.status, xhr.statusText);
      }
      eliminarSpinner();
    }
  });

  xhr.open("GET", URL);
  xhr.send();
};


export const cargarMascota = (id) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        // console.log(data);
        cargarCampos(data);

      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      eliminarSpinner();
    } else {
      cargarSpinner(false);
    }
  });

  xhr.open("GET", URL + "/" + id);
  xhr.send();
};

export const agregarElemento = (elemento) => {
  cargarSpinner(true);

  axios(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(elemento),
  })
    .then(({ data }) => {
      // console.log(data);
      actualizarTabla();
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      // eliminarSpinner();
    });
};

export const modificarElemento = (elemento) => {
  cargarSpinner(true);

  axios(URL + "/" + elemento.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(elemento),
  })
    .then(({ data }) => {
      // console.log(data);
      actualizarTabla();
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      // eliminarSpinner();
    });
};

export const eliminarElemento = () => {
  cargarSpinner(true);

  const id = document.forms[0].getAttribute("data-id");

  axios.delete(URL + "/" + id)
    .then((res) => {
      // console.log(res.data);
      actualizarTabla();
      limpiarCampos();
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      // eliminarSpinner();
    });
};







export const cargarTarjetas = () => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        crearTarjetas(data);

      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      eliminarSpinner();
    } else {
      cargarSpinner(false);
    }
  });

  xhr.open("GET", URL);

  xhr.send();
};






// ***************************************************************
const getMascotasFetch = (url) => {
  cargarSpinner();

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err.status, err.statusText);
    })
    .finally(() => {
      eliminarSpinner();
    });
};

const getMascotasAxios = (url) => {
  cargarSpinner();
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      eliminarSpinner();
    });
};