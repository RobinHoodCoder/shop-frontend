import React from 'react';

import { ToastContainer } from 'react-toastify';

function Toaster(message) {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      >
        {message}
      </ToastContainer>
    </div>
  );
}

export default Toaster;
