import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/navbar/NavbarSlice';

export const store = configureStore({
	reducer: {
		search: searchSlice,
	},
});
