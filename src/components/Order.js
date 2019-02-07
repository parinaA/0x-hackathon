import React from 'react';

const Order= (props) => {
    //console.log(props);
    return (
        <div>
        {
        <tr>
                <th scope="row">1</th>
                <td>{props.makerAssetAmount}</td>
                <td>{props.quotetoken}</td>
                <td>{props.}</td>
                <td>20</td>
                </tr>
        }
        </div>
    );
}

export default Order;