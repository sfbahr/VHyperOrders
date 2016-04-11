import React, { Component, PropTypes } from 'react'

export default class EnterPassword extends Component {
  render() {
    const { isCorrect, isChecking, onEntered, showSuccess } = this.props;
    console.log(`EnterPassword props: ${JSON.stringify(this.props)}`);
    let psw;
    
    return (
      <div>
        {!isCorrect &&
          <div>
            <h2>Password:</h2>
            <form className="form" onSubmit={e => {
              e.preventDefault();
              if (!psw.value.trim()) {
                return;
              }
              onEntered(psw.value);
            }} disabled={isCorrect || isChecking}>
              <div className="row form-group">
                <div className="col-sm-6 col-md-5 col-lg-4">
                  <input className="form-control" type="password" autoComplete="on" ref={node => {
                    psw = node;
                  }} />
                </div>
              </div>
              <button className="btn btn-primary" type="submit" disabled={isCorrect || isChecking}>
                Submit
              </button>
              {isChecking && "Checking..."}
            </form>
          </div>
        }
        {showSuccess && 
          "Password accepted."
        }
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

EnterPassword.propTypes = {
  psw: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isChecking: PropTypes.bool.isRequired,
  onEntered: PropTypes.func.isRequired
  // options: PropTypes.arrayOf(
    // PropTypes.string.isRequired
  // ).isRequired,
  // value: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired
}
