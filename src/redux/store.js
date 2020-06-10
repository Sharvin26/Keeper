import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import KeeperReducer from "./reducer/KeeperReducer";

const rootReducer = combineReducers({
    Keeps: KeeperReducer,
});

//  composeWithDevTools()

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
