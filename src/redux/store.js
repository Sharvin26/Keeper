import { createStore, combineReducers, applyMiddleware } from "redux";
import momentReducer from "./reducer/momentReducer";
import expenditureReducer from "./reducer/expenditureReducer";
import documentReducer from "./reducer/documentReducer";
import todoReducer from "./reducer/todoReducer";
import thunk from "redux-thunk";

// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    moments: momentReducer,
    expenditures: expenditureReducer,
    documents: documentReducer,
    todos: todoReducer,
});

// const middlewares = [thunk];
// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middlewares))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
