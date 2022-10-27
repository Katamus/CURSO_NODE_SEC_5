require('colors');
const { inquirerMenu,inquirerPausa,leerInput } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


//const { mostrarMenu,pausa } = require('./helpers/mensajes');

const main = async () => {

    const tareas = new Tareas();

    console.log('Hola Mundo');
    
    do{

        
        opt = await inquirerMenu();


        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado);
                break;
        
            default:
                break;
        }


        console.log({opt});
        if (opt !== '0') {
            prueba = await inquirerPausa();
            console.log({prueba});
       
        } 
    } while(opt !== '0');
}

main();