import { Idb } from '../servicios/idb.js';
import { Controlador } from '../controllers/controlador.js'
import { Coche } from './coche.js';

export class Modelo {
    public controlador: Controlador
    public idb: Idb
    constructor(controlador: Controlador, callback: Function) {
        this.controlador = controlador
        this.idb = new Idb(callback)
    }
   
    insertar(coche: Coche, callback: Function): void {
        this.idb.insertar(coche, callback)
    }
   
    buscar(marca: string | null, callback: Function): void {
        this.idb.buscar(marca, callback)
    }
    
    borrar(id: number, callback: Function): void {
        this.idb.borrar(id, callback)
    }

    buscarPorID(id: number, callback: Function): void {
        this.idb.buscarPorID(id, callback)
    }
   
    insertarCochePorID(id: number, coche: Object, callback: Function): void {
        this.idb.insertarCochePorID(id, coche, callback)
    }
}
