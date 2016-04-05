import React, { Component, PropTypes } from 'react'

export const statusIdToName = (id) => {
  switch (id) {
    case 0:
      return "Nonexistant";
    case 1:
      return "Not Ordered";
    case 2:
      return "Ordered";
    case 3:
      return "Shipped";
    case 4:
      return "Arrived";
    default:
      return "Invalid Status";
  }
}

export default class Orders extends Component {
  render() {
    const {orders} = this.props;
    
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Number</th>
              <th>Category</th>
              <th>Material</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Notes</th>
              <th>Status Updated</th>
            </tr>
            
            {orders.map((order) =>
              <tr key={order.id}>
                <td>
                  {order.tracking_link
                    ? <a href={order.tracking_link}>{statusIdToName(order.status_id)}</a>
                    : statusIdToName(order.status_id)
                  }
                </td>
                <td>
                  {order.link
                    ? <a href={order.link}>{order.name}</a>
                    : order.name
                  }
                </td>
                <td>{order.number}</td>
                <td>{order.category}</td>
                <td>{order.material}</td>
                <td>{order.supplier}</td>
                <td>{order.price && order.price.toString()}</td>
                <td>{order.quantity && order.quantity.toString()}</td>
                <td>
                  {
                    order.price && order.quantity && 
                    `$${(Number(order.price.replace(/[^0-9\.]/g, "")) * order.quantity).toFixed(2).toLocaleString()}`
                  }
                </td>
                <td>{order.notes}</td>
                <td>{order.updated && (new Date(order.updated)).toString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
    
              // <input id="psw" type="password" name="psw" value={psw}
            // disabled={isCorrect || isChecking} />
          // <input type="button" onClick={onEntered(psw)} value="Enter" 
            // disabled={isCorrect || isChecking} />
    
    // const { value, onChange, options } = this.props

    // return (
      // <span>
        // <h1>{value}</h1>
        // <select onChange={e => onChange(e.target.value)}
                // value={value}>
          // {options.map(option =>
            // <option value={option} key={option}>
              // {option}
            // </option>)
          // }
        // </select>
      // </span>
    // )
  }
}

Orders.propTypes = {
  orders: PropTypes.array.isRequired
}
