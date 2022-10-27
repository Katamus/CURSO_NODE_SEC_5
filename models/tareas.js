const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea (desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(id =>{
            listado.push(this._listado[id]);
        });

        return listado;
    }

    cargarTareas(data){
        data.forEach((info) =>{
            const tarea = new Tarea(info['desc'],info['id']);
            this._listado[tarea.id] = tarea;
        });
    }
}

module.exports = Tareas;