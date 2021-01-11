import React, { Component } from 'react';

export default class Forms extends Component{

	state = {
		inputName: '',
		inputTwitter: '',
		inputTerms: false
	}

	handleClick = (e) => {
		e.preventDefault();
		//Manera obsoleta const name = document.getElementById('name').value;
		//Manera obsoleta const email = document.getElementById('twitter').value;
		const name = this.inputName.value;//no se debe hacer porque el codigo deja de ser declarativo
		const email = this.inputName2.value;//no se debe hacer porque el codigo deja de ser declarativo
		console.log({ name, email } + 'handleClick');
	}

	handleSubmit = (e) => {
		e.preventDefault();
		//Manera obsoleta const name = document.getElementById('name').value;
		//Manera obsoleta const email = document.getElementById('twitter').value;
		const name = this.inputName.value;//no se debe hacer porque el codigo deja de ser declarativo
		const email = this.inputName2.value;//no se debe hacer porque el codigo deja de ser declarativo
		console.log({ name, email } + 'handleSubmit');
		console.log(this.state);
	}

	handleChange = (e) => {
		console.log('handleChange');
		console.log(e.target.checked);
		this.setState({ inputTerms: e.target.checked });
	}

	render(){
		return(
			<div>
				<h4>Formularios</h4>
				<form onSubmit={this.handleSubmit}>
					<p>
						<label htmlFor='name'>Nombre: </label>
						<input
							id="name"
							name="userName"
							placeholder="Introduce el nombre"
							ref={ inputElement => this.inputName = inputElement }
							value={this.state.inputName}
							onChange={ e => this.setState({ inputName: e.target.value })}
						/>
					</p>
					<p>
						<label htmlFor='twitter'>Twitter:</label>
						<input
							id="twitter"
							name="twitterAccount"
							placeholder="Introduce tu twitter"
							ref={ inputElement => this.inputName2 = inputElement }
							value={this.state.inputTwitter}
							onChange={ e => this.setState({ inputTwitter: e.target.value })}
						/>
					</p>
					<p>
						<label>
							<input checked={this.state.inputTerms} onChange={this.handleChange} type='checkbox' />
							Accept Terms and Conditions
						</label>
					</p>
					<button onClick={this.handleClick}>Enviar</button>
					<button>EnviarSubmit</button>
				</form>
			</div>
			)
	}
}