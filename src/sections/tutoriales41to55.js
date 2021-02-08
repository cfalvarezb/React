/*
Ciclos de vida del componente

Cuando se habla de ciclos de vida son los estados por los que pasa cada componente existen 3 fases que son montaje, 
actualizacion y desmontaje, Se puede controlar cada una de ellas y se debe tener en cuenta que utilizar en cada ciclo.

Montaje: 
* solo se ejecuta una vez
* Construye el componente con su estado inicial
* Obtiene las props que se han pasado
* Bindeamos metodos de clase
* Primera ejecucion del metodo render

constructor(props) -> Se ejecuta siempre y solo lo hace una vez --> Se ejecuta antes de montar el componente
--> inicializar el estate del componente --> Bindea contextos en los metodos --> No se debe llamar el setState
componentWillMount() -> Construye el componente con su estado inicial --> Se ejecuta una vez --> Se invoca antes de
montar el componente y antes del render
render() -> Obtiene las props
componentDidMount() -> Primera ejecucion del metodo render
-> Termina con el componente montado en el DOM -> se puede utilizar el setState --> aqui podemos añadir las llamadas
para recuperar datos del servidor y escuchar eventos --> ya tendremos una representacion en el DOM --> Se ejecuta
tras renderizar el componente --> se puede suscribir a eventos del navegador pero se debe quitar la suscripcion 

Fase de Actualizacion:
* Por defecto se ejecuta cada vez que recibe props o se actualiza su estado
* Podemos controlar cuando el componente necesita renderizarse de nuevo

componentWillReceiveProps(nextProps) --> Se ejecuta solo cuando el componente va a recibir nuevas props
--> Util cuando se usa las props para formar el state del componente --> Se puede usar setState y aveces no provoca
otro render
shouldComponentUpdate(nextProps, nextState) --> Este es el primer metodo que se ejecuta siempre y cuando haya un cam
bio de state interno del componente --> es el que define si hay render o no --> este metodo retorna true si se quiere
ejecutar de nuevo el render o false cuando no
componenteWillUpdate(nextProps, nextState) --> si devuelve shouldComponentUpdate true pasa a este metodo antes del
metodo render --> No se utiliza mucho debido a que aqui solo se preparan cosas antes de montar en el dom como por 
ejemplo animaciones --> no se debe llamar setState porque ocasionaria loops ionfinitos
render() --> refleja las nuevas props y state del componente --> no se ejecuta si shouldComponenteUpdate devuelve 
false --> diffing DOM y montaje/desmontaje de componentes --> no se debe llamar setState o entrara en un loop
inifinito
componentDidUpdate(prevProps, prevState) --> Se ejecuta tras actualizar el componente --> ejecutar funciones de 
librerias externas usar el nuevo DOM usar el nuevo DOM o hacer llamadas Externas --> no se debe llamar el metodo
setState o entrara en un loop infinito


Fase de Desmontaje
* Alli se deben eliminar listeners
* Eliminamos referencias al DOM
* Se ejecuta solo si el componente deja de renderizarse en la aplicacion
* Solo tiene una fase

componentWillUnmount() -> metodo ejecutado justo antes de desmontar complemente del DOM
--> se libera todo recursos, llamados y demas

Fase de error

* Se ejecuta solo cuando el componente lanza una excepcion
* Solo tiene una fase
* Permite manejar errores y excepciones
* Tambien captura excepciones de los children

componentDidCatch(error, info) -> 


*/


import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ComponentFetch extends Component {

    state = {
        bpi : {

        }
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('componentDidMount');
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const { bpi } = data
                this.setState( { bpi } )
            })
    }

    _renderCurrencies () {
        const { bpi } = this.state
        const currencies = Object.keys(bpi)
        return currencies.map(
            currency => (
                <div key={currency} >
                    1 BTC is { bpi[currency].rate }
                    <span>{currency}</span>
                </div>
            )
        )
    }

    render(){
        return(
            <div>
                { this._renderCurrencies() }
            </div>
        )
    }

}

class BotonQueLanzaError extends Component {
    state = { throwError : false }

    render(){
        if(this.state.throwError){
            throw new Error('Error lanzado por el boton')
        }
        return(
            <button onClick={() => this.setState( { throwError : true } )}>
                Lanzar Error
            </button>
        )
    }
}

class EjemploDeComponenteDidCatch extends Component {
    state = { hasError: false, errorMsg: '' }
    componentDidCatch(error,errorInfo){
        console.log('EjemploDeComponenteDidCatch');
        console.log({error,errorInfo});
        this.setState({ hasError: true, errorMsg: error.toString() })
    }
    render(){
        if ( this.state.hasError ) {
            return (
                <div>
                    <p>Error en el componente: { this.state.errorMsg }</p>
                    <button onClick={() => { this.setState({ hasError: false })  }} >
                        Volver a la aplicacion
                    </button>
                </div>
            )
        }

        return(
            <div>
                <h4>Ciclo de montaje: ComponenteDidCatch</h4>
                <BotonQueLanzaError />
            </div>
        )
        
    }
}

class ComponenteADesmontar extends Component {
    state = { windowWidth: 0 }

    _updateStateWithWindowWidth = () => {
        console.log('_updateStateWithWindowWidth');
        this.setState( { windowWidth: document.body.clientWidth } )
    }

    componentDidMount () {
        this._updateStateWithWindowWidth()
        window.addEventListener( 'resize', this._updateStateWithWindowWidth)
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
        window.removeEventListener('resize', this._updateStateWithWindowWidth)
    }

    render(){
        return(
            <div>
                <p>Ancho de la ventana: {this.state.windowWidth}</p>
            </div>
        )
    }

}

class EjemploDeComponentWillUnMount extends Component {
    state = { mostrarComponente: true }

    render(){
        if(this.state.mostrarComponente){
            return (
                <di>
                    <h4>Ciclo de Desmontaje: ComponentWillUnMount</h4>
                    <ComponenteADesmontar />
                    <button onClick={() => this.setState({ mostrarComponente: false })} >
                        Desmontar Componente
                    </button>
                    
                </di>
            )
        }
        return(<p>Componente Desmontado</p>)
    }
}

const ANIMAL_IMAGES = {
    cat: 'https://goo.gl/PoQQXb',
    dolphin: 'https://goo.gl/BbiKCd',
    panda: 'https://goo.gl/oNbtoq'
}

const ANIMALS = Object.keys(ANIMAL_IMAGES);

class AnimalImage extends PureComponent{
    state = { src : ANIMAL_IMAGES[this.props.animal] }

    componentWillReceiveProps (nextProps) {
        console.clear()
        console.log("1. componentWillReceiveProps")
        console.log(nextProps)
        this.setState({ src: ANIMAL_IMAGES[nextProps.animal] })
    }

    // se comentarea debido a que con PureComponent esta validacion es automatica
    // shouldComponentUpdate(nextProps){
    //     console.log('2. shouldComponentUpdate')
    //     console.log('Anterior: ' + this.props.animal)
    //     console.log('Nuevo: ' + nextProps.animal)



    //     return this.props.animal !== nextProps.animal
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('3. componentWillUpdate ', nextProps, nextState)
        const img = document.querySelector('img')
        console.log('from img element ', { alt: img.alt })
        // web animations api
        img.animate([{
            filter: 'blur(0px)'
        },{
            filter: 'blur(2px)'
        }],{
            duration: 500,
            easing: 'ease'
        })
    }

    componentDidUpdate(prevProps, prevState){
        console.log('4. componentDidUpdate')
        const img = document.querySelector('img')
        // web animations api
        img.animate([{
            filter: 'blur(2px)'
        },{
            filter: 'blur(0px)'
        }],{
            duration: 1500,
            easing: 'ease'
        })
        console.log('from img element ', { alt: img.alt })
    }

    render(){
        console.log('1. al montar / 3. al actualizar | render')
        return(
            <div>
                <p>Selected {this.props.animal}</p>
                <img
                    alt={this.props.animal}
                    src={this.state.src}
                    width='250'
                />
            </div>
        )
    }
}

AnimalImage.propTypes = {
    animal: PropTypes.oneOf(ANIMALS)
}

// AnimalImage.defaultProps = {
//     animal: 'panda'
// }

export class ComponentWillReceiveProps extends Component {
    state = { 
        animal: 'panda'
    }

    _renderAnimalButton = (animal) => {
        return(
            <button 
                key={animal} 
                onClick={ () => { this.setState({ animal: animal }) } } 
                /*disabled={ animal === this.state.animal } */ >
                {animal}
            </button>
        )
    }

    render(){
        return (
            <div>
                <h4>Ciclo de actualizacion, Ejemplo de : ComponentWillReceiveProps</h4>
                <AnimalImage animal={this.state.animal} />
                {ANIMALS.map(this._renderAnimalButton)}
             
            </div>
        )
    }
}

export class ComponentDidMount extends Component {

    constructor (props) {
        console.log('Constructor');
        super(props);
        this.state = { mensaje: 'Mensaje Inicial' }
    }

    componentWillMount () { 
        // no es muy recomendado porque para eso se utiliza el contructor si hay mucho codigo en el constructor 
        //se puede implementar
        console.log('componentWillMount')
        this.setState({ mensaje: 'Mensaje modificado' })
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.setState({ otroState: '' }) //Cuando se cambia un state se vuelve a ejecutar el render
        document.addEventListener('scroll', () => {
            console.log(window.scrollY);
        })
    }

    render () {
        console.log('render');
        return (
            <div>
                <h4>Ciclo de mensaje: ComponentDidMount</h4>
                <p>En este componente nos muestra como podemos utilizar el componente did mount</p>
                <p>Como vamos añadir un evento al escroll vamos a hacer que</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                <p></p>
            </div>
        )
    }
}

export class Render extends Component {

    constructor (props) {
        console.log('Constructor');
        super(props);
        this.state = { mensaje: 'Mensaje Inicial' }
    }

    componentWillMount () { 
        // no es muy recomendado porque para eso se utiliza el contructor si hay mucho codigo en el constructor 
        //se puede implementar
        console.log('componentWillMount')
        this.setState({ mensaje: 'Mensaje modificado' })
    }

    render () {
        console.log('render');
        return [this.state.mensaje === 'Mensaje Inicial' ? 'Sip' : null]
    }
}

export class ComponentWillMount extends Component {

    constructor (props) {
        console.log('Constructor');
        super(props);
        this.state = { mensaje: 'Mensaje Inicial' }
    }

    componentWillMount () { 
        // no es muy recomendado porque para eso se utiliza el contructor si hay mucho codigo en el constructor 
        //se puede implementar
        console.log('componentWillMount')
        this.setState({ mensaje: 'Mensaje modificado' })
    }

    render () {
        console.log('render');
        return(
            <div>
                <h4>Ciclo de montaje: componentWillMount</h4>
                <p>{this.state.mensaje}</p>
            </div>
        )
    }
}

export class EjemploConstructor extends Component {

    constructor(props){
        super(props)
        this.state = { mensajeInicial: 'Mensaje Inicial' }
        //this.handleClick = this.handleClick.bind(this); //forma no recomendable
    }

    handleClick = () => { //forma recomendable para bindear
        this.setState({ mensajeInicial: 'Mensaje Cambiado' })
    }

    render() {
        return(
            <div>
                <h4>Ciclo de montaje: Constructor</h4>
                {this.state.mensajeInicial}
                <button onClick={this.handleClick}>
                    Cambiar Mensaje
                </button>
            </div>
        );
    }
}

export default class Tutoriales41to55 extends Component {
    render(){
        return(
            <div>
                <EjemploConstructor/>
                <ComponentFetch />
                <ComponentWillReceiveProps />
                <EjemploDeComponentWillUnMount />
                <EjemploDeComponenteDidCatch />
            </div> 
        );
    }  
}