import React, { Component, PropTypes } from 'react'
import { statusIdToName } from './Orders'

export default class AddOrder extends Component {
  render() {
    console.log(`AddOrder props: ${JSON.stringify(this.props)}`);
    const {isSubmitting, createOrderIfPossible} = this.props;
    let status_id = 0;
    let tracking_link = '';
    let name = '';
    let number = '';
    let link = '';
    let category = '';
    let material = '';
    let supplier = '';
    let price = '$0.00';
    let quantity = 0;
    let notes = '';
    
    return (
      <div>
        Add a order:
        <form onSubmit={e => {
          e.preventDefault();
          if (!name.value.trim()) {
            return;
          }
          const order = {
            status_id,
            tracking_link,
            name,
            number,
            link,
            category,
            material,
            supplier,
            price,
            quantity,
            notes
          };
          console.log(`order from AddOrder: ${JSON.stringify(order)}`);
          createOrderIfPossible({
            status_id,
            tracking_link,
            name,
            number,
            link,
            category,
            material,
            supplier,
            price,
            quantity,
            notes
          });
        }}>
          <select ref={node => {
            status_id = node;
          }}>
            <option value="0" key="0">
              {statusIdToName(0)}
            </option>
            <option value="1" key="1">
              {statusIdToName(1)}
            </option>
            <option value="2" key="2">
              {statusIdToName(2)}
            </option>
            <option value="3" key="3">
              {statusIdToName(3)}
            </option>
            <option value="4" key="4">
              {statusIdToName(4)}
            </option>
          </select>
          <input placeholder="Tracking Link" ref={node => {
            tracking_link = node;
          }} />
          <input placeholder="Name" ref={node => {
            name = node;
          }} />
          <input placeholder="Number" ref={node => {
            number = node;
          }} />
          <input placeholder="Link" ref={node => {
            link = node;
          }} />
          <input placeholder="Category" ref={node => {
            category = node;
          }} />
          <input placeholder="Material" ref={node => {
            material = node;
          }} />
          <input placeholder="Supplier" ref={node => {
            supplier = node;
          }} />
          <input placeholder="Price" ref={node => {
            price = `$${(Number(String(node).replace(/[^0-9\.]/g, ""))).toFixed(2).toLocaleString()}`;
          }} />
          <input placeholder="Quantity" ref={node => {
            quantity = Number(node);
          }} />
          <input placeholder="Notes" ref={node => {
            notes = node;
          }} />
          <button type="submit" disabled="true">
            Submit
          </button>
        </form>
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

AddOrder.propTypes = {
  // options: PropTypes.arrayOf(
    // PropTypes.string.isRequired
  // ).isRequired,
  // value: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired
}
