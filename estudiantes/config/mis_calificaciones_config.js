document.addEventListener('DOMContentLoaded', async (event) => {
    const calificaciones = await obtenerCalificaciones();
    const calificacionesContainer = document.querySelector('#calificaciones');

    calificaciones.forEach(calificacion => {
        const calificacionElement = document.createElement('div');
        calificacionElement.classList.add('calificacion');

        calificacionElement.innerHTML = `
            <h3>Curso: ${calificacion.curso_nombre}</h3>
            <p>Calificación: ${calificacion.calificacion}</p>
        `;

        calificacionesContainer.appendChild(calificacionElement);
    });
});

async function obtenerCalificaciones() {
    const usuarioId = localStorage.getItem('usuarioId');
    const respuesta = await fetch(`http://191.232.164.248:5000/calificaciones/${usuarioId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener las calificaciones');
    }

    const data = await respuesta.json();
    return data.calificaciones || [];
}
