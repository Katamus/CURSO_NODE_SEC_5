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

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput
}