import { createSlice } from '@reduxjs/toolkit'

const MyCartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addCourseToCart(state, action) {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            return state.filter(course => course.id !== action.payload);
        },
        clearCart: (state) => {
            return [];  
        },
    }
})

export const { addCourseToCart, removeFromCart, clearCart } = MyCartSlice.actions;
export default MyCartSlice.reducer;