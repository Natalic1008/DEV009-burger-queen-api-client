import React from "react";


type  ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  action: () => void;
  nameAction: string;
}

 const Modal: React.FC<ModalProps> =({
  title,
  onClose,
  children,
  action,
  nameAction,
}) => {

  return (
    <div >
      <div >
        <div >
          <div >
            <h5 >{title}</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div
            /*className={
              title === "New Product" || title === "Edit Product"
                ? style.modal_product
                : title === "Add User" || title === "Edit User"
                ? style.modal_user
                : "modal-body"
            }*/
          >
            {children}
          </div>

          <div>
            <button
              type="button"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              data-testid="btn_modal"
              onClick={action}
            >
              {nameAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal