import { createContext, ReactNode, useContext, useState } from 'react'

interface AuthContextType {
  auth: AuthData; // Update this to match your actual auth object type
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>; // Update this to match your actual auth object type
}

// Define the AuthData interface
interface AuthData {
  data?: any;
  accessToken?: string;
  roles?: string;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({}); // Update this to match your actual auth object type

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};