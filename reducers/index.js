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
  SUBMIT_FAILURE,
  HIDE_SUBMIT_STATUS,
  START_EDITING,
  FINISH_EDITING,
  SUBMIT_EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
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

function addOrder(state = {
  isSubmitting: false,
  submission: {
    status_id: 1,
    tracking_link: null,
    name: null,
    number: null,
    link: null,
    category: null,
    material: null,
    supplier: null,
    price: null,
    quantity: null,
    notes: null
  },
  showSubmitSuccess: false,
  showSubmitFailure: false,
}, action) {
  switch (action.type) {
    case SUBMIT_ORDER:
      return Object.assign({}, state, {
        isSubmitting: true,
        submission: action.order
      });
    case SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        submission: {
          status_id: 1,
          tracking_link: null,
          name: null,
          number: null,
          link: null,
          category: null,
          material: null,
          supplier: null,
          price: null,
          quantity: null,
          notes: null
        },
        showSubmitSuccess: true
      });
    case SUBMIT_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        showSubmitFailure: true
      });
    case HIDE_SUBMIT_STATUS:
      return Object.assign({}, state, {
        showSubmitSuccess: false,
        showSubmitFailure: false
      });
    default:
      return state;
  }
}

function orders(state = {
  isFetching: false,
  isEditing: false,
  isSubmittingEdit: false,
  editingId: null,
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
    case START_EDITING:
      return Object.assign({}, state, {
        isEditing: true,
        editingId: action.id
      });
    case FINISH_EDITING:
      return Object.assign({}, state, {
        isEditing: false
      });
    case SUBMIT_EDIT:
      return Object.assign({}, state, {
        isSubmittingEdit: true
      });
    case EDIT_SUCCESS:
      return Object.assign({}, state, {
        isSubmittingEdit: false,
        editingId: null
      });
    case EDIT_FAILURE:
      return Object.assign({}, state, {
        isSubmittingEdit: false,
        editingId: null
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
  addOrder,
  enteredPassword
})

export default rootReducer
