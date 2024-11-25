import { createSlice } from "@reduxjs/toolkit";


const PaidCoursesSlice = createSlice({
  name: 'paidCourses',
  initialState: [], // Initially empty list of paid courses
  reducers: {
    addToPaidCourses: (state, action) => {
      state.push(action.payload);  // Add a course to the paidCourses list
    },
    clearPaidCourses: (state) => {
      return [];  // Clear all paid courses
    },
  },
});

export const { addToPaidCourses, clearPaidCourses } = PaidCoursesSlice.actions;

export default PaidCoursesSlice.reducer;
