import {createSlice} from '@reduxjs/toolkit'

const MyCartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addCourseToCart(state,action){
            state.push(action.payload);
        }
    }
})

export const {addCourseToCart}=MyCartSlice.actions;
export default MyCartSlice.reducer;