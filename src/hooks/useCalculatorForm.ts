import { useState, ChangeEvent, FormEvent } from 'react';

interface FormErrors {
  [key: string]: string;
}

export default function useCalculatorForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Convert to number if the input type is number
    const parsedValue = type === 'number' ? 
      (value === '' ? '' : Number(value)) : 
      value;
    
    setValues({
      ...values,
      [name]: parsedValue,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Reset calculation state when form is changed
    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleRadioChange = (name: string, value: string | number) => {
    setValues({
      ...values,
      [name]: value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Reset calculation state when form is changed
    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleSliderChange = (name: string, value: number) => {
    setValues({
      ...values,
      [name]: value,
    });
    
    // Reset calculation state when form is changed
    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    validateForm?: (values: T) => FormErrors
  ) => {
    e.preventDefault();
    
    // Validate form if validation function is provided
    if (validateForm) {
      const validationErrors = validateForm(values);
      setErrors(validationErrors);
      
      // If there are errors, don't proceed
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    // Mark as calculated
    setIsCalculated(true);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsCalculated(false);
  };

  return {
    values,
    errors,
    isCalculated,
    handleChange,
    handleRadioChange,
    handleSliderChange,
    handleSubmit,
    resetForm,
    setValues,
  };
}
