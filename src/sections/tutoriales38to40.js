import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Box extends Component{
	render(){
		return(
			<div style={{ border: '1px solid #000', margin: 5, padding: 5 }} >
				{this.props.children}
			</div>	
		)
	}
}

export class Tutorial38 extends Component{
	render(){
		return(
			<div>
				<Box>Hola Soy un children</Box>
				<Box>Hola Soy otro children</Box>
			</div>
		)
	}
}

export class Article extends Component{

	static propTypes = {
		author: PropTypes.string.isRequired //indicamos que se siempre se debe ser requerido
	}

	constructor( props ){
		super( props );
		//if( typeof props.author === 'undefined' ){
		//	console.warn('Author prop is required');
		//	throw new Error('author prop is requierd');
		//}
		//manera ambigua para validar que el atributo es requerido
	}
	render(){

		const {tittle, author, date, children } = this.props;

		return(
			<section>
				<h2>{tittle}</h2>
				{ author && <p><em>Escrito por {author}</em></p> /* condicional si viene algo en author renderice de lo contrario no */ } 
				<Box>{date}</Box>
				<article>
					{children}
				</article>
			</section>
		)
	}
}

//Article.propTypes = {
//	author: PropTypes.string
//}
//Manera no preferida de declarar props porque queda el codigo menos recogido

export class Tutorial39 extends Component{
	render(){
		return(
			<Article
			//author='Cristian'
			//author={true}
			 date={new Date().toLocaleDateString()}
			 title='Articulo sobre la prop children'
			 >
			 <p>El contenido que envolvemos dentro del componente Article sera enviado al componente como this.props.children. </p>
			 <strong>Y mantiene las etiquetas y componentes que se hayan añadido dentro</strong>
			</Article>
		)
	}
}

export default class Turotiales38To40 extends Component{

	render(){
		return (
			<div>
				<Tutorial38/>
				<Tutorial39/>
			</div>
		) 
	}

}