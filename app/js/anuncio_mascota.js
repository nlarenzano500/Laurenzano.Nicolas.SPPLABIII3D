import {Anuncio} from "./anuncio.js";

export class Anuncio_Mascota extends Anuncio {

	constructor(id, titulo, descripcion, precio, animal, raza, nacimiento, vacunas) {
		super(id, titulo, descripcion, precio);

		this.animal = animal;
		this.raza = raza;
		this.nacimiento = nacimiento;
		this.vacunas = vacunas;
	}



}