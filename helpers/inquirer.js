require('colors');
const inquirer = require('inquirer');


const preguntasOpciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer ?',
        choices: [{
            value: '1',
            name: `${'1'.green}. Crear tarea`
        },{
            value: '2',
            name: `${'2'.green}. Listar tareas`
        },{
            value: '3',
            name: `${'3'.green}. Listar tareas completadas`
        },{
            value: '4',
            name: `${'4'.green}. Listar tareas pendientes`
        },{
            value: '5',
            name: `${'5'.green}. Completar tarea(s)`
        },{
            value: '6',
            name: `${'6'.green}. Borrar tarea`
        },{
            value: '0',
            name: `${'0'.green}. Salir`
        }]
    }
];

const pausaOpciones = [
    {
        type: 'input',
        name: 'input',
        message: `Presione ${'ENTER'.green} para continuar `
    }
];


const inquirerMenu = async () => {
    //console.clear();
    console.log('============================'.green);
    console.log(' Seleccione una opción'.white);
    console.log('============================\n'.green);

    const prompt = inquirer.createPromptModule();

    const {opcion} = await prompt(preguntasOpciones);

    return  opcion;
}

const inquirerPausa = async() => {

    const prompt = inquirer.createPromptModule();

    const {input} = await prompt(pausaOpciones);

    return  input;

}

const leerInput = async(message) => {
    const question  = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length ===0 ){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const prompt = await inquirer.createPromptModule();
    const {desc} = await prompt(question);
    return desc;

}

const listadoTareaBorrar = async(tareas = []) => {

    const choices = tareas.map( (tarea,i) => {

        const idx = `${i+1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    
    const prompt = inquirer.createPromptModule();

    choices.unshift({
        value: '0',
        name: '0'.green+ ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await prompt(preguntas);

    return id;
}

const mostrarlistadoChecklist = async(tareas = []) => {

    const choices = tareas.map( (tarea,i) => {

        const idx = `${i+1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea['completadoEn']) ? true : false
        }
    });
    
    const prompt = inquirer.createPromptModule();

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const {ids} = await prompt(pregunta);

    return ids;
}

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name:'ok',
        message
    }];

    const prompt = inquirer.createPromptModule();
    const {ok} = await prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarlistadoChecklist
}