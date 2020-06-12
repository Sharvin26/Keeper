import { createStore, combineReducers, applyMiddleware } from "redux";
import KeeperReducer from "./reducer/KeeperReducer";
import thunk from "redux-thunk";

// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    Keeps: KeeperReducer,
});

// const middlewares = [thunk];
// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middlewares))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
