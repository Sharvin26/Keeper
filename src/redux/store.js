import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import momentReducer from "./reducer/momentReducer";
import expenditureReducer from "./reducer/expenditureReducer";
import documentReducer from "./reducer/documentReducer";
import todoReducer from "./reducer/todoReducer";
import barcodeReducer from "./reducer/barcodeReducer";
import cardReducer from "./reducer/cardReducer";

// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    moments: momentReducer,
    expenditures: expenditureReducer,
    documents: documentReducer,
    todos: todoReducer,
    barcodeDocuments: barcodeReducer,
    cards: cardReducer,
});

// const middlewares = [thunk];
// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middlewares))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
