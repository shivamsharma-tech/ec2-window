import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import DataSaga from "./DataSaga";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer:rootReducer,
    middleware:() =>[sagaMiddleware]
})

sagaMiddleware.run(DataSaga)