function abrirTab(evento, idTab) {
    // 1. Ocultar todos los contenidos de las pestañas
    const contenidos = document.getElementsByClassName("contenido-tab");
    for (let i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
        contenidos[i].classList.remove("en-pantalla");
    }

    // 2. Quitar la clase 'activo' de todos los botones
    const botones = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botones.length; i++) {
        botones[i].className = botones[i].className.replace(" activo", "");
    }

    // 3. Mostrar la pestaña actual y añadir la clase 'activo' al botón clickeado
    document.getElementById(idTab).style.display = "flex";
    evento.currentTarget.className += " activo";
}