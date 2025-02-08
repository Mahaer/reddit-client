import { configureStore } from '@reduxjs/toolkit';
import sliceNameReducer from '../features/componentA/componentASlice';

export const store = configure({
	reducer: {
		sliceName: sliceNameReducer
	},
});
