import { useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

interface ModalProps {
  isOpen: boolean;
  text: string;
  title: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: { (): void };
  onCancel?: { (): void };
}

const Modal = (props: ModalProps) => {
  const { isOpen, text, title, confirmText, cancelText, onCancel, onConfirm } =
    props;
  const [opened, setOpened] = useState<boolean>(isOpen);
  useEffect(() => {
    isOpen && setOpened(true);
  }, [isOpen]);

  return (
    <>
      {opened && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-3/4">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 md:px-4 px-2 py-3 flex flex-row md:justify-end justify-around">
                  {onCancel && cancelText && (
                    <ButtonSecondary
                      className="mr-3"
                      onClick={() => {
                        setOpened(false);
                        onCancel();
                      }}
                    >
                      {cancelText}
                    </ButtonSecondary>
                  )}
                  <ButtonPrimary
                    onClick={() => {
                      setOpened(false);
                      onConfirm();
                    }}
                  >
                    {confirmText}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
