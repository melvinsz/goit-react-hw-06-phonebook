import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactsList = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const hasName = state.contacts.some(
          contact => contact.name === action.payload.name
        );
        if (hasName) {
          Notiflix.Notify.warning(
            `Contact "${action.payload.name}" already exist.`
          );
          return;
        }
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return { payload: { name, number, id: nanoid() } };
      },
    },
    deleteContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
      state.contacts.filter(el =>
        el.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addContact, deleteContact, filterContacts } =
  contactsList.actions;
