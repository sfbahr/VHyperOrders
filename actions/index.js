import fetch from 'isomorphic-fetch';

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const INVALIDATE_ORDERS = 'INVALIDATE_ORDERS';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';
export const HIDE_SUBMIT_STATUS = 'HIDE_SUBMIT_STATUS';
export const TRY_PASSWORD = 'TRY_PASSWORD';
export const CHECKED_PASSWORD = 'CHECKED_PASSWORD';
export const HIDE_PASSWORD_SUCCESS = 'HIDE_PASSWORD_SUCCESS';
export const START_EDITING = 'START_EDITING';
export const STOP_EDITING = 'STOP_EDITING';
export const SUBMIT_EDIT = 'SUBMIT_EDIT';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';


export function invalidateOrders() {
  return {
    type: INVALIDATE_ORDERS
  }
}

function tryPassword() {
  return {
    type: TRY_PASSWORD
  }
}

function checkedPassword(json) {
  return {
    type: CHECKED_PASSWORD,
    password: json.password,
    isCorrect: json.isCorrect,
    receivedAt: Date.now()
  }
}

function hidePasswordSuccess() {
  return {
    type: HIDE_PASSWORD_SUCCESS
  }
}

function validatePassword(password) {
  return dispatch => {
    dispatch(tryPassword());
    return fetch(`/password/${password}`)
      .then(response => response.json())
      .then(json => {
        dispatch(checkedPassword(json));
        if (json.isCorrect) {
          dispatch(fetchOrdersIfNeeded());
          setTimeout(() => {
            dispatch(hidePasswordSuccess());
          }, 2000);
          setInterval(() => {
            dispatch(fetchOrdersIfNeeded());
          }, 15000);
        }
      });
  }
}

function shouldValidatePassword(state) {
  if (state.enteredPassword.isChecking) {
    return false;
  }
  return !state.enteredPassword.isCorrect;
}

export function validatePasswordIfNeeded(password) {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldValidatePassword(state)) {
      return dispatch(validatePassword(password));
    }
  }
}

///////////////////

function requestOrders() {
  return {
    type: REQUEST_ORDERS
  };
}

function receiveOrders(json) {
  return {
    type: RECEIVE_ORDERS,
    orders: json,
    receivedAt: Date.now()
  };
}

function fetchOrders(password) {
  return dispatch => {
    dispatch(requestOrders())
    return fetch(`/orders/${password}`)
      .then(response => response.json())
      .then(json => dispatch(receiveOrders(json)))
  };
}

function shouldFetchOrders(state) {
  if (!state.enteredPassword.isCorrect) {
    return false;
  }
  if (state.orders.isFetching || state.orders.isSubmitting || state.orders.isEditing) {
    return false;
  }
  return true;
}

export function fetchOrdersIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchOrders(state)) {
      return dispatch(fetchOrders(state.enteredPassword.password));
    }
  };
}

///////////////////



function submitOrder(order) {
  return {
    type: SUBMIT_ORDER,
    order
  };
}

function submitSuccess() {
  return {
    type: SUBMIT_SUCCESS
  };
}

function submitFailure() {
  return {
    type: SUBMIT_FAILURE
  };
}

function hideSubmitStatus() {
  return {
    type: HIDE_SUBMIT_STATUS
  };
}

function createOrder(password, order) {
  return dispatch => {
    console.log(`creating order: ${JSON.stringify(order)}`);
    dispatch(submitOrder(order));
    return fetch(`/orders/${password}`, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(order)
      }).then(response => response.json())
      .then(json => {
        if (json.submitted) {
          dispatch(submitSuccess());
          dispatch(fetchOrdersIfNeeded());
        }
        else {
          dispatch(submitFailure());
        }
        setTimeout(() => {
          dispatch(hideSubmitStatus());
        }, 5000);
      });
  };
}

function shouldCreateOrder(state) {
  if (!state.enteredPassword.isCorrect) {
    return false;
  }
  return true;
}

export function createOrderIfPossible(order) {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldCreateOrder(state)) {
      return dispatch(createOrder(state.enteredPassword.password, order));
    }
  };
}

///////////////////

export function startEditing(id) {
  return {
    type: START_EDITING,
    id
  };
}

export function stopEditing() {
  return {
    type: STOP_EDITING
  };
}

function startSubmitEdit() {
  return {
    type: SUBMIT_EDIT
  }
}

function editSuccess() {
  return {
    type: EDIT_SUCCESS
  };
}

function editFailure() {
  return {
    type: EDIT_FAILURE
  };
}



export function submitEdit(order) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.enteredPassword.isCorrect) {
      console.log(`creating order: ${JSON.stringify(order)}`);
      dispatch(startSubmitEdit());
      dispatch(stopEditing());
      let oldOrder;
      let i;
      for (i = 0; i < state.orders.items.length; i++) {
        const existingOrder = state.orders.items[i];
        if (existingOrder.id === order.id) {
          oldOrder = existingOrder;
          break;
        }
      }
      if (!oldOrder) {
        console.log(`Couldn't find old Order with id ${order.id}`);
        return dispatch(editFailure());
      }
      
      const editedOrder = Object.assign({}, oldOrder, order, {
        old_status_id: oldOrder.status_id
      });
      
      console.log(`edited order: ${JSON.stringify(editedOrder)}`);
      
      return fetch(`/orders/${state.enteredPassword.password}`, {
          method: "PUT",
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(editedOrder)
        }).then(response => response.json())
        .then(json => {
          if (json.success) {
            dispatch(editSuccess());
            dispatch(fetchOrdersIfNeeded());
          }
          else {
            dispatch(editFailure());
          }
        });
    }
  };
}

// function requestOrders() {
  // return {
    // type: REQUEST_ORDERS
  // }
// }

// function receiveOrders(json) {
  // return {
    // type: RECEIVE_ORDERS,
    // orders: json,
    // receivedAt: Date.now()
  // }
// }

// function fetchOrders(password) {
  // return dispatch => {
    // dispatch(requestOrders())
    // return fetch(`/orders/${password}`)
      // .then(response => response.json())
      // .then(json => dispatch(receiveOrders(json)))
  // }
// }

// function shouldFetchPosts(state, reddit) {
  // const posts = state.postsByReddit[reddit]
  // if (!posts) {
    // return true
  // }
  // if (posts.isFetching) {
    // return false
  // }
  // return posts.didInvalidate
// }

// export function fetchPostsIfNeeded(reddit) {
  // return (dispatch, getState) => {
    // const state = getState()
    // if (shouldFetchPosts(state, reddit)) {
      // return dispatch(fetchOrders(state.password))
    // }
  // }
// }
