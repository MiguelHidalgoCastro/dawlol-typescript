import { VistaLista } from "../views/vistalista.js";
import { VistaFormulario } from "../views/vistaformulario.js";
import { Modelo } from "../models/modelo.js";
import { VistaTienda } from "../views/vistatienda.js";
export class Controlador {
    constructor() {
        window.onload = this.iniciar.bind(this);
    }
    iniciar() {
        this.divTienda = document.getElementById('vistaTienda');
        this.divListaCRUD = document.getElementById('vistaListaCRUD');
        this.divFormulario = document.getElementById('vistaFormulario');
        this.divMensajes = document.getElementById('mensajes');
        this.vistaTienda = new VistaTienda(this, this.divTienda);
        this.vistaListaCoches = new VistaLista(this, this.divListaCRUD);
        this.vistaFormulario = new VistaFormulario(this, this.divFormulario);
        this.tituloCrear = document.getElementById('tituloCrear');
        this.tituloModificar = document.getElementById('tituloModificar');
        this.tituloConsultar = document.getElementById('tituloConsultar');
        this.btnAceptar = document.getElementById('btnAceptar');
        this.btnModificar = document.getElementById('btnModificar');
        this.imagenNav = document.getElementById('imgNav');
        this.imagenNav.onclick = this.recargar.bind(this);
        this.mensajeCrear = document.getElementById('mensajeCrear');
        this.mensajeModificar = document.getElementById('mensajeModificar');
        this.mensajeBorrar = document.getElementById('mensajeBorrar');
        this.btnCrear = document.getElementById('addCoche');
        this.btnCrear.onclick = this.mostrarFormularioCrear.bind(this);
        this.btnLista = document.getElementById('lista');
        this.btnLista.onclick = this.mostrarIndex.bind(this);
        this.btnTienda = document.getElementById('tienda');
        this.btnTienda.onclick = this.mostrarTienda.bind(this);
        this.mostrarIndex();
        this.modelo = new Modelo(this, this.buscar.bind(this));
    }
    ocultarTodo() {
        this.vistaListaCoches.mostrar(false);
        this.vistaFormulario.mostrar(false);
        this.vistaTienda.mostrar(false);
        this.mensajeCrear.style.display = 'none';
        this.mensajeModificar.style.display = 'none';
        this.mensajeBorrar.style.display = 'none';
    }
    recargar() {
        this.iniciar();
    }
    back() {
        this.mostrarIndex();
    }
    mostrarIndex() {
        this.ocultarTodo();
        this.vistaListaCoches.mostrar(true);
    }
    mostrarTienda() {
        this.ocultarTodo();
        this.vistaTienda.mostrar(true);
    }
    mostrarFormularioCrear() {
        this.ocultarTodo();
        this.vistaFormulario.mostrar(true);
        this.btnModificar.style.display = 'none';
        this.btnAceptar.style.display = 'inline';
        this.tituloCrear.style.display = 'block';
        this.vistaFormulario.cambiarEstadoCampos(false);
        this.tituloModificar.style.display = 'none';
        this.tituloConsultar.style.display = 'none';
    }
    mostrarFormularioModificar() {
        this.ocultarTodo();
        this.vistaFormulario.mostrar(true);
        this.btnModificar.style.display = 'inline';
        this.tituloModificar.style.display = 'block';
        this.btnAceptar.style.display = 'none';
        this.tituloCrear.style.display = 'none';
        this.tituloConsultar.style.display = 'none';
    }
    mostrarConsultar() {
        this.ocultarTodo();
        this.vistaFormulario.mostrar(true);
        this.btnModificar.style.display = 'none';
        this.btnAceptar.style.display = 'none';
        this.tituloCrear.style.display = 'none';
        this.tituloModificar.style.display = 'none';
    }
    insertarCoche(coche) {
        this.modelo.insertar(coche, this.insertarCocheOK.bind(this));
    }
    insertarCocheOK() {
        this.ocultarTodo();
        this.mensajeCrear.style.display = 'block';
        setTimeout(this.recargar.bind(this), 3000);
    }
    insertarCochePorID(id, coche) {
        this.modelo.insertarCochePorID(id, coche, this.insertarCochePorIDOK.bind(this));
    }
    insertarCochePorIDOK() {
        this.ocultarTodo();
        this.vistaFormulario.borrarCampos();
        this.mensajeModificar.style.display = 'block';
        setTimeout(this.recargar.bind(this), 3000);
    }
    buscar(marca) {
        this.modelo.buscar(marca, this.buscarOK.bind(this));
    }
    buscarOK(lista) {
        this.vistaListaCoches.cargarListado(lista);
        this.vistaTienda.cargarTienda(lista);
    }
    borrar(id) {
        this.modelo.borrar(id, this.borrarOK.bind(this));
    }
    borrarOK() {
        this.ocultarTodo();
        this.mensajeBorrar.style.display = 'block';
        setTimeout(this.recargar.bind(this), 3000);
    }
    buscarPorID(id, boolean) {
        if (boolean === true)
            this.modelo.buscarPorID(id, this.buscarPorIDOK.bind(this, id));
        if (boolean === false)
            this.modelo.buscarPorID(id, this.consultarPorIDOK.bind(this, id));
    }
    buscarPorIDOK(id, coche) {
        this.mostrarFormularioModificar();
        this.vistaFormulario.cargarCoche(id, coche, 'modificar');
    }
    consultarPorIDOK(id, coche) {
        this.mostrarConsultar();
        this.vistaFormulario.cargarCoche(id, coche, 'consultar');
    }
}
new Controlador();
//# sourceMappingURL=controlador.js.map