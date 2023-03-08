import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateLastDonationData from "../../screens/ProfileScreen/components/UpdateLastDonationData";
import UpdateUserInfoModal from "../../screens/ProfileScreen/components/UpdateUserInfoModal";
import {
  closeProfileEditModal,
  closeUpdateLastDonateModa,
  getModalData,
} from "../../store/reducers/globalModalsSlice";
import Modal from "./Modal";

const ModalConatiner = () => {
  const {
    isLoveMessageModal,
    isProfileEditModal,
    isProfileSettingsModal,
    isUpdateLastDonateModal,
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
    </Modal>
  );
};

export default memo(ModalConatiner);
