import { configureStore } from '@reduxjs/toolkit';
import { contactsList } from './contactsList';

export const store = configureStore({
  reducer: { contacts: contactsList.reducer },
});
