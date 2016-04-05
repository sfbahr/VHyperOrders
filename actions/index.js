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
          }, 5000);
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
