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

function mostrarInfoEmpleado() {
    const select = document.getElementById('select-empleado');
    const container = document.getElementById('info-empleado');
    const img = document.getElementById('img-empleado');

    if(select.value !== 'none') {
        container.classList.remove('oculto');
        // Asignamos la imagen correspondiente (Pos1, Pos2, etc)
        img.src = 'Pos' + select.value + '.png';
        // Aquí podrías cargar datos reales desde una base de datos o JSON
        document.getElementById('val-he').textContent = Math.floor(Math.random() * 20);
        document.getElementById('val-rn').textContent = Math.floor(Math.random() * 10);
        document.getElementById('val-ern').textContent = Math.floor(Math.random() * 5);
    } else {
        container.classList.add('oculto');
    }
}

// ================= LÓGICA PARA GESTIÓN DE PERSONAL =================

// Base de datos simulada de empleados
const baseDatosEmpleados = [
    { documento: "1111111111", nombres: "Carlos", apellidos: "Ramírez", tipoDoc: "CC", nacimiento: "1990-05-15", correo: "cramirez@rhinosas.com.co", telefono: "3001111111", foto: "Pos1.png", hNormales: 160, hExtra: 10, hNocturno: 5, hExtraNoc: 2 },
    { documento: "2222222222", nombres: "Laura", apellidos: "Gómez", tipoDoc: "CC", nacimiento: "1992-08-20", correo: "lgomez@rhinosas.com.co", telefono: "3002222222", foto: "Pos2.png", hNormales: 150, hExtra: 0, hNocturno: 15, hExtraNoc: 0 },
    { documento: "3333333333", nombres: "Mateo", apellidos: "Vargas", tipoDoc: "CC", nacimiento: "1995-11-10", correo: "mvargas@rhinosas.com.co", telefono: "3003333333", foto: "Pos3.png", hNormales: 160, hExtra: 12, hNocturno: 0, hExtraNoc: 0 },
    { documento: "4444444444", nombres: "Andrea", apellidos: "Castro", tipoDoc: "CC", nacimiento: "1991-03-25", correo: "acastro@rhinosas.com.co", telefono: "3004444444", foto: "Pos4.png", hNormales: 160, hExtra: 5, hNocturno: 20, hExtraNoc: 5 },
    { documento: "5555555555", nombres: "Felipe", apellidos: "Martínez", tipoDoc: "CC", nacimiento: "1988-07-30", correo: "fmartinez@rhinosas.com.co", telefono: "3005555555", foto: "Pos5.png", hNormales: 140, hExtra: 0, hNocturno: 0, hExtraNoc: 0 },
    { documento: "6666666666", nombres: "Valentina", apellidos: "Ruiz", tipoDoc: "CE", nacimiento: "1997-12-05", correo: "vruiz@rhinosas.com.co", telefono: "3006666666", foto: "Pos6.png", hNormales: 160, hExtra: 8, hNocturno: 10, hExtraNoc: 4 }
];

function buscarEmpleado() {
    const cedulaBuscada = document.getElementById('buscador-cedula').value;
    const empleado = baseDatosEmpleados.find(emp => emp.documento === cedulaBuscada);
    const contenedorPerfil = document.getElementById('perfil-empleado');

    if (empleado) {
        // Llenar los datos del formulario
        document.getElementById('perfil-foto-preview').src = empleado.foto;
        document.getElementById('perfil-h-normales').textContent = empleado.hNormales;
        document.getElementById('perfil-h-extra').textContent = empleado.hExtra;
        document.getElementById('perfil-h-nocturno').textContent = empleado.hNocturno;
        document.getElementById('perfil-h-extra-noc').textContent = empleado.hExtraNoc;

        document.getElementById('perfil-nombres').value = empleado.nombres;
        document.getElementById('perfil-apellidos').value = empleado.apellidos;
        document.getElementById('perfil-tipo-doc').value = empleado.tipoDoc;
        document.getElementById('perfil-documento').value = empleado.documento;
        document.getElementById('perfil-nacimiento').value = empleado.nacimiento;
        document.getElementById('perfil-correo').value = empleado.correo;
        document.getElementById('perfil-telefono').value = empleado.telefono;

        // Asegurarnos de que esté en modo lectura al buscar
        cancelarEdicion();

        // Mostrar la tarjeta
        contenedorPerfil.classList.remove('oculto');
    } else {
        alert('Empleado no encontrado en el sistema. Verifique el número de documento.');
        contenedorPerfil.classList.add('oculto');
    }
}

// Función para activar los inputs y cambiar los botones
function habilitarEdicion() {
    const campos = document.querySelectorAll('.edit-field');
    campos.forEach(campo => campo.disabled = false);

    document.getElementById('btn-habilitar-edicion').classList.add('oculto');
    document.getElementById('btn-eliminar').classList.add('oculto');

    document.getElementById('btn-guardar-edicion').classList.remove('oculto');
    document.getElementById('btn-cancelar-edicion').classList.remove('oculto');
}

// Función para volver al modo lectura sin guardar (o después de guardar)
function cancelarEdicion() {
    const campos = document.querySelectorAll('.edit-field');
    campos.forEach(campo => campo.disabled = true);

    document.getElementById('btn-habilitar-edicion').classList.remove('oculto');
    document.getElementById('btn-eliminar').classList.remove('oculto');

    document.getElementById('btn-guardar-edicion').classList.add('oculto');
    document.getElementById('btn-cancelar-edicion').classList.add('oculto');
}

function guardarEdicion() {
    // Aquí iría la lógica real para actualizar la base de datos
    alert('Datos del empleado actualizados exitosamente.');
    cancelarEdicion();
}

function eliminarEmpleado() {
    // Diálogo de confirmación nativo del navegador
    const confirmacion = confirm("¿Está completamente seguro de que desea eliminar a este empleado del sistema? Esta acción es irreversible.");

    if (confirmacion) {
        alert('El empleado ha sido eliminado del sistema.');
        document.getElementById('perfil-empleado').classList.add('oculto');
        document.getElementById('buscador-cedula').value = "";
    }
}

// ================= LÓGICA PARA GESTIÓN DE SOLICITUDES =================

// Función para desplegar u ocultar el contenido de la solicitud
function toggleSolicitud(idContenido) {
    const contenido = document.getElementById(idContenido);
    if (contenido.classList.contains('oculto')) {
        contenido.classList.remove('oculto');
    } else {
        contenido.classList.add('oculto');
    }
}

// Función para abrir el modal de resolución (Aprobar, Pendiente, Rechazar)
function abrirModalResolucion(accion, nombreEmpleado) {
    const modal = document.getElementById('modal-resolucion');
    const titulo = document.getElementById('titulo-modal-resolucion');
    const subtitulo = document.getElementById('texto-candidato-resolucion');
    const btnConfirmar = document.getElementById('btn-confirmar-resolucion');

    // Configurar textos
    titulo.textContent = `${accion} Solicitud`;
    subtitulo.innerHTML = `Empleado: <strong>${nombreEmpleado}</strong>`;

    // Cambiar el color del botón de confirmar en el modal según la acción
    btnConfirmar.className = 'btn-accion-principal'; // Resetear clase base

    if (accion === 'Aprobar') {
        btnConfirmar.style.backgroundColor = '#03923e'; // Verde
        btnConfirmar.style.color = '#FFFFFF';
    } else if (accion === 'Rechazar') {
        btnConfirmar.style.backgroundColor = '#D32F2F'; // Rojo
        btnConfirmar.style.color = '#FFFFFF';
    } else if (accion === 'Pendiente') {
        btnConfirmar.style.backgroundColor = '#F1C40F'; // Amarillo
        btnConfirmar.style.color = '#000000';
    }

    // Mostrar modal
    modal.classList.remove('oculto');
}

function cerrarModalResolucion() {
    document.getElementById('modal-resolucion').classList.add('oculto');
}

// ================= LÓGICA PARA GESTIÓN DE EVALUACIONES (GERENTE) =================

// Base de datos específica para evaluaciones con roles variados
const bdEvaluaciones = {
    "1111111111": { nombre: "Carlos Ramírez", rol: "Desarrollador Backend", foto: "Pos1.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Tiempo de culminación de tareas"],
            calidad: ["Precisión en entregables", "Atención al detalle"],
            colaboracion: ["Trabajo en equipo", "Comunicación asertiva"],
            cumplimiento: ["Seguimiento de normativas", "Asistencia a reuniones"]
        }
    },
    "2222222222": { nombre: "Laura Gómez", rol: "Asistente Contable", foto: "Pos2.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Entrega de balances a tiempo"],
            calidad: ["Cero errores en digitación", "Organización de facturas"],
            colaboracion: ["Disposición para auditorías", "Comunicación asertiva"],
            cumplimiento: ["Uso correcto del software contable", "Asistencia a reuniones"]
        }
    },
    "3333333333": { nombre: "Mateo Vargas", rol: "Personal de Aseo", foto: "Pos3.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Cumplimiento de rondas diarias"],
            calidad: ["Limpieza de áreas comunes", "Manejo adecuado de insumos"],
            colaboracion: ["Trabajo en equipo", "Reporte de daños a mantenimiento"],
            cumplimiento: ["Uso de dotación y EPP", "Seguimiento de normativas"]
        }
    },
    "4444444444": { nombre: "Andrea Castro", rol: "Coordinadora de Transporte", foto: "Pos4.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Despacho de vehículos a tiempo"],
            calidad: ["Optimización de rutas", "Control de combustible"],
            colaboracion: ["Comunicación con conductores", "Atención a proveedores"],
            cumplimiento: ["Revisión de documentos vehiculares", "Reporte de siniestros"]
        }
    },
    "5555555555": { nombre: "Felipe Martínez", rol: "Diseñador UX/UI", foto: "Pos5.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Tiempo de culminación de prototipos"],
            calidad: ["Innovación visual", "Atención al detalle en interfaces"],
            colaboracion: ["Recepción de feedback", "Colaboración con desarrolladores"],
            cumplimiento: ["Seguimiento de guías de marca", "Asistencia a dailys"]
        }
    },
    "6666666666": { nombre: "Valentina Ruiz", rol: "Ingeniera de Requisitos", foto: "Pos6.png",
        criterios: {
            puntualidad: ["Hora de llegada", "Entrega de documentación"],
            calidad: ["Claridad en historias de usuario", "Precisión en levantamiento de datos"],
            colaboracion: ["Comunicación con el cliente", "Apoyo al equipo técnico"],
            cumplimiento: ["Uso de estándares UML", "Asistencia a reuniones"]
        }
    }
};

let empleadoActualEval = null;

function buscarParaEvaluacion() {
    const doc = document.getElementById('buscador-evaluacion').value;
    const empleado = bdEvaluaciones[doc];

    if (empleado) {
        empleadoActualEval = empleado;

        // Llenar datos básicos
        document.getElementById('eval-foto').src = empleado.foto;
        document.getElementById('eval-nombre').textContent = empleado.nombre;
        document.getElementById('eval-rol').textContent = empleado.rol;

        // Renderizar listas de criterios en la vista
        renderizarListaCriterios('display-puntualidad', empleado.criterios.puntualidad);
        renderizarListaCriterios('display-calidad', empleado.criterios.calidad);
        renderizarListaCriterios('display-colaboracion', empleado.criterios.colaboracion);
        renderizarListaCriterios('display-cumplimiento', empleado.criterios.cumplimiento);

        document.getElementById('panel-evaluacion').classList.remove('oculto');
    } else {
        alert("Empleado no encontrado.");
        document.getElementById('panel-evaluacion').classList.add('oculto');
    }
}

function renderizarListaCriterios(idContenedor, arrayCriterios) {
    const ul = document.getElementById(idContenedor);
    ul.innerHTML = "";
    arrayCriterios.forEach(crit => {
        ul.innerHTML += `<li>${crit}</li>`;
    });
}

function abrirModalCriterios() {
    document.getElementById('modal-nombre-empleado').textContent = empleadoActualEval.nombre;

    // Cargar los inputs en el modal
    cargarInputsEdicion('edit-puntualidad', empleadoActualEval.criterios.puntualidad);
    cargarInputsEdicion('edit-calidad', empleadoActualEval.criterios.calidad);
    cargarInputsEdicion('edit-colaboracion', empleadoActualEval.criterios.colaboracion);
    cargarInputsEdicion('edit-cumplimiento', empleadoActualEval.criterios.cumplimiento);

    document.getElementById('modal-criterios').classList.remove('oculto');
}

function cerrarModalCriterios() {
    document.getElementById('modal-criterios').classList.add('oculto');
}

function cargarInputsEdicion(idContenedor, arrayCriterios) {
    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = "";
    arrayCriterios.forEach(crit => {
        agregarCriterioInput(idContenedor, crit);
    });
}

// Función para agregar una fila de input para un criterio
function agregarCriterioInput(idContenedor, valor = "") {
    const contenedor = document.getElementById(idContenedor);
    const div = document.createElement('div');
    div.className = 'item-criterio-edit';

    div.innerHTML = `
        <input type="text" class="input-brutalista" value="${valor}" placeholder="Escriba el criterio...">
        <button class="btn-eliminar-criterio" onclick="eliminarCriterioInput(this, '${idContenedor}')">X</button>
    `;
    contenedor.appendChild(div);
}

// Función para eliminar asegurando que siempre quede 1 mínimo
function eliminarCriterioInput(btn, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor.children.length > 1) {
        contenedor.removeChild(btn.parentElement);
    } else {
        alert("Atención: Debe existir al menos un (1) criterio de evaluación para esta categoría.");
    }
}

// Función para guardar los cambios y actualizar la vista
function guardarCriterios() {
    // Recolectar valores de los inputs
    empleadoActualEval.criterios.puntualidad = extraerValoresInputs('edit-puntualidad');
    empleadoActualEval.criterios.calidad = extraerValoresInputs('edit-calidad');
    empleadoActualEval.criterios.colaboracion = extraerValoresInputs('edit-colaboracion');
    empleadoActualEval.criterios.cumplimiento = extraerValoresInputs('edit-cumplimiento');

    // Refrescar la vista principal
    renderizarListaCriterios('display-puntualidad', empleadoActualEval.criterios.puntualidad);
    renderizarListaCriterios('display-calidad', empleadoActualEval.criterios.calidad);
    renderizarListaCriterios('display-colaboracion', empleadoActualEval.criterios.colaboracion);
    renderizarListaCriterios('display-cumplimiento', empleadoActualEval.criterios.cumplimiento);

    cerrarModalCriterios();
    alert("Criterios de evaluación actualizados exitosamente en el sistema.");
}

function extraerValoresInputs(idContenedor) {
    const inputs = document.getElementById(idContenedor).querySelectorAll('input');
    const valores = [];
    inputs.forEach(input => {
        if(input.value.trim() !== "") {
            valores.push(input.value.trim());
        }
    });
    // Fallback de seguridad en caso de que borren el texto del único input
    if (valores.length === 0) valores.push("Criterio general");
    return valores;
}

// Funciones para los modales de contraseña
function abrirModal(id) {
    document.getElementById(id).classList.remove('oculto');
}

function cerrarModal(id) {
    document.getElementById(id).classList.add('oculto');
}

// ================= FUNCIONES PARA EL ROL VISITANTE =================

// Alternar despliegue de información detallada de una oferta
function toggleDetalleOferta(idOferta) {
    const contenedor = document.getElementById(idOferta);
    if (contenedor) {
        contenedor.classList.toggle('oculto');
    }
}

// Abrir modal de postulación
function abrirModalAplicar(nombreOferta) {
    const modal = document.getElementById('modal-aplicar');
    const tituloModal = document.getElementById('nombre-oferta-modal');
    if (modal && tituloModal) {
        tituloModal.textContent = "Cargo: " + nombreOferta;
        modal.classList.remove('oculto');
    }
}

// Cerrar modal de postulación
function cerrarModalAplicar() {
    const modal = document.getElementById('modal-aplicar');
    if (modal) {
        modal.classList.add('oculto');
    }
}

// Confirmar envío de postulación
function enviarAplicacion(event) {
    event.preventDefault();
    alert("¡Tu postulación ha sido enviada con éxito!");
    cerrarModalAplicar();
}

// Retirar aplicación guardada
function retirarAplicacion(boton) {
    if (confirm("¿Estás seguro de que deseas retirar tu aplicación a esta oferta?")) {
        const tarjeta = boton.closest('.tarjeta-historial');
        if (tarjeta) {
            tarjeta.remove();
        }
    }
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

