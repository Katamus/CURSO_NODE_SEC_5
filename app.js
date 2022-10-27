require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,inquirerPausa,leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


//const { mostrarMenu,pausa } = require('./helpers/mensajes');

const main = async () => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareas(tareasDB);
        console.log(tareas._listado);
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
                console.log(tareas.listadoArr);
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);


        await inquirerPausa();

    } while(opt !== '0');
}

main();