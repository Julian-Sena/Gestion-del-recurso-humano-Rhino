// Función para cambiar entre las pestañas del menú
function abrirTab(evento, idTab) {
    // 1. Ocultar todos los contenidos de las pestañas
    const contenidos = document.getElementsByClassName("contenido-tab");
    for (let i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
        contenidos[i].classList.remove("en-pantalla");
    }

    // 2. Limpiar los mensajes de error de todas las pestañas al cambiar entre ellas
    const mensajesError = document.getElementsByClassName("mensaje-error");
    for (let i = 0; i < mensajesError.length; i++) {
        mensajesError[i].textContent = "";
    }

    // 3. Quitar la clase 'activo' de todos los botones
    const botones = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botones.length; i++) {
        botones[i].className = botones[i].className.replace(" activo", "");
    }

    // 4. Mostrar la pestaña actual y añadir la clase 'activo' al botón presionado
    document.getElementById(idTab).style.display = "flex";
    evento.currentTarget.className += " activo";
}

// Función para validar las credenciales de prueba según el rol seleccionado
function validarLogin(rol) {
    // Captura de los valores ingresados en la pestaña correspondiente
    const usuarioIngresado = document.getElementById(`input-user-${rol}`).value;
    const contrasenaIngresada = document.getElementById(`input-pass-${rol}`).value;
    const contenedorError = document.getElementById(`error-${rol}`);

    // Limpiamos el mensaje de error por si había uno previo
    contenedorError.textContent = "";

    // Variables para definir los accesos correctos según el caso
    let usuarioCorrecto = "";
    const contrasenaCorrecta = "1234";

    // Asignación de credenciales correspondientes por rol
    if (rol === 'empleado') {
        usuarioCorrecto = "Empleado";
    } else if (rol === 'analista') {
        usuarioCorrecto = "Analista";
    } else if (rol === 'supervisor') {
        usuarioCorrecto = "Supervisor";
    } else if (rol === 'gerente') {
        usuarioCorrecto = "Admin";
    }

    // Validación estricta
    if (usuarioIngresado === usuarioCorrecto && contrasenaIngresada === contrasenaCorrecta) {
        // Redirección inmediata al archivo destino
        window.location.href = "Principal.html";
    } else {
        // Muestra de mensaje de error si no coinciden
        contenedorError.textContent = "Credenciales incorrectas";
    }
}