import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = {}, action) => {
  if (action.type === 'setUser') {
    return { user: action.payload.user };
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;