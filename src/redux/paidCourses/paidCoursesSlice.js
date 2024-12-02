import { createSlice } from "@reduxjs/toolkit";


const PaidCoursesSlice = createSlice({
  name: 'paidCourses',
  initialState: [],
  reducers: {
    addToPaidCourses: (state, action) => {
      state.push(action.payload);
      // console.log("00000000000=========>",action.payload);
    },
    clearPaidCourses: (state) => {
      return []; 
    },
  },
});

export const { addToPaidCourses, clearPaidCourses } = PaidCoursesSlice.actions;

export default PaidCoursesSlice.reducer;
