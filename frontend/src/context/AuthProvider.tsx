import { createContext, ReactNode, SetStateAction, Dispatch, useState, useEffect } from 'react'

export type Auth ={
  accessToken: string,
  accessLevel: string,
  refreshToken: string,
  id: string,
}
export interface AuthContextInterface{
  auth: Auth,
  setAuth: Dispatch<SetStateAction<Auth>>
}

const defaultState = {
  auth: {
    accessToken: '',
    accessLevel: '',
    refreshToken: '',
    id: '',
  },
  setAuth: (auth: Auth) => {}
} as AuthContextInterface

export const AuthContext = createContext(defaultState)

type AuthProvideProps ={
  children: ReactNode
}

export default function AuthProvider( {children} : AuthProvideProps){

  const [auth, setAuth] = useState<Auth>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : defaultState.auth;
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}