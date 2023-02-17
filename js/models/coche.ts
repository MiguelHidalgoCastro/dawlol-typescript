export class Coche {
    public marca: string
    public modelo: string
    public fechaFabricacion: string
    public enFabricacion: string
    public descripcion: string
    public precio: number
    public extras: boolean[]
    public imagen: string
    public id: number
    constructor(marca: string, modelo: string, fecha: string, enFab: string, descripcion: string, precio: number, extras: boolean[], imagen: string) {
        this.marca = marca
        this.modelo = modelo
        this.fechaFabricacion = fecha
        this.descripcion = descripcion
        this.enFabricacion = enFab
        this.extras = extras
        this.imagen = imagen
        this.precio = precio
    }
}