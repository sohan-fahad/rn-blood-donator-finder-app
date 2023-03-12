import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateLastDonationData from "../../screens/ProfileScreen/components/UpdateLastDonationData";
import UpdateUserInfoModal from "../../screens/ProfileScreen/components/UpdateUserInfoModal";
import {
  closeProfileEditModal,
  closeReminderModal,
  closeUpdateLastDonateModa,
  getModalData,
} from "../../store/reducers/globalModalsSlice";
import Modal from "./Modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import SetReminderModal from "../../screens/ProfileScreen/components/SetReminderModal";
import ReminderList from "../../screens/ProfileScreen/components/ReminderList";

const ModalConatiner = () => {
  const {
    isLoveMessageModal,
    isProfileEditModal,
    isProfileSettingsModal,
    isUpdateLastDonateModal,
    isReminderModal,
    isReminderListModal,
  } = useSelector(getModalData);

  const dispatch = useDispatch();

  return (
    <Modal>
      {isProfileEditModal && (
        <UpdateUserInfoModal
          closeModal={() => dispatch(closeProfileEditModal())}
        />
      )}

      {isUpdateLastDonateModal && (
        <UpdateLastDonationData
          closeModal={() => dispatch(closeUpdateLastDonateModa())}
        />
      )}

      {isReminderModal && (
        <SetReminderModal closeModal={() => dispatch(closeReminderModal())} />
      )}

      {isReminderListModal && <ReminderList />}
    </Modal>
  );
};

export default memo(ModalConatiner);
