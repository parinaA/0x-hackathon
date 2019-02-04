import React from 'react';
import axios from 'axios';

export default class OrderBook extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:3000/v2/orders")
        .then(data=>{
            console.log(data);
        })
    }
    
    render()
    {
        return(
            <div>
                <p>hello</p>
            </div>
        )
    }
}