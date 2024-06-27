document.addEventListener('DOMContentLoaded', async (event) => {
    const usuarioId = localStorage.getItem('usuarioId');
    const usuario = await obtenerUsuarioPorId(usuarioId);
    const bienvenida = document.querySelector('#bienvenida');
    bienvenida.textContent = `Bienvenid@ Instructor/a ${usuario.nombre} a home`;
});

async function obtenerUsuarioPorId(id) {
    const respuesta = await fetch(`http://191.232.164.248:5000/usuarios/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener el usuario');
    }

    const data = await respuesta.json();
    return data.usuario || {};
}