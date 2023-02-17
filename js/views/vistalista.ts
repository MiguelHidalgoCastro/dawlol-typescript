import { Controlador } from "js/controllers/controlador.js";
import { Vista } from "./vista.js";
import { Coche } from "js/models/coche.js";

export class VistaLista extends Vista {
    public controlador: Controlador
    public divListarCRUD: HTMLElement
    public divCrearCRUD: HTMLElement
    public nodoLista: HTMLElement
    public btnBorrar: HTMLElement
    public btnModificarCoche: HTMLElement
    public btnBuscar: HTMLElement
    public selectMarca: HTMLInputElement

    constructor(controlador: Controlador, div: HTMLDivElement) {
        super(div)
        this.controlador = controlador

        /*Containers*/
        this.divListarCRUD = document.getElementById('vistaListaCRUD')!
        this.divCrearCRUD = document.getElementById('vistaCrearCRUD')!


        /*Nodo enganche lista */
        this.nodoLista = document.getElementsByTagName('tbody')[0]!

        /*Botones consultar, modificar y borrar*/
        this.btnBorrar = document.getElementById('delCoche')!
        this.btnModificarCoche = document.getElementById('modCoche')!

        this.btnBuscar = document.getElementById('btnBuscar')!
        this.btnBuscar.onclick = this.pulsarBuscar.bind(this)

        this.selectMarca = <HTMLInputElement>document.getElementById('enFabq')!

    }

    cargarListado(lista: Coche[]): void {
        /* Todo esto lo tengo que pasar a la vista */
        this.nodoLista.textContent = ''

        lista.forEach(element => {
            let tr = document.createElement('tr')
            /** Imagen */
            let td1 = document.createElement('td')
            let img = document.createElement('img')
            img.setAttribute('src', element.imagen)
            img.setAttribute('id', 'imagenListado')
            /** Marca */
            let td2 = document.createElement('td')
            td2.classList.add('h5')
            td2.textContent = element.marca
            /** Modelo */
            let td3 = document.createElement('td')
            td3.classList.add('h5')
            td3.textContent = element.modelo
            /** Año */
            let td4 = document.createElement('td')
            td4.classList.add('h5')
            td4.textContent = element.fechaFabricacion
            /** Precio */
            let td5 = document.createElement('td')
            td5.classList.add('h5')
            td5.textContent = element.precio + '€'
            /** Opciones */
            let td6 = document.createElement('td')
            let amod = document.createElement('a')
            amod.classList.add('btn')
            amod.classList.add('btn-outline-warning')
            amod.classList.add('me-1')
            amod.setAttribute('id', 'modCoche')
            amod.onclick = this.pulsarModificar.bind(this, element.id)
            let emmod = document.createElement('em')
            emmod.classList.add('bi')
            emmod.classList.add('bi-pencil-square')

            let adel = document.createElement('a')
            adel.classList.add('btn')
            adel.classList.add('btn-outline-danger')
            adel.setAttribute('id', 'delCoche')
            adel.onclick = this.pulsarBorrar.bind(this, element.id)
            let emdel = document.createElement('em')
            emdel.classList.add('bi')
            emdel.classList.add('bi-trash-fill')



            this.nodoLista.appendChild(tr)
            tr.appendChild(td1)
            td1.appendChild(img)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
            td6.appendChild(amod)
            amod.appendChild(emmod)
            td6.appendChild(adel)
            adel.appendChild(emdel)

        })

    }

    mostrarCoches(): void {
        this.controlador.buscar(null)
    }

    pulsarModificar(id: number): void {
        this.controlador.buscarPorID(id, true)
    }

    pulsarBorrar(id: number): void {
        this.controlador.borrar(id)
    }

    pulsarBuscar(): void {
        this.controlador.buscar(this.selectMarca.value)
    }

    consultarCoche(id: number): void {
        this.controlador.buscarPorID(id, false)
    }
}