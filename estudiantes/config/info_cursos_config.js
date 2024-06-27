document.addEventListener('DOMContentLoaded', async (event) => {
    const cursos = await obtenerCursos();
    const cursosContainer = document.querySelector('#cursos');

    cursos.forEach(curso => {
        const cursoElement = document.createElement('div');
        cursoElement.classList.add('curso');

        cursoElement.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <p>Fecha de Creación: ${curso.fecha_creacion}</p>
            <p>Costo: $${curso.costo}</p>
        `;

        cursosContainer.appendChild(cursoElement);
    });
});

async function obtenerCursos() {
    const respuesta = await fetch('http://191.232.164.248:5000/cursos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los cursos');
    }

    const data = await respuesta.json();
    return data.cursos || [];
}
