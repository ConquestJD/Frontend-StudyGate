document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#formularioLogin');
    form.addEventListener('submit', loginUsuario);
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
async function obtenerEstudiantes() {
    const respuesta = await fetch('http://191.232.164.248:5000/estudiantes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los estudiantes');
    }

    const data = await respuesta.json();
    return data.estudiantes || [];
}

async function verificarRol(idUsuario) {
    const estudiantes = await obtenerEstudiantes();

    if (estudiantes.some(estudiante => estudiante.usuarios_id === idUsuario)) {
        return 'estudiante';
    } else {
        return 'instructor';
    }
}

async function obtenerInstructores() {
    const respuesta = await fetch('http://191.232.164.248:5000/instructores', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los instructores');
    }

    const data = await respuesta.json();
    return data.instructores || [];
}

async function obtenerEstudianteId(usuarioId) {
    const estudiantes = await obtenerEstudiantes();
    const estudiante = estudiantes.find(estudiante => estudiante.usuarios_id === usuarioId);
    return estudiante ? estudiante.id : null;
}

async function obtenerInstructorId(usuarioId) {
    const instructores = await obtenerInstructores();
    const instructor = instructores.find(instructor => instructor.usuarios_id === usuarioId);
    return instructor ? instructor.id : null;
}

async function loginUsuario(event) {
    event.preventDefault();

    const form = event.target;
    const correo_electronico = form.querySelector('[name="correo"]').value;
    const contrasena = form.querySelector('[name="contraseña"]').value;

    const usuarios = await obtenerUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo_electronico === correo_electronico && usuarios[i].contrasena === contrasena) {
            const rol = await verificarRol(usuarios[i].id);
            let id;
            if (rol === 'estudiante') {
                id = await obtenerEstudianteId(usuarios[i].id);
                window.location.href = '../estudiantes/home_estudiantes.html';
            } else {
                id = await obtenerInstructorId(usuarios[i].id);
                console.log(id);
                window.location.href = '../instructores/home_instructores.html';
            }

            alert("Inicio de sesión exitoso");
            // Guardar el ID del estudiante o instructor en el localStorage
            localStorage.setItem('id', id);
            return id;
        }
    }
    alert("Correo electrónico o contraseña incorrectos");
    return null;
}