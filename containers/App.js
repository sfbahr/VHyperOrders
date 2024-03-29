import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {fetchOrdersIfNeeded,
        createOrderIfPossible,
        validatePasswordIfNeeded,
        invalidateOrders,
        startEditing,
        stopEditing,
        submitEdit} from '../actions'
import EnterPassword from '../components/EnterPassword'
import AddOrder from '../components/AddOrder'
import Orders from '../components/Orders'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
    // this.handlePasswordEnter = this.handlePasswordEnter.bind(this);
  }

  componentDidMount() {
    // const { dispatch, selectedReddit } = this.props
    // dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedReddit !== this.props.selectedReddit) {
      // const { dispatch, selectedReddit } = nextProps
      // dispatch(fetchPostsIfNeeded(selectedReddit))
    // }
  }

  // handleChange(nextReddit) {
    // this.props.dispatch(selectReddit(nextReddit))
  // }

  // handleRefreshClick(e) {
    // e.preventDefault()

    // const { dispatch, selectedReddit } = this.props
    // dispatch(invalidateReddit(selectedReddit))
    // dispatch(fetchPostsIfNeeded(selectedReddit))
  // }
  
  // handlePasswordEnter(psw) {
    // this.props.dispatch(validatePasswordIfNeeded(psw));
  // }

  render() {
    const { psw, isCorrect, isChecking, showSuccess, onPswEntered } = this.props;
    const { isSubmitting, submission, showSubmitSuccess, showSubmitFailure,
            createOrderIfPossible} = this.props;
    const { orders, isFetching, isEditing, isSubmittingEdit, editingId, 
            startEditing, stopEditing, submitEdit, fetchOrdersIfNeeded } = this.props;
    
    return (
      <div className="container">
        <EnterPassword psw={psw}
                       isCorrect={isCorrect}
                       isChecking={isChecking}
                       showSuccess={showSuccess}
                       onEntered={onPswEntered} />
        {isCorrect &&
          <div>
            <AddOrder isSubmitting={isSubmitting}
                      submission={submission}
                      createOrderIfPossible={createOrderIfPossible}/>
            <br />
            {showSubmitSuccess && "Submission succeeded"}
            {showSubmitFailure && "Submission failed"}
            <br />
            <br />
            <h2>Orders:</h2>
            <Orders orders={orders}
                    statusIncludes={[0, 1, 2, 3]}
                    isEditing={isEditing}
                    isSubmittingEdit={isSubmittingEdit}
                    editingId={editingId}
                    startEditing={startEditing}
                    stopEditing={stopEditing}
                    submitEdit={submitEdit} />
            <br />
            <h2>Arrived Orders:</h2>
            <Orders orders={orders}
                    statusIncludes={[4]}
                    isEditing={isEditing}
                    isSubmittingEdit={isSubmittingEdit}
                    editingId={editingId}
                    startEditing={startEditing}
                    stopEditing={stopEditing}
                    submitEdit={submitEdit} />
          </div>
        }
      </div>
    );
    
    // const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    // const isEmpty = posts.length === 0
    // return (
      // <div>
        // <Picker value={selectedReddit}
                // onChange={this.handleChange}
                // options={[ 'reactjs', 'frontend' ]} />
        // <p>
          // {lastUpdated &&
            // <span>
              // Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              // {' '}
            // </span>
          // }
          // {!isFetching &&
            // <a href="#"
               // onClick={this.handleRefreshClick}>
              // Refresh
            // </a>
          // }
        // </p>
        // {isEmpty
          // ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          // : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              // <Posts posts={posts} />
            // </div>
        // }
      // </div>
    // )
  }
}

App.propTypes = {
  psw: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isChecking: PropTypes.bool.isRequired,
  //dispatch: PropTypes.func.isRequired
  
  // selectedReddit: PropTypes.string.isRequired,
  // posts: PropTypes.array.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // lastUpdated: PropTypes.number,
  // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {orders, addOrder, enteredPassword} = state;
  const {password, isCorrect, isChecking, showSuccess} = enteredPassword;
  const {isSubmitting, submission, showSubmitSuccess, showSubmitFailure} = addOrder;
  const {items, isFetching, isEditing, isSubmittingEdit, editingId} = orders;
  return  {
    psw: password,
    isCorrect,
    isChecking,
    showSuccess,
    orders: items,
    isFetching,
    isEditing,
    isSubmittingEdit,
    editingId,
    isSubmitting,
    submission,
    showSubmitSuccess,
    showSubmitFailure
  };
  
  // const { selectedReddit, postsByReddit } = state
  // const {
    // isFetching,
    // lastUpdated,
    // items: posts
  // } = postsByReddit[selectedReddit] || {
    // isFetching: true,
    // items: []
  // }

  // return {
    // selectedReddit,
    // posts,
    // isFetching,
    // lastUpdated
  // }
}

function mapDispatchToProps(dispatch) {
  return {
    onPswEntered: (psw) => {
      dispatch(validatePasswordIfNeeded(psw));
    },
    fetchOrdersIfNeeded: () => {
      dispatch(fetchOrdersIfNeeded());
    },
    createOrderIfPossible: (order) => {
      dispatch(createOrderIfPossible(order));
    },
    startEditing: (id) => {
      dispatch(startEditing(id));
    },
    stopEditing: () => {
      dispatch(stopEditing());
    },
    submitEdit: (order) => {
      dispatch(submitEdit(order));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
