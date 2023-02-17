import { Idb } from '../servicios/idb.js';
export class Modelo {
    constructor(controlador, callback) {
        this.controlador = controlador;
        this.idb = new Idb(callback);
    }
    insertar(coche, callback) {
        this.idb.insertar(coche, callback);
    }
    buscar(marca, callback) {
        this.idb.buscar(marca, callback);
    }
    borrar(id, callback) {
        this.idb.borrar(id, callback);
    }
    buscarPorID(id, callback) {
        this.idb.buscarPorID(id, callback);
    }
    insertarCochePorID(id, coche, callback) {
        this.idb.insertarCochePorID(id, coche, callback);
    }
}
//# sourceMappingURL=modelo.js.map