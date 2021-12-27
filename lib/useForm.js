import { useEffect, useState } from 'react';

export const useForm = (initial = {}) => {
  const [formValues, setInputs] = useState(initial);
  const handleChange = (e) => {
    const { value, name, type, files } = e.target;

    let outVal = '';

    switch (type) {
    case 'number' :
      outVal = !!value ? parseInt(value, 10) : 0;
      break;
    case 'file' :
      // console.log(value);
      [outVal] = files;
      break;
    default:
      outVal = value;
    }

    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: outVal,
      };
    });
  };
  const resetForm = (e) => {
    e.preventDefault();
    setInputs(initial);
  };
  const clearForm = (e) => {
    e.preventDefault();
    const blankArr = Object.entries(initial).map(([key, _]) => {
      return [key, ''];
    });
    const blankObj = Object.fromEntries(blankArr);
    setInputs(blankObj);
  };

  useEffect(() => {

  }, []);

  return { formValues, handleChange, resetForm, clearForm };
};
