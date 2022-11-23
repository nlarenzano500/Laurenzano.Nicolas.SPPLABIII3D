import { Anuncio_Mascota } from "./anuncio_mascota.js";
import { actualizarTabla, cargarMascota, modificarElemento, agregarElemento, eliminarElemento } from './data.js';
import { buscarPorId } from './tabla.js';
import { limpiarCampos, valorCampo, agregarValidaciones, validarCampos } from './form.js';


const $divTabla = document.querySelector("#divTabla");

agregarValidaciones();
actualizarTabla();

$divTabla.addEventListener("click", (e) => {
	const emisor = e.target;
	if (emisor.matches("tbody tr td")) {
		let id = emisor.parentElement.dataset.id;
		// const elemento = buscarPorId(datos,id);

		cargarMascota(id);
	}
});


const $formulario = document.forms[0];

// Botón Guardar
$formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validarCampos(e)) {
		const id = document.forms[0].getAttribute("data-id");
		const { titulo, descripcion, precio, animal, raza, nacimiento, vacunas} = e.target;

		if (id) {
			const nuevoElemento = crearDato(id, titulo, descripcion, precio, animal, raza, nacimiento, vacunas);
			modificarElemento(nuevoElemento);
		} else {
			const nuevoElemento = crearDato(Date.now(), titulo, descripcion, precio, animal, raza, nacimiento, vacunas);
			agregarElemento(nuevoElemento);
		}

	   limpiarCampos();
	}
});


// Botón Cancelar
document.getElementById("btnCancelar").addEventListener("click", limpiarCampos);

// Botón Eliminar
document.getElementById("btnEliminar").addEventListener("click", eliminarElemento);

function crearDato(id, titulo, descripcion, precio, animal, raza, nacimiento, vacunas) {

	return new Anuncio_Mascota(id, valorCampo(titulo), 
		valorCampo(descripcion), 
		valorCampo(precio), 
		valorCampo(animal), 
		valorCampo(raza), 
		valorCampo(nacimiento), 
		valorCampo(vacunas));
}
