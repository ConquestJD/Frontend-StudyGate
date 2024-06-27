document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#crearCursoForm');
    form.addEventListener('submit', crearCurso);
});

async function crearCurso(event) {
    event.preventDefault();

    const form = event.target;
    const nombre = form.querySelector('[name="nombre"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;
    const costo = parseFloat(form.querySelector('[name="costo"]').value);
    const fecha_creacion = new Date().toISOString();

    const instructores_id = parseInt(localStorage.getItem('id'), 10);
    const curso = {
        instructores_id,
        nombre,
        descripcion,
        fecha_creacion,
        costo
    };

    const respuesta = await fetch('http://191.232.164.248:5000/cursos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso),
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Curso creado:', data);
        alert('Curso creado con éxito');
        window.location.href = 'home_instructores.html';
    } else {
        const data = await respuesta.json();
        console.log('Error:', data.error);
        alert('Error al crear el curso');
    }
}