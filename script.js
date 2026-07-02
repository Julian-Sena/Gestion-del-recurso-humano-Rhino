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

// ================= LÓGICA PARA GESTIÓN DE OFERTAS =================

function desplegarPostulantes(idOferta) {
    const contenedor = document.getElementById(idOferta);

    // Alternar la clase 'oculto'
    if (contenedor.classList.contains('oculto')) {
        contenedor.classList.remove('oculto');
    } else {
        contenedor.classList.add('oculto');
    }
}

// Función para abrir el modal y recibir el nombre del candidato
function abrirModalContratacion(nombreCandidato) {
    // Cambiamos el texto del modal para que muestre el nombre real
    document.getElementById('texto-candidato-modal').innerHTML = `Candidato: <strong>${nombreCandidato}</strong>`;

    // Mostramos el modal quitando la clase 'oculto'
    document.getElementById('modal-contratacion').classList.remove('oculto');
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal-contratacion').classList.add('oculto');
}

// ================= LÓGICA DEL MENÚ SUPERIOR (Principal.html y futuras páginas) =================

document.addEventListener('DOMContentLoaded', () => {

    const spanNombre = document.getElementById('nombre-usuario');
    const spanRol = document.getElementById('rol-usuario');

    if (spanNombre && spanRol) {
        const nombreGuardado = localStorage.getItem('sesionNombre') || "Usuario Desconocido";
        let rolGuardado = localStorage.getItem('sesionRol') || "empleado";

        // 1. INYECCIÓN DE DATOS DEL USUARIO
        let nombreRolVisible = "";
        if (rolGuardado === 'empleado') nombreRolVisible = "Empleado";
        if (rolGuardado === 'analista') nombreRolVisible = "Analista";
        if (rolGuardado === 'supervisor') nombreRolVisible = "Supervisor";
        if (rolGuardado === 'gerente') nombreRolVisible = "Gerente General";

        spanNombre.textContent = nombreGuardado;
        spanRol.textContent = nombreRolVisible;


        // 2. LÓGICA DE PERMISOS (MOSTRAR/OCULTAR BOTONES)

        // Primero, ocultamos todos los botones por defecto
        const todosLosBotones = document.querySelectorAll('.nav-btn');
        todosLosBotones.forEach(btn => btn.style.display = 'none');

        // Todos los roles comparten estos 3 botones, así que los mostramos siempre
        document.getElementById('nav-inicio').style.display = 'flex';
        document.getElementById('nav-horarios').style.display = 'flex';
        document.getElementById('nav-solicitudes').style.display = 'flex';

        // Ahora mostramos los botones específicos según el rol guardado
        if (rolGuardado === 'empleado') {
            document.getElementById('nav-resultados').style.display = 'flex';

        } else if (rolGuardado === 'supervisor') {
            document.getElementById('nav-gestion-horarios').style.display = 'flex';
            document.getElementById('nav-personal').style.display = 'flex';
            document.getElementById('nav-gestion-solicitudes').style.display = 'flex';

        } else if (rolGuardado === 'analista') {
            document.getElementById('nav-gestion-ofertas').style.display = 'flex';

        } else if (rolGuardado === 'gerente') {
            document.getElementById('nav-gestion-horarios').style.display = 'flex';
            document.getElementById('nav-personal').style.display = 'flex';
            document.getElementById('nav-gestion-solicitudes').style.display = 'flex';
            document.getElementById('nav-gestion-evaluaciones').style.display = 'flex';
        }

        // 3. ARREGLO VISUAL DE LOS BORDES LATERALES
        if (window.innerWidth > 768) {
            const botonesVisibles = Array.from(todosLosBotones).filter(btn => btn.style.display === 'flex');

            // Nos aseguramos de que todos tengan borde derecho y ninguno izquierdo por defecto
            botonesVisibles.forEach(btn => {
                btn.style.borderRight = '5px solid #000000';
                btn.style.borderLeft = 'none';
            });

            // Al primer botón visible de la lista le ponemos un borde izquierdo para "cerrar" el menú
            if (botonesVisibles.length > 0) {
                botonesVisibles[0].style.borderLeft = '5px solid #000000';
            }
        }
    }
});