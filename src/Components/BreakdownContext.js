// use this
import React, { createContext, useContext, useState } from 'react';

export const BreakdownContext = createContext();

export const BreakdownProvider = ({ children }) => {
  const [organizationValue, setOrganizationValue] = useState('');

  const setOrganization = (value) => {
    setOrganizationValue(value);
  };

  return (
    <BreakdownContext.Provider value={{ organizationValue, setOrganization }}>
      {children}
    </BreakdownContext.Provider>
  );
};

export const useBreakdownContext = () => {
  return useContext(BreakdownContext);
};
