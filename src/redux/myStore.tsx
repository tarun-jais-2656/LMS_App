import { configureStore } from "@reduxjs/toolkit";
import CourseDetailReducer from "./courseDetail/courseDetailSlice"
import MyCartReducer from "./myCart/myCartSlice"
import PaidCoursesReducer from "./paidCourses/paidCoursesSlice"


export const MyStore=configureStore({
    reducer:{
        course:CourseDetailReducer,
        cart:MyCartReducer,
        paidCourses: PaidCoursesReducer,
    }
})
