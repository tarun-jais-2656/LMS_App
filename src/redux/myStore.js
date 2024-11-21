import { configureStore } from "@reduxjs/toolkit";
import CourseDetailReducer from "./courseDetail/courseDetailSlice"
import MyCartReducer from "./myCart/myCartSlice"


export const MyStore=configureStore({
    reducer:{
        course:CourseDetailReducer,
        cart:MyCartReducer
    }
})