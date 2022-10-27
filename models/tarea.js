const {v4: uudiv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc,id = null){
        
        this.id = id ? id: uudiv4();
        this.desc = desc;
    }

}

module.exports = Tarea;
