import { Roles } from '@/lib/types';
import { createContext, ReactNode, useState } from 'react'

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  roles: Roles | null;
  setAuthenticated: (newState: boolean) => void
  setRole: (newRole : Roles) => void
}

const initialValue = {
  authenticated: false,
  roles: null,
  setAuthenticated: () => {},
  setRole: () => {},
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)
  const [roles, setRoles] = useState<Roles | null>(initialValue.roles); 
  return (
    <AuthContext.Provider value={{ authenticated, roles, setAuthenticated, setRole: setRoles }}>
      {children}
    </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }