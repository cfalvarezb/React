import React, { Component } from 'react';

class BitCoinPrice extends Component {

    // _renderCurrencies () {
    //     const { bpi } = this.props

    //     return Object.keys(bpi).map( currency => ( 
    //         <div key={currency}>
    //             1 BTC is {bpi[currency].rate}
    //             <span>{bpi[currency].code}</span>
    //         </div>
    //     )) 
    // }

    _renderCurrencies = ( props ) => (
        Object.keys(props.bpi).map( currency => ( 
            <div key={currency}>
                1 BTC is {props.bpi[currency].rate}
                <span>{props.bpi[currency].code}</span>
            </div>
        )) 
    )

    render () {
        return(
            <div>
                <h4>Bitcoin Price Index Patron Contenedor Contenido</h4>
                {this._renderCurrencies(this.props)}
            </div>
        )
    }

}

export default BitCoinPrice