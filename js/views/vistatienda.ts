import { Controlador } from "js/controllers/controlador.js";
import { Vista } from "./vista.js";
import { Coche } from "js/models/coche.js";

export class VistaTienda extends Vista {

    public controlador: Controlador
    public divListarCRUD: HTMLElement
    public divCrearCRUD: HTMLElement
    public nodoLista: HTMLElement
    public btnBuscar: HTMLElement
    public selectMarca: HTMLInputElement
    constructor(controlador: Controlador, div: HTMLDivElement) {
        super(div)
        this.controlador = controlador

        /*Containers*/
        this.divListarCRUD = document.getElementById('vistaListaCRUD')!
        this.divCrearCRUD = document.getElementById('vistaCrearCRUD')!


        /*Nodo enganche lista */
        this.nodoLista = document.getElementById('listaCoches')!


        this.btnBuscar = document.getElementById('btnBuscar')!
        this.btnBuscar.onclick = this.pulsarBuscar.bind(this)

        this.selectMarca = <HTMLInputElement>document.getElementById('enFabq')


    }

    cargarTienda(lista: Coche[]): void {
        /* Todo esto lo tengo que pasar a la vista */
        this.nodoLista.textContent = ''

        lista.forEach(element => {
            let div1 = document.createElement('div')
            div1.setAttribute('class', 'col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4')
            div1.setAttribute('id', 'coche2')
            //div1.style.minHeight = '330px'


            let div2 = document.createElement('div')
            div2.setAttribute('class', 'row border')
            div2.style.height = '27vh'

            let img = document.createElement('img')
            img.src = element.imagen //
            img.alt = 'imagen'
            img.style.width = '100%'
            img.style.maxHeight = '100%'
            img.onclick = this.consultarCoche.bind(this, element.id)

            let div3 = document.createElement('div')
            div3.setAttribute('class', 'row border')

            let h51 = document.createElement('h5')
            h51.setAttribute('class', 'fw-bold text-center')
            h51.textContent = element.marca //

            let div4 = document.createElement('div')
            div4.setAttribute('class', 'row border')

            let h52 = document.createElement('h5')
            h52.setAttribute('class', 'fw-bold text-center')
            h52.textContent = element.modelo //

            let div5 = document.createElement('div')
            div5.setAttribute('class', 'row border')
            let h53 = document.createElement('h5')
            h53.setAttribute('class', 'fw-bold text-center')
            h53.textContent = element.precio + '€' //



            div1.appendChild(div2)
            div2.appendChild(img)
            div1.appendChild(div3)
            div3.appendChild(h51)
            div1.appendChild(div4)
            div4.appendChild(h52)
            div1.appendChild(div5)
            div5.appendChild(h53)



            this.nodoLista.appendChild(div1)

        })

    }

    mostrarCoches(): void {
        this.controlador.buscar(null)
    }

    pulsarBuscar(): void {
        this.controlador.buscar(this.selectMarca.value)
    }

    consultarCoche(id: number): void {
        this.controlador.buscarPorID(id, false)
    }
}