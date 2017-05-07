var navPila = [];

var fnRefrescar = {
    'pgPrincipal': refrescarPrincipal,
    'pgNuevaTarea': refrescarNuevaTarea,
    'pgEditarTarea': refrescarEditarTarea,
    'pgTodasTareas': refrescarTodasTareas
}

function cambiarPagina(pag, pagAnterior) {
    console.log('cambiarPagina(' + pag + ',' + pagAnterior + ')');
    if (pagAnterior) $('#' + pagAnterior).css('display', none);
    $('#' + pag).css('display', block);
    //ajustar altura
    $('#' + pag + ' .content').height('auto');
    //añadir pie de página
    $('#' + pag + ' .content').height($('#' + pag + ' .content').height() +
        $('#' + pag + ' .footer').height());
    //Ocultar barra de navegación
    window.scrollTo(0, 1);
}

function navSaltar(pag) {
    console.log('navSalta(' + pag + ')');
    //1. recuperar la página anterior
    var pagAnterior;
    if (navPila.length > 0) pagAnterior = navPila[navPila.length - 1];
    //2. apilar página nueva
    navPila.push(pag);
    //3. refrescar página nueva
    var args = [];
    for (var i = 0; i < arguments.length; i++) args[i - 1] = arguments[i];
    fnRefrescar[pag](args);
    //4. cambiar página
    cambiarPagina(pag, pagAnterior);
}

function navAtras() {
    console.log('navAtras()');
    //1. desapilar actual
    var pgActual = navPila.pop();
    if (navPila.length > 0) {
        //2. obtener anterior
        var pgAnterior = navPila[navPila.length - 1];
        //3. refrescar
        fnRefrescar[pgAnterior]();
        //4. mostrar
        cambiarPagina(pgAnterior, pgActual);
    }
}

//Rutinas de refresco

function refrescarPrincipal() {
    console.log('refrescarPrincipal()');
    $('#pgPrincipal .lista-tarea').empty();
    var numTareas = 0;
    var i = 0;
    while (numTareas < 5 && i < tareasDB.length) {
        if (tareasDB[i].estado == 'pendiente') {
            $('#pgPrincipal .lista-tarea').append('<li ' +
                'onclick="navSaltar(\'pgEditarTarea\',' +
                tareasDB[i].id + ')">Tarea: ' + tareasDB[i].titulo + '</li>');
            numTareas++;
        }
        i++;
    }

}

function refrescarNuevaTarea() {
    console.log('refrescarNuevaTarea()');
    $('pgNuevaTarea #txtTitulo').val('');
}

function refrescarEditarTarea(id) {
    console.log('refrescarEditarTarea(' + id + ')');
    if (!id) return;
    var tarea = buscarTarea(id);
    if (!tarea) {
        alert('error, tarea con id ' + id + ' no existe');
        return;
    }
    //detalle tarea
    var html = '<legend>Tarea: ' + tarea.titulo + '</legend>'
    var date = new Date(tarea.ts);
    html += '<p class="' + tarea.estado + '">' + tarea.estado + '</p><p class="' +
        tarea.estado + '">' + [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") +
        '</p>';
    $('#pgEditarTarea .content .fieldset').html(html);
    //botón completar
    html = tarea.estado == 'pendiente' ? '<a id="btCompletar"' +
        'onclick="completarTarea(' + id + '); navAtras();" class="boton"' +
        ' href="#">Completar</a>' : '';
    html += '<a id="btEliminar"' +
        'onclick="eliminarTarea(' + id + '); navAtras();" class="boton"' +
        ' href="#">Eliminar</a>';
    $('#pgEditarTarea .footer').html(html);
}

function refrescarPrincipal() {
    console.log('refrescarPrincipal()');

}