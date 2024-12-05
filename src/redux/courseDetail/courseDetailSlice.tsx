import {createSlice} from '@reduxjs/toolkit'

const CourseDetailSlice=createSlice({
    name:'courseDetail',
    initialState:[],
    reducers:{
        addCourse(state,action){
            state.push(action.payload);
        }
    }
})

export const {addCourse}=CourseDetailSlice.actions;
export default CourseDetailSlice.reducer;