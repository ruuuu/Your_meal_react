// state  котрый опрелеляет открыто окно или нет

import { createSlice } from "@reduxjs/toolkit";




const modalSlice = createSlice({

      name: 'modal',                 // нзв state
      initialState: {
            isOpen: true,          // мод окно открыто
      },
      reducers: {
            // редьюсер:
            openModal: (state) => {
                  state.isOpen = true
            },
            // редьюсер:
            closeModal: (state) => {
                  state.isOpen = false
            }

      }

});

export const { openModal, closeModal } = modalSlice.actions;  // импорт функций из modalSlice.actions
export default modalSlice.reducer;   // здесь экспортируем, а в index.js импортруем как modalReducer