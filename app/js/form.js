import { validarCampoVacio, validarRadioVacio, validarRangoNro, clearError } from './validaciones.js';

export function cargarCampos(elemento) {
   const controles = document.forms[0].elements;

   for (const atributo in elemento) {
      if( atributo==="id" ) {
         document.forms[0].setAttribute("data-id",elemento[atributo]);
      } else {
         for (let i = 0; i < controles.length; i++) {
            const control = controles.item(i);
            clearError(control);

            if (control.matches("input") || control.matches("select")) {
               if ( control.matches("[type=text]") || 
                  control.matches("[type=number]") ) {

                  if( atributo == control.name ) {
                     control.value = elemento[atributo];
                  }

               } else if ( control.matches("[type=radio]") ) {
                  if( atributo == control.name && elemento[atributo] == control.value ) {
                     control.checked = true;
                  }
               }
            }
         }
      }
   }

   // Muestra botones para edición
   const botonesEdicion = document.querySelectorAll(".edicion");
   for (let i = 0; i < botonesEdicion.length; i++) {
      botonesEdicion.item(i).style.display = "block";
   }
}

export function limpiarCampos() {
   document.forms[0].removeAttribute("data-id");

   const controles = document.forms[0].elements;
   for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);
      clearError(control);

      if (control.matches("input") || control.matches("select")) {
         if ( control.matches("[type=text]") || 
            control.matches("[type=number]") ) {

            control.value = "";
         } else if ( control.matches("[type=radio]") ) {
            control.checked = false;
         }
      }
   }

   // Oculta botones para edición
   const botonesEdicion = document.querySelectorAll(".edicion");
   for (let i = 0; i < botonesEdicion.length; i++) {
      botonesEdicion.item(i).style.display = "none";
   }
}

export function valorCampo(campo) {

   let control = campo;
   let valor = "";

   if (campo instanceof NodeList)
      control = campo[0];

   if (control.matches("input") || control.matches("select")) {
      if ( control.matches("[type=text]") || 
         control.matches("[type=number]") ) {

         valor = control.value;

      } else if ( control.matches("[type=radio]") ) {
         valor = document.querySelector( `input[name="${control.name}"]:checked`).value;
      }  
   }
   return valor;
}




export function eliminarElemento(datos) {
   const id = datos.findIndex(compararId);
   datos.splice(id, 1);
   limpiarCampos();
}

export function modificarElemento(datos, elemento) {
   const id = datos.findIndex(compararId);

   datos[id] = elemento;

   limpiarCampos();
}

function compararId(elemento) {
   const id = document.forms[0].getAttribute("data-id");
   return elemento.id == id;
}

export function validarCampos(e) {
   const controles = e.target.elements;
   let camposOk = true;

   for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);
      if (control.matches("input") || control.matches("select")) {
         if ( control.matches("[type=text]") || 
            control.matches("[type=number]") ) {
            
            camposOk = validarCampoVacio(control) && camposOk;

            if ( control.matches("[type=number]") )
               camposOk = validarRangoNro(control, 0, 50000) && camposOk;
            
         } else if (control.matches("[type=radio]")) {
            
            camposOk = validarRadioVacio(control) && camposOk;
         }
      }
   }

   return camposOk;
}

export function agregarValidaciones() {
   const controles = document.forms[0].elements;

   for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);
      if (control.matches("input")) {
         if ( control.matches("[type=text]") || 
            control.matches("[type=number]") ) {
            
            control.addEventListener("blur", ()=>{
               if ( control.value.trim() )
                  clearError(control);
            });

         } else if (control.matches("[type=radio]")) {
            control.addEventListener("change", ()=>{
               if ( control.value.trim() )
                  clearError(control);
            });
         }
      } else if (control.matches("select")) {
         if ( control.matches("[type=text]")) {
            control.addEventListener("change", ()=>{
               if ( control.value.trim() )
                  clearError(control);
            });
         }
      }
   }

}








