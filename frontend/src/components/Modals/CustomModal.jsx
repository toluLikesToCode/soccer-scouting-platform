import React from "react";
import { Button, Modal } from "flowbite-react";

const CustomModal = ({ content, openModal, setOpenModal,actionFunc }) => {
    const DoAction = ()=>{
        actionFunc();
        setOpenModal(false)
    }
  return (
    <>
      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => setOpenModal(!openModal)}
      >
        <Modal.Header />
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer className="flex rounded-sm border-8">
          <Button onClick={() => DoAction()} className={"bg-blue-600 left-5"}>Execute</Button>
          <Button color="gray" className={"bg-red-600 mx-16 right-5"} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default CustomModal;
