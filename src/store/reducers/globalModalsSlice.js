import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  isProfileEditModal: false,
  isProfileSettingsModal: false,
  isLoveMessageModal: false,
  isUpdateLastDonateModal: false,
  isReminderModal: false,
  isReminderListModal: false,
  isGlobalModal: false,
};

const globalModalsSlice = createSlice({
  name: "globalModals",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    openProfileSettingsModal: (state) => {
      state.value.isGlobalModal = true;
      state.value.isProfileSettingsModal = true;
    },
    closeProfileSettingsModal: (state) => {
      state.value.isGlobalModal = false;
      state.value.isProfileSettingsModal = false;
    },

    openProfileEditModal: (state) => {
      state.value.isGlobalModal = true;
      state.value.isProfileEditModal = true;
    },
    closeProfileEditModal: (state) => {
      state.value.isProfileEditModal = false;
      state.value.isGlobalModal = false;
    },

    openUpdateLastDonateModa: (state) => {
      state.value.isGlobalModal = true;
      state.value.isUpdateLastDonateModal = true;
    },
    closeUpdateLastDonateModa: (state) => {
      state.value.isUpdateLastDonateModal = false;
      state.value.isGlobalModal = false;
    },

    openReminderModal: (state) => {
      state.value.isGlobalModal = true;
      state.value.isReminderModal = true;
    },
    closeReminderModal: (state) => {
      state.value.isReminderModal = false;
      state.value.isGlobalModal = false;
    },

    openReminderListModal: (state) => {
      state.value.isGlobalModal = true;
      state.value.isReminderListModal = true;
    },
    closeReminderListModal: (state) => {
      state.value.isReminderListModal = false;
      state.value.isGlobalModal = false;
    },

    openLoveMessageModal: (state) => {
      state.value.isGlobalModal = true;
      state.value.isLoveMessageModal = true;
    },
    closeLoveMessageModal: (state) => {
      state.value.isLoveMessageModal = false;
      state.value.isGlobalModal = false;
    },

    resetModal: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const {
  openProfileSettingsModal,
  closeProfileSettingsModal,
  openProfileEditModal,
  closeProfileEditModal,
  openUpdateLastDonateModa,
  closeUpdateLastDonateModa,
  openReminderModal,
  closeReminderModal,
  openReminderListModal,
  closeReminderListModal,
  openLoveMessageModal,
  closeLoveMessageModal,
  resetModal,
} = globalModalsSlice.actions;

export const getModalData = (state) => state.globalModals.value;
export default globalModalsSlice.reducer;
