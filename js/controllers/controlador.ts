import { VistaLista } from "../views/vistalista.js"
import { VistaFormulario } from "../views/vistaformulario.js"
import { Modelo } from "../models/modelo.js"
import { VistaTienda } from "../views/vistatienda.js"
import { Coche } from "js/models/coche.js"

export class Controlador {

    public divTienda: HTMLDivElement
    public divListaCRUD: HTMLDivElement
    public divFormulario: HTMLDivElement
    public divMensajes: HTMLElement

    public vistaTienda: VistaTienda
    public vistaListaCoches: VistaLista
    public vistaFormulario: VistaFormulario
    /* H3 */
    public tituloCrear: HTMLElement
    public tituloModificar: HTMLElement
    public tituloConsultar: HTMLElement

    /* Buttons */
    public btnAceptar: HTMLElement
    public btnModificar: HTMLElement

    /* Imágenes previas */
    public imagenNav: HTMLElement

    /* Mensajes H1 */
    public mensajeCrear: HTMLElement
    public mensajeModificar: HTMLElement
    public mensajeBorrar: HTMLElement

    /* Span Navbar */
    public btnCrear: HTMLElement
    public btnLista: HTMLElement
    public btnTienda: HTMLElement

    /* Modelo */
    public modelo: Modelo

    /**
     * Constructor
     */
    constructor() {
        window.onload = this.iniciar.bind(this)
    }

    iniciar(): void {
        /*Containers de los divs*/

        this.divTienda = <HTMLDivElement>document.getElementById('vistaTienda')!
        this.divListaCRUD = <HTMLDivElement>document.getElementById('vistaListaCRUD')!
        this.divFormulario = <HTMLDivElement>document.getElementById('vistaFormulario')!
        this.divMensajes = document.getElementById('mensajes')!



        this.vistaTienda = new VistaTienda(this, this.divTienda)
        this.vistaListaCoches = new VistaLista(this, this.divListaCRUD)
        this.vistaFormulario = new VistaFormulario(this, this.divFormulario)

        /*Para ocultar titulo y botones del formulario */
        this.tituloCrear = document.getElementById('tituloCrear')!
        this.tituloModificar = document.getElementById('tituloModificar')!
        this.tituloConsultar = document.getElementById('tituloConsultar')!

        this.btnAceptar = document.getElementById('btnAceptar')!
        this.btnModificar = document.getElementById('btnModificar')!

        this.imagenNav = document.getElementById('imgNav')!
        this.imagenNav.onclick = this.recargar.bind(this)


        /*Mensajes */

        this.mensajeCrear = document.getElementById('mensajeCrear')!
        this.mensajeModificar = document.getElementById('mensajeModificar')!
        this.mensajeBorrar = document.getElementById('mensajeBorrar')!

        /*Localizo botones Navbar*/
        this.btnCrear = document.getElementById('addCoche')!
        this.btnCrear.onclick = this.mostrarFormularioCrear.bind(this)

        this.btnLista = document.getElementById('lista')!
        this.btnLista.onclick = this.mostrarIndex.bind(this)

        this.btnTienda = document.getElementById('tienda')!
        this.btnTienda.onclick = this.mostrarTienda.bind(this)


        //Cargamos la vista principal
        this.mostrarIndex()

        //Cargamos la lista inicial
        this.modelo = new Modelo(this, this.buscar.bind(this))
    }

    ocultarTodo(): void {
        this.vistaListaCoches.mostrar(false)
        this.vistaFormulario.mostrar(false)
        this.vistaTienda.mostrar(false)

        this.mensajeCrear.style.display = 'none'
        this.mensajeModificar.style.display = 'none'
        this.mensajeBorrar.style.display = 'none'
    }

    recargar(): void {
        this.iniciar()
    }

    back(): void {
        this.mostrarIndex()
    }

    //** Cambios de vistas */

    mostrarIndex(): void {
        this.ocultarTodo()
        this.vistaListaCoches.mostrar(true)
    }

    mostrarTienda(): void {
        this.ocultarTodo()
        this.vistaTienda.mostrar(true)
    }

    mostrarFormularioCrear(): void {
        this.ocultarTodo()
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'none'
        this.btnAceptar.style.display = 'inline'
        this.tituloCrear.style.display = 'block'
        this.vistaFormulario.cambiarEstadoCampos(false)
        this.tituloModificar.style.display = 'none'
        this.tituloConsultar.style.display = 'none'
    }

    mostrarFormularioModificar(): void {
        this.ocultarTodo()
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'inline'
        this.tituloModificar.style.display = 'block'
        this.btnAceptar.style.display = 'none'
        this.tituloCrear.style.display = 'none'
        this.tituloConsultar.style.display = 'none'
    }

    mostrarConsultar(): void {
        this.ocultarTodo()
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'none'
        this.btnAceptar.style.display = 'none'
        this.tituloCrear.style.display = 'none'
        this.tituloModificar.style.display = 'none'
    }


    insertarCoche(coche: Coche): void {
        this.modelo.insertar(coche, this.insertarCocheOK.bind(this))
    }

    insertarCocheOK(): void {
        this.ocultarTodo()
        this.mensajeCrear.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }

    insertarCochePorID(id: number, coche: Coche): void {
        this.modelo.insertarCochePorID(id, coche, this.insertarCochePorIDOK.bind(this))
    }

    insertarCochePorIDOK(): void {
        this.ocultarTodo()
        this.vistaFormulario.borrarCampos()
        this.mensajeModificar.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }

    buscar(marca: string | null): void {
        //console.log('En buscar')
        this.modelo.buscar(marca, this.buscarOK.bind(this))
    }

    buscarOK(lista: Coche[]): void {
        this.vistaListaCoches.cargarListado(lista)
        this.vistaTienda.cargarTienda(lista)
    }

    borrar(id: number): void {
        this.modelo.borrar(id, this.borrarOK.bind(this))
    }

    borrarOK(): void {
        this.ocultarTodo()
        this.mensajeBorrar.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }

    buscarPorID(id: number, boolean: boolean): void {
        if (boolean === true)
            this.modelo.buscarPorID(id, this.buscarPorIDOK.bind(this, id))
        if (boolean === false)
            this.modelo.buscarPorID(id, this.consultarPorIDOK.bind(this, id))

    }

    buscarPorIDOK(id: number, coche: Coche): void {
        this.mostrarFormularioModificar()
        this.vistaFormulario.cargarCoche(id, coche, 'modificar')
    }

    consultarPorIDOK(id: number, coche: Coche): void {
        this.mostrarConsultar()
        this.vistaFormulario.cargarCoche(id, coche, 'consultar')
    }


}

new Controlador()
