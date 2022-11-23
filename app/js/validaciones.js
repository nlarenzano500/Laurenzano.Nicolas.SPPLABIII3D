export const validarCampoVacio = (input) => {
  return input.value.trim() ? clearError(input) : setError(input,"Campo requerido");
};

export const validarRadioVacio = (input) => {
  const getSelectedValue = document.querySelector( `input[name="${input.name}"]:checked`);   
  return getSelectedValue ? clearError(input) : setError(input, "Campo requerido");
};

export const validarRangoNro = (input, nroMin, nroMax) => {
  if (!input.value.trim())
    return setError(input,"Campo requerido");
  else if (input.value >= nroMin && input.value <= nroMax)
    return clearError(input)
  else
    return setError(input,`${input.name} debe estar entre ${nroMin} y ${nroMax}`);
};


const setError = (input, mensaje) => {
  const $parent = input.parentElement;
  const $small = $parent.lastElementChild;

  if ($small.matches("small")) {
    $small.textContent = mensaje || `${input.name} requerido`;
    input.classList.add("inputError");
    $small.classList.add("danger");
  }
  return false;
};

export const clearError = (input, mensaje) => {
  const $parent = input.parentElement;
  const $small = $parent.lastElementChild;

  if ($small.matches("small")) {
    $small.textContent = "";
    input.classList.remove("inputError");
    $small.classList.remove("danger");
  }
  return true;
};
