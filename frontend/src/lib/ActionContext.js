// lib/LoadingContext.js
import React, { createContext, useState, useContext } from 'react';

const ActionContext = createContext();

export function useActionContext() {
  return useContext(ActionContext);
}
