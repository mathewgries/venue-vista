// lib/LoadingContext.js
import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export function useLoadingContext() {
  return useContext(LoadingContext);
}

export function LoadingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
