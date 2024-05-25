import { createContext, ReactNode, useContext, useState } from 'react';

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
} | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
};

export const useLoadingContext = () => {
  const isLoading = useContext(LoadingContext);
  if (!isLoading) {
    throw new Error(
      'useLoadingContext must be used within LoadingProvider'
    );
  }

  return isLoading;
}

export default LoadingProvider;
