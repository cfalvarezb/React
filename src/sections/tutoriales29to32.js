import React, { Component } from 'react';
import Forms from './forms';

class ComponentTutorial29 extends Component{

	handleClick(e){
		alert(e);
		alert(e.nativeEvent);
	}

	render(){
		return (
			<div>
				<h4>Eventos</h4>
				<button onClick={this.handleClick}>Click</button>
			</div>
			)
	}
}

class ComponenteTutorial30 extends Component{

	constructor(){
		super()
		this.state = {
			mouseX: 0, 
			mouseY:0
		}

		//this.handleMouseMove = this.handleMouseMove.bind(this) manera menos recomendada
	}

	handleMouseMove = (e) => { //Manera mas recomendada de asignar el valor de contexto a una funcion

		const { clientX, clientY } = e
		this.setState({ mouseX: clientX, mouseY: clientY})

	}

	render(){
		return(
			<div style={{ border: '1px solid #000'}} onMouseMove={this.handleMouseMove}>
				<p>{this.state.mouseX}, {this.state.mouseY}</p>
			</div>
		)
	}
} 

class ComponenteTutorial31 extends Component{

	render(){
		return(
			<Forms />
			);
	}

}


export default class Tutoriales29to32 extends Component{
	render(){
		return(
				<div>
					<ComponentTutorial29 />
					<ComponenteTutorial30 />
					<ComponenteTutorial31 />
				</div>
			);
	}


}