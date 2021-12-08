import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

function Toaster(message) {
  return (
    <div>
      <ToastContainer>
        {message}
      </ToastContainer>
    </div>
  );
}

export default Toaster;
