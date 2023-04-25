import { createContext, useContext } from 'react';

export const ModalStateContext = createContext<boolean | null>(null);
export const ModalHandleContext = createContext<(() => void) | null>(null);

export const useModalStateContext = () => {
  const context = useContext(ModalStateContext);

  if (context === null)
    throw new Error('<ModalStateContext.Provider>가 제공되지 않았습니다.');

  return context;
};

export const useModalHandleContext = () => {
  const context = useContext(ModalHandleContext);

  if (!context)
    throw new Error('<ModalHandleContext.Provider>가 제공되지 않았습니다.');

  return context;
};
