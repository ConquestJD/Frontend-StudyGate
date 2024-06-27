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

async function llenarTablaCursos() {
    const instructores_id = localStorage.getItem('id');
    const cursos = await obtenerCursos();
    const cursosInstructor = cursos.filter(curso => curso.instructores_id === Number(instructores_id));

    const tablaCursos = document.getElementById('cursosTable');
    const tbody = tablaCursos.querySelector('tbody');

    cursosInstructor.forEach(curso => {
        const fila = document.createElement('tr');
        const celdaId = document.createElement('td');
        celdaId.textContent = curso.id;
        fila.appendChild(celdaId);

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = curso.nombre;
        fila.appendChild(celdaNombre);

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = curso.descripcion;
        fila.appendChild(celdaDescripcion);

        const celdaCosto = document.createElement('td');
        celdaCosto.textContent = curso.costo;
        fila.appendChild(celdaCosto);

        const celdaFechaCreacion = document.createElement('td');
        celdaFechaCreacion.textContent = curso.fecha_creacion;
        fila.appendChild(celdaFechaCreacion);

        const celdaBoton = document.createElement('td');
        const boton = document.createElement('button');
        boton.textContent = 'Info';
        boton.onclick = function() {
            localStorage.setItem('cursosId', curso.id);
            window.location.href = 'info_cursos.html';
        };
        celdaBoton.appendChild(boton);
        fila.appendChild(celdaBoton);

        tbody.appendChild(fila);
    });
}

(async function() {
    try {
        await llenarTablaCursos();
    } catch (error) {
        console.error('Error al llenar la tabla de cursos:', error);
    }
})();