
import React, { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    addressType: "",
    accountType: "",
    accountHolder: "",
    bankName: "",
    accNumber: "",
    reEntered: "",
    ifsc: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "useFormContext must be used inside FormProvider"
    );
  }

  return context;
};
