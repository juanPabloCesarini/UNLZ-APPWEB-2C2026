import { obtenerUsuario } from "./services/userService.js";

import { renderUsuario } from "./components/userCard.js";

import {
  mostrarSpinner,
  ocultarSpinner,
  mostrarMensaje,
  limpiarMensaje,
} from "./helpers/ui.js";

const inputUsuario = document.querySelector("#usuarioId");

const botonBuscar = document.querySelector("#btnBuscar");

const contenedorResultado = document.querySelector("#resultado");

const buscarUsuario = async () => {
  const id = inputUsuario.value;

  limpiarMensaje();

  contenedorResultado.innerHTML = "";

  if (!id) {
    mostrarMensaje("Ingrese un ID de usuario.");

    return;
  }

  mostrarSpinner();

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const usuario = await obtenerUsuario(id);

    contenedorResultado.innerHTML = renderUsuario(usuario);
  } catch (error) {
    mostrarMensaje(error.message);
  } finally {
    ocultarSpinner();
  }
};

botonBuscar.addEventListener("click", buscarUsuario);
