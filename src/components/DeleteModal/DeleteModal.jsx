const DeleteModal = ({ isOpen, message, onConfirm, onCancel, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-base">{message}</h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={onConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
