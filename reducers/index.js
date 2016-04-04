import { combineReducers } from 'redux'
import {
  TRY_PASSWORD,
  CHECKED_PASSWORD,
  HIDE_PASSWORD_SUCCESS,
  INVALIDATE_ORDERS,
  REQUEST_ORDERS,
  RECEIVE_ORDERS,
  SUBMIT_ORDER,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE
} from '../actions'

function enteredPassword(state = {
  password: '',
  isCorrect: false,
  isChecking: false,
  showSuccess: false
}, action) {
  switch (action.type) {
    case TRY_PASSWORD:
      return Object.assign({}, state, {
        isChecking: true
      });
    case CHECKED_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
        isCorrect: action.isCorrect,
        isChecking: false,
        showSuccess: action.isCorrect
      });
    case HIDE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        showSuccess: false
      });
    default:
      return state;
  }
}

function orders(state = {
  isFetching: false,
  isEditing: false,
  isSubmitting: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_ORDERS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_ORDERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.orders,
        lastUpdated: action.receivedAt
      });
    case SUBMIT_ORDER:
      return Object.assign({}, state, {
        isSubmitting: true
      });
    case SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false
      });
    case SUBMIT_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false
      });
    default: 
      return state;
  }
}

// function posts(state = {
  // isFetching: false,
  // didInvalidate: false,
  // items: []
// }, action) {
  // switch (action.type) {
    // case INVALIDATE_REDDIT:
      // return Object.assign({}, state, {
        // didInvalidate: true
      // })
    // case REQUEST_POSTS:
      // return Object.assign({}, state, {
        // isFetching: true,
        // didInvalidate: false
      // })
    // case RECEIVE_POSTS:
      // return Object.assign({}, state, {
        // isFetching: false,
        // didInvalidate: false,
        // items: action.posts,
        // lastUpdated: action.receivedAt
      // })
    // default:
      // return state
  // }
// }

// function postsByReddit(state = { }, action) {
  // switch (action.type) {
    // case INVALIDATE_REDDIT:
    // case RECEIVE_POSTS:
    // case REQUEST_POSTS:
      // return Object.assign({}, state, {
        // [action.reddit]: posts(state[action.reddit], action)
      // })
    // default:
      // return state
  // }
// }

const rootReducer = combineReducers({
  orders,
  enteredPassword
})

export default rootReducer
