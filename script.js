// ================= LÓGICA DEL LOGIN (index.html) =================

function abrirTab(evento, idTab) {
    const contenidos = document.getElementsByClassName("contenido-tab");
    for (let i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
        contenidos[i].classList.remove("en-pantalla");
    }

    const mensajesError = document.getElementsByClassName("mensaje-error");
    for (let i = 0; i < mensajesError.length; i++) {
        mensajesError[i].textContent = "";
    }

    const botones = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botones.length; i++) {
        botones[i].className = botones[i].className.replace(" activo", "");
    }

    document.getElementById(idTab).style.display = "flex";
    evento.currentTarget.className += " activo";
}

function validarLogin(rol) {
    const usuarioIngresado = document.getElementById(`input-user-${rol}`).value;
    const contrasenaIngresada = document.getElementById(`input-pass-${rol}`).value;
    const contenedorError = document.getElementById(`error-${rol}`);

    contenedorError.textContent = "";

    let usuarioCorrecto = "";
    const contrasenaCorrecta = "1234";

    if (rol === 'empleado') usuarioCorrecto = "Empleado";
    else if (rol === 'analista') usuarioCorrecto = "Analista";
    else if (rol === 'supervisor') usuarioCorrecto = "Supervisor";
    else if (rol === 'gerente') usuarioCorrecto = "Admin";

    if (usuarioIngresado === usuarioCorrecto && contrasenaIngresada === contrasenaCorrecta) {

        // Guardar el rol ingresado en la memoria del navegador
        localStorage.setItem('sesionRol', rol);

        // Asignar nombres de ejemplo según el rol
        let nombreEjemplo = "";
        if (rol === 'empleado') nombreEjemplo = "Mateo García";
        if (rol === 'analista') nombreEjemplo = "Valeria Rojas";
        if (rol === 'supervisor') nombreEjemplo = "Andrés Castillo";
        if (rol === 'gerente') nombreEjemplo = "Camila Mendoza";

        localStorage.setItem('sesionNombre', nombreEjemplo);

        // Redireccionar
        window.location.href = "Principal.html";
    } else {
        contenedorError.textContent = "Credenciales incorrectas";
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Borramos los datos almacenados
    localStorage.removeItem('sesionRol');
    localStorage.removeItem('sesionNombre');

    // Redirigimos al index
    window.location.href = "index.html";
}


// ================= LÓGICA DEL MENÚ SUPERIOR (Principal.html y futuras páginas) =================

// Este evento se ejecuta automáticamente al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {

    // Buscamos si en la página actual existen los elementos del menú superior
    const spanNombre = document.getElementById('nombre-usuario');
    const spanRol = document.getElementById('rol-usuario');

    if (spanNombre && spanRol) {
        // Recuperamos los datos guardados; si no hay nada, ponemos valores por defecto
        const nombreGuardado = localStorage.getItem('sesionNombre') || "Usuario Desconocido";
        let rolGuardado = localStorage.getItem('sesionRol') || "Sin Rol";

        // Darle formato visual adecuado al rol para imprimirlo en pantalla
        if (rolGuardado === 'empleado') rolGuardado = "Empleado";
        if (rolGuardado === 'analista') rolGuardado = "Analista";
        if (rolGuardado === 'supervisor') rolGuardado = "Supervisor";
        if (rolGuardado === 'gerente') rolGuardado = "Gerente General";

        // Inyectamos el texto en el HTML
        spanNombre.textContent = nombreGuardado;
        spanRol.textContent = rolGuardado;
    }
});