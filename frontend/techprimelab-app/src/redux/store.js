import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "./Auth/auth.reducer";
import { projectReducer } from "./Project/project.reducer";

const rootReducer = combineReducers({ authReducer, projectReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export { store }