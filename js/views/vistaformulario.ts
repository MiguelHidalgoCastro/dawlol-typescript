import { Vista } from "./vista.js";
import { Coche } from "../models/coche.js";
import { Controlador } from "js/controllers/controlador.js";

export class VistaFormulario extends Vista {

    public controlador: Controlador
    public div: HTMLDivElement

    public btnAceptar: HTMLElement
    public btnVolver: HTMLElement
    public btnModificar: HTMLElement

    public marca: HTMLInputElement
    public modelo: HTMLInputElement
    public fecha: HTMLInputElement
    public enFab: HTMLInputElement
    public descripcion: HTMLInputElement
    public precio: HTMLInputElement
    public extra1: HTMLInputElement
    public extra2: HTMLInputElement
    public extra3: HTMLInputElement
    public extra4: HTMLInputElement
    public extra5: HTMLInputElement
    public imagen: HTMLInputElement
    public vistaPrevia: HTMLImageElement
    public divPrevio: HTMLElement
    public base64: string | ArrayBuffer | null
    public idCoche: number

    constructor(controlador: Controlador, div: HTMLDivElement) {
        super(div)
        this.controlador = controlador

        this.btnAceptar = document.getElementById('btnAceptar')!
        this.btnAceptar.onclick = this.aceptar.bind(this)

        this.btnVolver = document.getElementById('btnCancelar')!
        this.btnVolver.onclick = this.back.bind(this)

        this.btnModificar = document.getElementById('btnModificar')!
        this.btnModificar.onclick = this.modificar.bind(this)
        
        //inputs
        this.marca = <HTMLInputElement>document.getElementById('imarca')
        this.modelo = <HTMLInputElement>document.getElementById('imodelo')
        this.fecha = <HTMLInputElement>document.getElementById('ifecha')
        this.enFab = <HTMLInputElement>document.getElementById('enFab')
        this.descripcion = <HTMLInputElement>document.getElementById('textDescripcion')
        this.precio = <HTMLInputElement>document.getElementById('precio')

        this.extra1 = <HTMLInputElement>document.getElementById('extra1')
        this.extra2 = <HTMLInputElement>document.getElementById('extra2')
        this.extra3 = <HTMLInputElement>document.getElementById('extra3')
        this.extra4 = <HTMLInputElement>document.getElementById('extra4')
        this.extra5 = <HTMLInputElement>document.getElementById('extra5')

        //Imagen base64   
        this.imagen = <HTMLInputElement>document.getElementById('imagen')
        this.vistaPrevia = <HTMLImageElement>document.getElementById('imagenPrevia')!
        this.divPrevio = document.getElementById('divImagenPrevia')!
        this.base64 = ''

        this.imagen.addEventListener('change', () => {
            const archivo = this.imagen.files![0]
            const lector = new FileReader()
            lector.addEventListener('load', () => {
                this.base64 = lector.result
                this.vistaPrevia.src = <string>this.base64
                this.divPrevio.style.display = 'inline-block'
            })
            lector.readAsDataURL(archivo!)
        })
    }

    aceptar(): void {

        //Validamos los campos
        let mensaje = ''
        let mostrarAlerta = false

        // Expresiones regulares
        let expMarca = /^[A-Z][A-z]{3,20}$/
        if (!expMarca.test(this.marca.value)) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.value)) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.value == '') {
            if (mensaje == '')
                mensaje = "Selecciona una fecha valida"
            else
                mensaje = mensaje + "\nSelecciona una fecha valida"
            mostrarAlerta = true
        }
        else {
            //cuando la fecha sea mayor que la de hoy, enfabricación no puede ser si
            //enfab por defecto va a ser si
        }

        //relleno array de extras

        let extras = []

        extras.push(this.extra1.checked)
        extras.push(this.extra2.checked)
        extras.push(this.extra3.checked)
        extras.push(this.extra4.checked)
        extras.push(this.extra5.checked)

        if (this.descripcion.value == '')
            this.descripcion.value = 'No descripción'

        if (mostrarAlerta)
            alert(mensaje)

        else {
            //los empaqueto
            let coche = new Coche(this.marca.value, this.modelo.value, this.fecha.value, this.enFab.value, this.descripcion.value, parseInt(this.precio.value), extras, <string>this.base64!)

            // los mando al controlador como un objeto coche
            this.controlador.insertarCoche(coche)

            // borro los campos
            this.borrarCampos()
        }


    }

    borrarCampos(): void {
        this.marca.value = ''
        this.modelo.value = ''
        this.fecha.value = ''
        this.extra1.checked = false
        this.extra2.checked = false
        this.extra3.checked = false
        this.extra4.checked = false
        this.extra5.checked = false
        this.descripcion.value = ''
        this.base64 = ''
        this.imagen.src = ''
        this.imagen.value = ''
        this.precio.value = ''
        this.enFab.value = ''
        this.divPrevio.style.display = 'none'
        this.vistaPrevia!.src = ''
    }

    back(): void {
        this.borrarCampos()
        this.controlador.back()
        this.controlador.recargar()
    }

    cargarCoche(id: number, coche: Coche, string: string): void {

        this.marca.value = coche.marca
        this.modelo.value = coche.modelo
        this.fecha.value = coche.fechaFabricacion
        this.descripcion.value = coche.descripcion
        this.precio.value = coche.precio.toString()

        this.extra1.checked = coche.extras[0]!
        this.extra2.checked = coche.extras[1]!
        this.extra3.checked = coche.extras[2]!
        this.extra4.checked = coche.extras[3]!
        this.extra5.checked = coche.extras[4]!

        this.enFab.value = coche.enFabricacion

        this.divPrevio.style.display = 'block'
        this.vistaPrevia.src = coche.imagen
        this.idCoche = id


        if (string === 'consultar')
            this.cambiarEstadoCampos(true)
        else
            this.cambiarEstadoCampos(false)



    }

    modificar(): void {
        //Validamos los campos
        let mensaje = ''
        let mostrarAlerta = false

        // Expresiones regulares
        let expMarca = /^[A-Z][A-z]{3,20}$/
        if (!expMarca.test(this.marca.value)) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.value)) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.value == '') {
            if (mensaje == '')
                mensaje = "Selecciona una fecha valida"
            else
                mensaje = mensaje + "\nSelecciona una fecha valida"
            mostrarAlerta = true
        }
        else {
            //cuando la fecha sea mayor que la de hoy, enfabricación no puede ser si
            //enfab por defecto va a ser si
        }

        //relleno array de extras

        let extras = []

        extras.push(this.extra1.checked)
        extras.push(this.extra2.checked)
        extras.push(this.extra3.checked)
        extras.push(this.extra4.checked)
        extras.push(this.extra5.checked)

        if (this.descripcion.value == '')
            this.descripcion.value = 'No descripción'

        if (this.imagen.value == '') {
            let hola = <HTMLImageElement>document.getElementById('imagenPrevia')!
            this.base64 = hola.src
        }

        if (mostrarAlerta)
            alert(mensaje)


        else {
            //los empaqueto
            let coche = new Coche(this.marca.value, this.modelo.value, this.fecha.value, this.enFab.value, this.descripcion.value, parseInt(this.precio.value), extras, <string>this.base64)

            // los mando al controlador como un objeto coche
            this.controlador.insertarCochePorID(this.idCoche, coche)

            //borro los campos
            this.borrarCampos()
        }


    }

    cambiarEstadoCampos(boolean: boolean): void {
        if (boolean) {
            this.marca.disabled = true
            this.modelo.disabled = true
            this.fecha.disabled = true
            this.descripcion.disabled = true
            this.enFab.disabled = true
            this.extra1.disabled = true
            this.extra2.disabled = true
            this.extra3.disabled = true
            this.extra4.disabled = true
            this.extra5.disabled = true
            this.imagen.disabled = true
        }
        else {
            this.marca.disabled = false
            this.modelo.disabled = false
            this.fecha.disabled = false
            this.descripcion.disabled = false
            this.enFab.disabled = false
            this.extra1.disabled = false
            this.extra2.disabled = false
            this.extra3.disabled = false
            this.extra4.disabled = false
            this.extra5.disabled = false
            this.imagen.disabled = false
        }

    }
}