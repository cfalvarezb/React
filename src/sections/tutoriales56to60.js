import React, { Component } from 'react';
import BitCoinPriceContainer from './container-component'

class Button extends Component {
    constructor(props) {
        super(props)
        this.borderColor = '#09f';
    }

    render(){
        return(
            <button style={{ borderColor: this.borderColor, display: 'block'}} >
                {this.props.label}
            </button>
        )
    }
}

class ButtonDanger extends Button {
    constructor(props) {
        super(props)
        this.borderColor = 'red';
    }
}

class ButtonWithLegend extends Button {
    render () {
        return(
            <div>
                {super.render()}
                <small>{this.props.legend}</small>
            </div>
            
        )
    }
}

class ButtonComposicion extends Component {

    render(){
        return(
            <button style={{ borderColor: this.props.borderColor, display: 'block'}} >
                {this.props.label}
            </button>
        )
    }
}

class ButtonDangerComposicion extends Component {
    render(){
        return <ButtonComposicion borderColor='red' label={this.props.label} />
    }
}

ButtonComposicion.defaultProps = {
    borderColor: '#09f'
}



class ButtonWithLegendComposicion extends Component {
    render () {
        return(
            <div>
                <ButtonComposicion label={this.props.label} borderColor={this.props.borderColor} />
                <small>{this.props.legend}</small>
            </div>
            
        )
    }
}

class ComposicionVsHerencia extends Component {
    render () {
        return (
            <div>
                <h4>Composicion Vs Herencia</h4>
                <Button  label='Click aqui' />
                <ButtonDanger label='Cuidado!!' />
                <ButtonWithLegend 
                    label='Boton con explicacion' 
                    legend='Clicka el boton para hacer algo tio'
                />
                <ButtonComposicion label='Click aqui composicion' />
                <ButtonDangerComposicion label='Cuidado!!' />
                <ButtonWithLegendComposicion
                    label='Boton con explicacion Composicion' 
                    legend='Clicka el boton para hacer algo tio composicion'
                />

            </div>
        )
    }
}

export default class Tutoriales56to60 extends Component {
    render(){
        return(
            <div>
                <ComposicionVsHerencia/>
                <BitCoinPriceContainer/>
            </div> 
        );
    }  
}