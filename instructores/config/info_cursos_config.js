async function obtenerCurso() {
    const cursosId = localStorage.getItem('cursosId');
    const respuesta = await fetch(`http://191.232.164.248:5000/cursos/${cursosId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener el curso');
    }

    const data = await respuesta.json();
    return data;
}

async function obtenerLecciones() {
    const respuesta = await fetch('http://191.232.164.248:5000/lecciones', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener las lecciones');
    }

    const data = await respuesta.json();
    return data;
}

async function obtenerMateriales() {
    const respuesta = await fetch('http://191.232.164.248:5000/materiales', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los materiales');
    }

    const data = await respuesta.json();
    return data;
}

async function obtenerEvaluaciones() {
    const respuesta = await fetch('http://191.232.164.248:5000/evaluaciones', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener las evaluaciones');
    }

    const data = await respuesta.json();
    return data;
}

async function llenarTablas() {
    const cursosId = localStorage.getItem('cursosId');
    const curso = await obtenerCurso();
    const lecciones = Array.isArray(await obtenerLecciones()) ? (await obtenerLecciones()).filter(leccion => leccion.cursos_id === Number(cursosId)) : [];
    const materiales = Array.isArray(await obtenerMateriales()) ? (await obtenerMateriales()).filter(material => material.cursos_id === Number(cursosId)) : [];
    const evaluaciones = Array.isArray(await obtenerEvaluaciones()) ? (await obtenerEvaluaciones()).filter(evaluacion => evaluacion.cursos_id === Number(cursosId)) : [];

    const cursoTable = document.getElementById('cursoTable');
    const leccionesTable = document.getElementById('leccionesTable');
    const materialesTable = document.getElementById('materialesTable');
    const evaluacionesTable = document.getElementById('evaluacionesTable');

    // Llenar la tabla del curso
    const cursoRow = cursoTable.insertRow();
    cursoRow.insertCell().textContent = curso.curso.id;
    cursoRow.insertCell().textContent = curso.curso.nombre;
    cursoRow.insertCell().textContent = curso.curso.descripcion;
    cursoRow.insertCell().textContent = curso.curso.costo;
    cursoRow.insertCell().textContent = curso.curso.fecha_creacion;

    // Llenar la tabla de lecciones
    lecciones.forEach(leccion => {
        const leccionRow = leccionesTable.insertRow();
        leccionRow.insertCell().textContent = leccion.titulo;
        leccionRow.insertCell().textContent = leccion.contenido;
        leccionRow.insertCell().textContent = leccion.orden;
    });

    // Llenar la tabla de materiales
    materiales.forEach(material => {
        const materialRow = materialesTable.insertRow();
        materialRow.insertCell().textContent = material.tipo;
        materialRow.insertCell().textContent = material.titulo;
        materialRow.insertCell().textContent = material.descripcion;
        materialRow.insertCell().textContent = material.url;
    });

    // Llenar la tabla de evaluaciones
    evaluaciones.forEach(evaluacion => {
        const evaluacionRow = evaluacionesTable.insertRow();
        evaluacionRow.insertCell().textContent = evaluacion.titulo;
        evaluacionRow.insertCell().textContent = evaluacion.descripcion;
        evaluacionRow.insertCell().textContent = evaluacion.fecha_evaluacion;
    });
}

(async function() {
    try {
        await llenarTablas();
    } catch (error) {
        console.error('Error al llenar las tablas:', error);
    }
})();