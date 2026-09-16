export const renderUsuario = (usuario) => {
  return `
        <div class="col-md-6 col-lg-4">

            <div class="card shadow-sm h-100">

                <div class="card-body">

                    <h5 class="card-title">
                        ${usuario.name}
                    </h5>

                    <p class="card-text">
                        <strong>Usuario:</strong>
                        ${usuario.username}
                    </p>

                    <p class="card-text">
                        <strong>Email:</strong>
                        ${usuario.email}
                    </p>

                    <p class="card-text">
                        <strong>Teléfono:</strong>
                        ${usuario.phone}
                    </p>

                    <p class="card-text">
                        <strong>Ciudad:</strong>
                        ${usuario.address.city}
                    </p>

                </div>

            </div>

        </div>
    `;
};
