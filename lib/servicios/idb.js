export class Idb {
    constructor(callback) {
        const peticion = indexedDB.open('GestionaCars', 2);
        peticion.onerror = () => { throw 'Error al conectar indexedDB'; };
        peticion.onupgradeneeded = (event) => {
            this.conexion = event.target.result;
            this.conexion.onerror = () => {
                console.log('Error al crear la bd');
            };
            this.crear();
        };
        peticion.onsuccess = (event) => {
            this.conexion = event.target.result;
            callback();
        };
    }
    crear() {
        this.conexion.createObjectStore('listado', { autoIncrement: true });
    }
    insertar(coche, callback) {
        const peticion = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado').add(coche);
        peticion.onerror = () => {
            console.log('No se ha podido agregar el coche a la bbdd');
        };
        peticion.onsuccess = (event) => {
            coche.id = event.target.result;
            console.log(coche.id);
            callback();
        };
    }
    insertarCochePorID(id, coche, callback) {
        const transaction = this.conexion.transaction(['listado'], 'readwrite');
        transaction.objectStore('listado').put(coche, id);
        transaction.oncomplete = () => {
            callback();
        };
    }
    buscar(queBusco, callback) {
        const objectStore = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado');
        const cursor1 = objectStore.openCursor();
        cursor1.onerror = () => {
            console.log('No se han cargado los datos');
        };
        this.listaBusqueda = [];
        if (queBusco != null) {
            let marca = queBusco;
            marca = marca.toLowerCase();
            cursor1.onsuccess = (evento) => {
                const cursor = evento.target.result;
                if (cursor) {
                    let comparacion = cursor.value.marca.toLowerCase();
                    let regEx = new RegExp(marca);
                    if (comparacion.match(regEx)) {
                        let c = cursor.value;
                        c.id = cursor.key;
                        this.listaBusqueda.push(c);
                    }
                    cursor.continue();
                }
                else {
                    callback(this.listaBusqueda);
                }
            };
        }
        else {
            cursor1.onsuccess = (evento) => {
                const cursor = evento.target.result;
                if (cursor) {
                    let c = cursor.value;
                    c.id = cursor.key;
                    this.listaBusqueda.push(c);
                    cursor.continue();
                }
                else {
                    callback(this.listaBusqueda);
                }
            };
        }
    }
    borrar(id, callback) {
        const transaction = this.conexion.transaction(['listado'], 'readwrite');
        transaction.objectStore('listado').delete(id);
        transaction.oncomplete = () => {
            callback();
        };
    }
    buscarPorID(id, callback) {
        const objectStore = this.conexion.transaction(['listado'], 'readwrite').objectStore('listado');
        const cursor1 = objectStore.openCursor();
        cursor1.onerror = () => {
            console.log('No se han cargado los datos');
        };
        cursor1.onsuccess = (evento) => {
            const cursor = evento.target.result;
            if (cursor.key != id) {
                cursor.continue();
            }
            else {
                callback(cursor.value);
            }
        };
    }
}
//# sourceMappingURL=idb.js.map