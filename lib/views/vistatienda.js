import { Vista } from "./vista.js";
export class VistaTienda extends Vista {
    constructor(controlador, div) {
        super(div);
        this.controlador = controlador;
        this.divListarCRUD = document.getElementById('vistaListaCRUD');
        this.divCrearCRUD = document.getElementById('vistaCrearCRUD');
        this.nodoLista = document.getElementById('listaCoches');
        this.btnBuscar = document.getElementById('btnBuscar');
        this.btnBuscar.onclick = this.pulsarBuscar.bind(this);
        this.selectMarca = document.getElementById('enFabq');
    }
    cargarTienda(lista) {
        this.nodoLista.textContent = '';
        lista.forEach(element => {
            let div1 = document.createElement('div');
            div1.setAttribute('class', 'col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4');
            div1.setAttribute('id', 'coche2');
            let div2 = document.createElement('div');
            div2.setAttribute('class', 'row border');
            div2.style.height = '27vh';
            let img = document.createElement('img');
            img.src = element.imagen;
            img.alt = 'imagen';
            img.style.width = '100%';
            img.style.maxHeight = '100%';
            img.onclick = this.consultarCoche.bind(this, element.id);
            let div3 = document.createElement('div');
            div3.setAttribute('class', 'row border');
            let h51 = document.createElement('h5');
            h51.setAttribute('class', 'fw-bold text-center');
            h51.textContent = element.marca;
            let div4 = document.createElement('div');
            div4.setAttribute('class', 'row border');
            let h52 = document.createElement('h5');
            h52.setAttribute('class', 'fw-bold text-center');
            h52.textContent = element.modelo;
            let div5 = document.createElement('div');
            div5.setAttribute('class', 'row border');
            let h53 = document.createElement('h5');
            h53.setAttribute('class', 'fw-bold text-center');
            h53.textContent = element.precio + '€';
            div1.appendChild(div2);
            div2.appendChild(img);
            div1.appendChild(div3);
            div3.appendChild(h51);
            div1.appendChild(div4);
            div4.appendChild(h52);
            div1.appendChild(div5);
            div5.appendChild(h53);
            this.nodoLista.appendChild(div1);
        });
    }
    mostrarCoches() {
        this.controlador.buscar(null);
    }
    pulsarBuscar() {
        this.controlador.buscar(this.selectMarca.value);
    }
    consultarCoche(id) {
        this.controlador.buscarPorID(id, false);
    }
}
//# sourceMappingURL=vistatienda.js.map