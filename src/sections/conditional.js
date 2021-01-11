import React, { Component } from 'react';
import user from '../data/user.json';

class ComponentTitle extends Component{
	render(){
		return <h4>Conditional Rendering And List Rending</h4>
	}
}

class ComponentA extends Component{
	render(){
		return( <p>Componente A</p> )
	}
}

class ComponentB extends Component{
	render(){
		return( <p>Componente B</p> )
	}
}

class ComponentListSection extends Component {
	render(){
		const lista = [1,1,2,3,4];
		return lista.map((number, index) =>{
			return <p key={index}>Soy el numero {number}</p>
		})
	}
}

class ComponenObject extends Component{
	render(){
		const { user } = this.props
		return(
			<li>
				<p><strong>Id: </strong>{user.id}</p>
				<p><strong>User: </strong>{user.user}</p>
				<p><strong>password: </strong>{user.password}</p>
			</li>
		)
		
	}
	
}

class ComponentObjectListSection extends Component {
	render(){
		return(
		
				<ul>
				{
					user.map(user => {
						return(<ComponenObject key={user.id} user={user} />)
					})
				}
				</ul>
		
		)

	}
}

export default class ConditionalSection extends Component{
	constructor(props){
		super(props);
		this.state = { mostrarA: false };
	}
	render(){
		return ( 
			<div> 
				<ComponentTitle /> 
					{( this.state.mostrarA ) ?
				<ComponentA/> : <ComponentB/>}
				<ComponentListSection />
				<ComponentObjectListSection />
			 </div>  
		)
	}
}