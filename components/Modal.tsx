const Modal = ({ close, showModal, message, confirm, id }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t ">
                  <h3 className="text-3xl font-semibold">Installation</h3>
                </div>
                {/*body*/}
                <div className="prose mx-8">{message}</div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-primary btn-ghost btn-sm mx-2"
                    type="button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary btn-sm mx-2"
                    type="button"
                    onClick={() => confirm(id)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
