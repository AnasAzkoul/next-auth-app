import { useState } from 'react';

type TouchedTypes = {
  username?: boolean
  email?: boolean;
  password?: boolean;
  cPassword?: boolean
};

type ErrorTypes = {
  username?: 'Required'
  email?: 'Required';
  password?: 'Required';
  cPassword?: 'Required';
};

export default function useValidateForm() {
  const [touched, setTouched] = useState<TouchedTypes>();
  const [error, setError] = useState<ErrorTypes>();

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === '') {
      setError((prev) => {
        return {
          ...prev,
          [e.target.name]: 'Required',
        };
      });
    } else {
      setError({})
    }

    setTouched((prev) => {
      return { ...prev, [e.target.name]: true };
    });
  };
  
  return {
    touched, 
    error, 
    onBlur
  }
}
