var nextId = 1;

function Tarea(titulo) {
    this.id = nextId++;
    this.titulo = titulo;
    this.estado = 'pendiente';
    this.ts = new Date().getTime();
}


$(function() {
    getTareasDB();
});

/* Crea una nueva tarea en la bd */
function nuevaTarea(title) {
    console.log('nuevaTarea(' + title + ')');
    var tarea = new Tarea(title);
    localStorage.setItem(tarea.id, JSON.stringify(tarea));
    var tareasDB = getTareasDB();
    tareasDB.unshift(tarea.id);
    setTareasDB(tareasDB);
    return tarea;
}

/* Busca una tarea en la bd */
function buscarTarea(id) {
    console.log('buscarTarea(' + id + ')');
    var tarea = localStorage.getItem(id);
    if (tarea && tarea != null) {
        return JSON.parse(tarea);
    }
    return;
}

/* Completa una tarea */
function completarTarea(id) {
    console.log('completarTarea(' + id + ')');
    var tarea = buscarTarea(id);
    if (tarea) {
        tarea.estado = 'completada';
        localStorage.setItem(tarea.id, JSON.stringify(tarea));
    }
}

/* Elimina una tarea de la bd */
function eliminarTarea(id) {
    console.log('eliminarTarea(' + id + ')');
    localStorage.removeItem(id);
    var tareasDB = getTareasDB();
    for (var i = 0; i < tareasDB.length; i++) {
        if (tareasDB[i] == id) {
            tareasDB.splice(i, 1);
            break;
        }
    }
    setTareasDB(tareasDB);
}

function getTareasDB() {
    if (localStorage.getItem('tareasDB')) {
        return JSON.parse(localStorage.getItem('tareasDB'));
    } else {
        return [];
    }
}

function setTareasDB(tareasDB) {
    localStorage.setItem('tareasDB', JSON.stringify(tareasDB));
}