require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,inquirerPausa,leerInput,listadoTareaBorrar,confirmar,mostrarlistadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


//const { mostrarMenu,pausa } = require('./helpers/mensajes');

const main = async () => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do{
        //imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarlistadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const  id = await listadoTareaBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('Esta seguro ?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await inquirerPausa();

    } while(opt !== '0');
}

main();