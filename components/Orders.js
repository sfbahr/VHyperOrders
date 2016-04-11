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
        {orders.filter((order) => {
          return statusIncludes.indexOf(order.status_id) !== -1;
        }).map((order) =>
          editingId && editingId === order.id
            ? <div className="row" key={order.id}>
                <div className="col-xs-12 order-container">
                  <div className="row">
                    <div className="col-xs-4 col-md-2">
                      <div>
                        <select className="form-control" defaultValue={order.status_id} ref={node => {
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
                        <input className="form-control" defaultValue={order.tracking_link} placeholder="Tracking Link" ref={node => {
                          this.tracking_link = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-8 col-md-5">
                      <div>
                        <input className="form-control" defaultValue={order.name} placeholder="Name (required)" ref={node => {
                          this.name = node;
                        }} />
                        <input className="form-control" defaultValue={order.link} placeholder="Link" ref={node => {
                          this.link = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-2">
                      <div>
                        <input className="form-control" defaultValue={order.number} placeholder="Number" ref={node => {
                          this.number = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                      <div>
                        <input className="form-control" defaultValue={order.category} placeholder="Category" ref={node => {
                          this.category = node;
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-md-4">
                      <div>
                        <input className="form-control" defaultValue={order.material} placeholder="Material" ref={node => {
                          this.material = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                      <div>
                        <input className="form-control" defaultValue={order.supplier} placeholder="Supplier" ref={node => {
                          this.supplier = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-4 col-md-1">
                      <div>
                        <input className="form-control" defaultValue={order.price} placeholder="Price per item" ref={node => {
                          this.price = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-3 col-md-1">
                      <div>
                        <input className="form-control" defaultValue={order.quantity} placeholder="Quantity" ref={node => {
                          this.quantity = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-5 col-md-2 col-lg-2">
                      <div>
                        {
                          order.price && order.quantity && 
                          `= $${(Number(order.price.replace(/[^0-9\.]/g, "")) * order.quantity).toFixed(2).toLocaleString()}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-5">
                      <div>
                        <input className="form-control" defaultValue={order.notes} placeholder="Notes" ref={node => {
                          this.notes = node;
                        }} />
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-5 col-lg-5">
                      <div>
                        Status Updated: {order.updated && (new Date(order.updated)).toString()}
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-3 col-lg-2 text-right">
                      <div>
                        <button className="btn btn-success" disabled={isSubmittingEdit} onClick={() => {
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
                        &nbsp;
                        <button className="btn btn-danger" disabled={isSubmittingEdit} onClick={() => {
                          stopEditing();
                        }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            : <div className="row" key={order.id}>
                <div className="col-xs-12 order-container">
                  <div className="row">
                    <div className="col-xs-4 col-md-2">
                      <div>
                        {order.tracking_link
                          ? <a target="_blank" href={order.tracking_link}>{statusIdToName(order.status_id)}</a>
                          : statusIdToName(order.status_id)
                        }
                      </div>
                    </div>
                    <div className="col-xs-8 col-md-5">
                      <div>
                        {order.link
                          ? <a target="_blank" href={order.link}>{order.name}</a>
                          : order.name
                        }
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-2">
                      <div>
                        #: {order.number}
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                      <div>
                        Category: {order.category}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-md-4">
                      <div>
                        Material: {order.material}
                      </div>
                    </div>
                    <div className="col-xs-6 col-md-4">
                      <div>
                        Supplier: {order.supplier}
                      </div>
                    </div>
                    <div className="col-xs-4 col-md-1">
                      <div>
                        {order.price && order.price.toString()}
                      </div>
                    </div>
                    <div className="col-xs-3 col-md-1">
                      <div>
                        {order.quantity && 'x ' + order.quantity.toString()}
                      </div>
                    </div>
                    <div className="col-xs-5 col-md-2 col-lg-2">
                      <div>
                        {
                          order.price && order.quantity && 
                          `= $${(Number(order.price.replace(/[^0-9\.]/g, "")) * order.quantity).toFixed(2).toLocaleString()}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-5 col-lg-5">
                      <div>
                        Notes: {order.notes}
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-5 col-lg-5">
                      <div>
                        Status Updated: {order.updated && (new Date(order.updated)).toString()}
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-2 col-lg-2 text-right">
                      <div>
                        <button className="btn" disabled={isSubmittingEdit} onClick={() => {
                          startEditing(order.id);
                        }}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )}
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
