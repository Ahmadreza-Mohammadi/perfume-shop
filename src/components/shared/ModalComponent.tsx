import React from "react";
import { modalTypes } from "../constants/const";

function ModalComponent({
  type,
  handleWork,
  closeModal,
}: {
  type: keyof typeof modalTypes;
  handleWork: () => void;
  closeModal: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      dir="rtl"
      onClick={closeModal}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5">
          <div className="text-center flex-auto justify-center">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-12 h-12 flex items-center text-red-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                fillRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-lg sm:text-xl font-extrabold py-4 text-[#343A40] leading-tight">
              {modalTypes[type].title}
            </h2>
            <p className="text-sm sm:text-base font-medium text-[#343A40] px-2">
              {modalTypes[type].description}
            </p>
          </div>
        </div>
        <div className="px-5 pb-5 pt-2">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={closeModal}
              className="px-5 py-2 text-sm font-semibold rounded-full border border-gray-300 bg-gray-100 text-[#343A40] hover:bg-gray-200 transition cursor-pointer"
            >
              لغو
            </button>
            <button
              onClick={handleWork}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-700 hover:to-gray-900 shadow-lg transition cursor-pointer"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
