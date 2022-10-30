const Tarea = require("./tarea");
const colors = require("colors");
class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea(id= ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
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

    cargarTareasFromArray(data = []){
        data.forEach((info) =>{
            const tarea = new Tarea(info['desc'],info['id']);
            tarea.completadoEn = info['completadoEn'];
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        this.imprimirListado(this.listadoArr);
    }

    imprimirListado(lista = []){
        let contado =1 ;
        lista.forEach(data => console.log(`${ colors.green(contado++)} ${data.desc} :: ${data.completadoEn ? colors.green(data.completadoEn):'Pendiente'.red}`));
    }

    listarPendientesCompletadas( completadas = true){
        let tareas = [];
        if(completadas){
            tareas = this.listadoArr.filter((data) => data.completadoEn );
        }else{
            tareas = this.listadoArr.filter((data) => !data.completadoEn );
        }
        this.imprimirListado(tareas);
    }

    toggleCompletadas(ids= []){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        }
        )

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                const item = this._listado[tarea.id];
                item.completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;