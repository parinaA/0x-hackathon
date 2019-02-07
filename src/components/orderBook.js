import React from 'react';
import axios from 'axios';
import Header from './Header';
import OrderTable from './OrderTable';

export default class OrderBook extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
			data: undefined
        }
		
	}

    componentDidMount() {
        axios('http://localhost:3000/v2/orders',{
            method:"get",
        }).then(response => {
			console.log(response.data);
        })

    render()
    {
        return(
            <div>
            <Header/>
            <Order data={this.state.data} />
            </div>
        )
    }
}