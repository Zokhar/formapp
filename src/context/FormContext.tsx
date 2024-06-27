import React, { createContext, useState, useContext, ReactNode, FC } from 'react';

interface FormContextProps {
  isBasicFilled: boolean;
  setIsBasicFilled: (value: boolean) => void;
  isEducationFilled: boolean;
  setIsEducationFilled: (value: boolean) => void;
  isFamilyFilled: boolean;
  setIsFamilyFilled: (value: boolean) => void;
  isWorkFilled: boolean;
  setIsWorkFilled: (value: boolean) => void;
  isAboutFilled: boolean;
  setIsAboutFilled: (value: boolean) => void;
}

const FormContext = createContext<FormContextProps | null>(null);


interface FormProviderProps {
    children: ReactNode;
  }

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [isBasicFilled, setIsBasicFilled] = useState(false);
  const [isEducationFilled, setIsEducationFilled] = useState(false);
  const [isFamilyFilled, setIsFamilyFilled] = useState(false);
  const [isWorkFilled, setIsWorkFilled] = useState(false);
  const [isAboutFilled, setIsAboutFilled] = useState(false);

  return (
    <FormContext.Provider value={{
      isBasicFilled,
      setIsBasicFilled,
      isEducationFilled,
      setIsEducationFilled,
      isFamilyFilled,
      setIsFamilyFilled,
      isWorkFilled,
      setIsWorkFilled,
      isAboutFilled,
      setIsAboutFilled
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
  };