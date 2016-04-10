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
    const { statusIncludes, orders, isEditing, isSubmittingEdit, editingId,
            startEditing, stopEditing, submitEdit} = this.props;
    
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
              <th>Actions</th>
            </tr>
            
            {orders.filter((order) => {
              return statusIncludes.indexOf(order.status_id) !== -1;
            }).map((order) =>
              editingId && editingId === order.id
                ? <tr key={order.id}>
                    <td>
                      <div>
                        <select defaultValue={order.status_id} ref={node => {
                          this.status_id = node;
                        }}>
                          <option value="1">
                            {statusIdToName(1)}
                          </option>
                          <option value="2">
                            {statusIdToName(2)}
                          </option>
                          <option value="3">
                            {statusIdToName(3)}
                          </option>
                          <option value="4">
                            {statusIdToName(4)}
                          </option>
                        </select>
                        <input defaultValue={order.tracking_link} placeholder="Tracking Link" ref={node => {
                          this.tracking_link = node;
                        }} />
                      </div>
                    </td>
                    <td>
                      <input defaultValue={order.name} placeholder="Name (required)" ref={node => {
                        this.name = node;
                      }} />
                      <input defaultValue={order.link} placeholder="Link" ref={node => {
                        this.link = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.number} placeholder="Number" ref={node => {
                        this.number = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.category} placeholder="Category" ref={node => {
                        this.category = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.material} placeholder="Material" ref={node => {
                        this.material = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.supplier} placeholder="Supplier" ref={node => {
                        this.supplier = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.price} placeholder="Price per item" ref={node => {
                        this.price = node;
                      }} />
                    </td>
                    <td>
                      <input defaultValue={order.quantity} placeholder="Quantity" ref={node => {
                        this.quantity = node;
                      }} />
                    </td>
                    <td>
                      {
                        order.price && order.quantity &&
                        `$${(Number(order.price.replace(/[^0-9\.]/g, "")) * order.quantity).toFixed(2).toLocaleString()}`
                      }
                    </td>
                    <td>
                      <input defaultValue={order.notes} placeholder="Notes" ref={node => {
                        this.notes = node;
                      }} />
                    </td>
                    <td>{order.updated && (new Date(order.updated)).toString()}</td>
                    <td>
                      <button disabled={isSubmittingEdit} onClick={() => {
                        const editOrder = {
                          id: order.id,
                          status_id: Number(this.status_id.value),
                          tracking_link: this.tracking_link.value,
                          name: this.name.value,
                          number: this.number.value,
                          link: this.link.value,
                          category: this.category.value,
                          material: this.material.value,
                          supplier: this.supplier.value,
                          price: (Number(this.price.value.replace(/[^0-9\.]/g, ""))).toFixed(2),
                          quantity: Number(this.quantity.value),
                          notes: this.notes.value
                        };
                        console.log(`Edit order ${order.id} to: ${JSON.stringify(editOrder)}`);
                        submitEdit(editOrder);
                      }}>
                        Save
                      </button>
                      <button disabled={isSubmittingEdit} onClick={() => {
                        stopEditing();
                      }}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                : <tr key={order.id}>
                    <td>
                      {order.tracking_link
                        ? <a target="_blank" href={order.tracking_link}>{statusIdToName(order.status_id)}</a>
                        : statusIdToName(order.status_id)
                      }
                    </td>
                    <td>
                      {order.link
                        ? <a target="_blank" href={order.link}>{order.name}</a>
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
                    <td>
                      <button disabled={isSubmittingEdit} onClick={() => {
                        startEditing(order.id);
                      }}>
                        Edit
                      </button>
                    </td>
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
