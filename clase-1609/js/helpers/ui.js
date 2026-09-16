export const mostrarSpinner = () => {
  document.querySelector("#spinner").classList.remove("d-none");
};

export const ocultarSpinner = () => {
  document.querySelector("#spinner").classList.add("d-none");
};

export const mostrarMensaje = (mensaje) => {
  const contenedor = document.querySelector("#mensaje");

  contenedor.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
};

export const limpiarMensaje = () => {
  document.querySelector("#mensaje").innerHTML = "";
};
