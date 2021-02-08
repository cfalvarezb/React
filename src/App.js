import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ConditionalSection from './sections/conditional';
import Tutoriales29To32 from './sections/tutoriales29to32';
import Turotiales38To40 from './sections/tutoriales38to40';
import Tutoriales41to55 from './sections/tutoriales41to55';

function Hello(props){
    return <h2>{props.title}</h2>
}

const Hello2 = (props) => <h2>{props.title}</h2>

class Hello3 extends Component {
  render(){
    return <h2>{this.props.title}</h2>
  }
}

class Text extends Component{
  render(){

    const { 
      isActivated, 
      arrayOfNumbers, 
      multiply,
      propsHowElements 
    } = this.props;
    const textoSegunBool = this.props.boolean ? 'Cierto' : 'Falso';
    const activado = isActivated ? 'On' : 'Off'
    const mappedNumbers = arrayOfNumbers.map(multiply);

    return (
      <div>
        {propsHowElements}
        <p>{this.props.text}</p>
        <p>{this.props.number}</p>
        <p>{textoSegunBool}</p>
        <p>{activado}</p>
        <p>{mappedNumbers}</p>
        <p>{this.props.objectWithInfo.key}</p>
      </div>
    )
  }
}

class DefaultProps extends Component {
  render(){
    return <h1>{this.props.text}</h1>
  }
}

DefaultProps.defaultProps = {
  text: 'Titulo por defecto'
}

class Contador extends Component {

  
   constructor(props){
     super(props);
     // Forma para declarar state en constructor
     //this.state = { contador: 1 };
     setInterval(() => {
      this.setState({
        contador: this.state.contador + 1
      });
    }, 1000);
   }

  state = { contador: this.props.contadorInicial } //Declarar state por ClassField

  render(){
    return <ContadorNumero numero={this.state.contador} />
  }
}

Contador.defaultProps = {
  contadorInicial: 1
}

class ContadorNumero extends Component {
  render(){
    return <span>{this.props.numero}</span>
  }
}

class Tutoriales1To28 extends Component {

  render(){
    return(
      <div>
      <p>
          Bienvenido a este curso
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vamos a aprender React
        </a>
        <Hello title='Prop Inyectado a un Componente Aislado'/>
        <Hello2 title='Prop Inyectado a un Componente Aislado Arrow'/>
        <Hello3 title='Prop Inyectado a un Componente Aislado Class'/>
        <Text 
          arrayOfNumbers={[2,4,6,8]}
          objectWithInfo={{ key: 'Value_1', key2: 'Value_2' }}
          boolean={false} 
          multiply={(number)=>number*2}
          isActivated
          number={5} 
          text='Texto de props'
          propsHowElements={<h1>Props Como Elementos</h1>}
        />
        <DefaultProps />
        <Contador />
        <ConditionalSection/>
        </div>
      )
  }

}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tutoriales1To28 />
        <Tutoriales29To32 />
        <Turotiales38To40 />
        <Tutoriales41to55 />
      </header>
    </div>
  );
}

export default App;
