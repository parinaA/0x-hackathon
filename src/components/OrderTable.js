import React from 'react';

export default class OrderTable extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
            basetoken='',
            quotetoken='',
            strikeprice=null,
            expiry='',
            nbt='',
            premium=null,
        }
		
	}

    render() {
        return (
            <div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Base Token</th>
                <th scopr="col">Quote Token</th>
                <th scope="col">Strike Price</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">No. of Base Tokens</th>
                <th scope="col">Premium</th>
                <th scope="col">No. of Options Remaining</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>20</td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}