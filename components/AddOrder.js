import React, { Component, PropTypes } from 'react'
import { statusIdToName } from './Orders'

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.clearAddOrderForm = this.clearAddOrderForm.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
    // this.handlePasswordEnter = this.handlePasswordEnter.bind(this);
  }
  
  // componentWillReceiveProps(nextProps) {
    // clearAddOrderForm(nextProps);
    
    // const { status_id,
            // tracking_link,
            // name,
            // number,
            // link,
            // category,
            // material,
            // supplier,
            // price,
            // quantity,
            // notes } = props.submission;
    
    // this.status_id.value = status_id;
    // this.tracking_link.value = tracking_link;
    // this.name.value = name;
    // this.number.value = number;
    // this.link.value = link;
    // this.category.value = category;
    // this.material.value = material;
    // this.supplier.value = supplier;
    // this.price.value = price;
    // this.quantity.value = quantity;
    // this.notes.value = notes;
  // }
  
  clearAddOrderForm() {
    this.status_id.value = 1;
    this.tracking_link.value = null;
    this.name.value = null;
    this.number.value = null;
    this.link.value = null;
    this.category.value = null;
    this.material.value = null;
    this.supplier.value = null;
    this.price.value = null;
    this.quantity.value = null;
    this.notes.value = null;
  }
  
  render() {
    console.log(`AddOrder props: ${JSON.stringify(this.props)}`);
    const { isSubmitting, createOrderIfPossible} = this.props;
    const { status_id,
            tracking_link,
            name,
            number,
            link,
            category,
            material,
            supplier,
            price,
            quantity,
            notes } = this.props.submission;
    
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          if (!this.name.value.trim()) {
            return;
          }
          const order = {
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
          console.log(`order from AddOrder: ${JSON.stringify(order)}`);
          createOrderIfPossible(order);
        }}>
          <h2>Add an order:</h2>
          <div className="row form-group">
            <div className="col-xs-4">
              <select className="form-control" defaultValue="1" ref={node => {
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
            </div>
            <div className="col-xs-8">
              <input className="form-control" placeholder="Tracking Link" ref={node => {
                this.tracking_link = node;
              }} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-xs-4">
              <input className="form-control" placeholder="Name (required)" ref={node => {
                this.name = node;
              }} />
            </div>
            <div className="col-xs-8">
              <input className="form-control" placeholder="Link" ref={node => {
                this.link = node;
              }} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Number" ref={node => {
                this.number = node;
              }} />
            </div>
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Category" ref={node => {
                this.category = node;
              }} />
            </div>
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Material" ref={node => {
                this.material = node;
              }} />
            </div>
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Supplier" ref={node => {
                this.supplier = node;
              }} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Price per item" ref={node => {
                this.price = node;
              }} />
            </div>
            <div className="col-xs-6 col-md-3">
              <input className="form-control" placeholder="Quantity" ref={node => {
                this.quantity = node;
              }} />
            </div>
            <div className="col-xs-12 col-md-6">
              <input className="form-control" placeholder="Notes" ref={node => {
                this.notes = node;
              }} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Submit
          </button>
          &nbsp;
          <button className="btn" onClick={this.clearAddOrderForm}>Clear</button>
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
