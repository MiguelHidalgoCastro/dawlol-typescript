import { Coche } from "js/models/coche"

export class Idb {
    public conexion: IDBDatabase
    public listaBusqueda: any[]
    constructor(callback: Function) {
        const peticion = indexedDB.open('GestionaCars', 2)
        peticion.onerror = () => { throw 'Error al conectar indexedDB' }
        peticion.onupgradeneeded = (event: any) => {
            this.conexion = event.target.result
            this.conexion.onerror = () => {
                console.log('Error al crear la bd')
            }
            this.crear()
        }
        peticion.onsuccess = (event: any) => {
            this.conexion = event.target.result
            callback()
        }
    }

    crear(): void {
        this.conexion.createObjectStore('listado', { autoIncrement: true })
    }

    insertar(coche: Coche, callback: Function): void {
        const peticion = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado').add(coche)
        peticion.onerror = () => {
            console.log('No se ha podido agregar el coche a la bbdd');
        }
        peticion.onsuccess = (event: any) => {
            coche.id = event.target.result
            console.log(coche.id)
            callback()
        }
    }

    insertarCochePorID(id: number, coche: Object, callback: Function): void {
        const transaction = this.conexion.transaction(['listado'], 'readwrite')
        transaction.objectStore('listado').put(coche, id)
        transaction.oncomplete = () => {
            callback()
        }
    }

    buscar(queBusco: string | null, callback: Function): void {
        const objectStore = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado')
        const cursor1 = objectStore.openCursor()

        cursor1.onerror = () => {
            console.log('No se han cargado los datos');
        }
        this.listaBusqueda = []
        if (queBusco != null) {
            let marca = queBusco
            marca = marca.toLowerCase()


            cursor1.onsuccess = (evento: any) => {
                const cursor = evento.target.result;

                if (cursor) {
                    let comparacion = cursor.value.marca.toLowerCase();
                    let regEx = new RegExp(marca);

                    if (comparacion.match(regEx)) {
                        let c = cursor.value
                        c.id = cursor.key
                        this.listaBusqueda.push(c);

                    }
                    cursor.continue();
                }
                else {
                    callback(this.listaBusqueda)
                }
            }
        }
        else { //getAll
            cursor1.onsuccess = (evento: any) => {
                const cursor = evento.target.result;

                if (cursor) {
                    let c = cursor.value
                    c.id = cursor.key
                    this.listaBusqueda.push(c);
                    cursor.continue();
                }
                else {
                    callback(this.listaBusqueda)
                }
            }
        }
    }

    borrar(id: number, callback: Function): void {
        const transaction = this.conexion.transaction(['listado'], 'readwrite')
        transaction.objectStore('listado').delete(id)
        transaction.oncomplete = () => {
            callback()
        }

    }

    buscarPorID(id: number, callback: Function): void {
        const objectStore = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado')
        const cursor1 = objectStore.openCursor()

        cursor1.onerror = () => {
            console.log('No se han cargado los datos');
        }

        cursor1.onsuccess = (evento: any) => {
            const cursor = evento.target.result;

            if (cursor.key != id) {
                cursor.continue();
            }
            else {
                callback(cursor.value)
            }
        }
    }

}


