
const API_URL = "https://jsonplaceholder.typicode.com/users";


export const obtenerUsuario = async (id) => {

    const respuesta = await fetch(`${API_URL}/${id}`);


    if (!respuesta.ok) {

        throw new Error("No se pudo obtener el usuario");

    }


    const usuario = await respuesta.json();
    

    return usuario;
};

