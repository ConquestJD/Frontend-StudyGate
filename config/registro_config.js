document.addEventListener('DOMContentLoaded', (event) => {
    const formEstudiante = document.querySelector('#formularioRegistroEstudiante');
    const formInstructor = document.querySelector('#formularioRegistroInstructor');
    formEstudiante.addEventListener('submit', postUsuario);
    formInstructor.addEventListener('submit', postUsuario);
});

async function obtenerUsuarios() {
    const respuesta = await fetch('http://191.232.164.248:5000/usuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    const data = await respuesta.json();
    return data.usuarios || [];
}
async function obtenerIdPorEmail(emailBuscado) {
    const usuarios = await obtenerUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo_electronico === emailBuscado) {
            return usuarios[i].id;
        }
    }
    console.log("Usuario no encontrado");
    return null;
}

async function postUsuario(event) {
    event.preventDefault();
    console.log('Formulario enviado');
    const rol = document.querySelector('[name="rol"]').value;
    const form = rol === 'estudiante' ? document.querySelector('#formularioRegistroEstudiante') : document.querySelector('#formularioRegistroInstructor');
    let nombre, correo_electronico, contrasena;
    if (rol === 'estudiante') {
        nombre = form.querySelector('[name="nombreEstudiante"]').value;
        correo_electronico = form.querySelector('[name="correoEstudiante"]').value;
        contrasena = form.querySelector('[name="contraseñaEstudiante"]').value;
    } else if (rol === 'instructor') {
        nombre = form.querySelector('[name="nombreInstructor"]').value;
        correo_electronico = form.querySelector('[name="correoInstructor"]').value;
        contrasena = form.querySelector('[name="contraseñaInstructor"]').value;
    }
    const fecha_registro = new Date().toISOString();

    const usuario = {
        nombre,
        correo_electronico,
        contrasena,
        fecha_registro
    };

    const respuesta = await fetch('http://191.232.164.248:5000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
        throw new Error('Error al enviar el formulario');
    }

    const usuarios_id = await obtenerIdPorEmail(correo_electronico);

    if (rol === 'estudiante') {
        const nivel_educativo = parseInt(form.querySelector('[name="nivelEducativo"]').value, 10);
        const estudiante = {
            usuarios_id,
            nivel_educativo
        }
        const respuestaEstudiante = await fetch('http://191.232.164.248:5000/estudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estudiante),
        });

        if (!respuestaEstudiante.ok) {
            throw new Error('Error al enviar el formulario');
        }
    } else if (rol === 'instructor') {
        const especialidades = form.querySelector('[name="especialidades"]').value;
        const instructor = {
            usuarios_id,
            especialidades
        }
        const respuestaInstructor = await fetch('http://191.232.164.248:5000/instructores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instructor),
        });
        if (!respuestaInstructor.ok) {
            throw new Error('Error al enviar el formulario');
        }
    }

    // Aquí se muestra el mensaje de éxito en el HTML
    alert('Usuario creado correctamente.');
    window.location.href = '../index.html';
    event.target.reset();
}