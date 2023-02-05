import { useRouter } from 'next/router'
import React, { createContext, useContext, useState } from 'react'

interface ISessionContext {
  debug: boolean
  analyticsId: string
  isLoggedIn: boolean
  user: User
  setAnalyticsId: Function
  setLoggedIn: Function
  setUser: Function
}

type User = {
  id: string
  display: string
}

const F = () => {}

const sessionContextDefaults: ISessionContext = {
  debug: false,
  analyticsId: '',
  isLoggedIn: false,
  user: {
    id: '',
    display: '',
  },
  setAnalyticsId: F,
  setLoggedIn: F,
  setUser: F,
}

const userDefault = {
  id: '',
  display: '',
}

const SessionContext = createContext<ISessionContext>(sessionContextDefaults)

export const useSessionContext = () => useContext(SessionContext)

interface ISessionProviderProps {
  children: React.ReactNode
}

const SessionProvider: React.FC<ISessionProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const [analyticsId, setAnalyticsId] = useState<string>('')
  const [user, setUser] = useState<User>(userDefault)

  const { query } = useRouter()
  const debug = query.debug?.toString() === 'true'

  return (
    <SessionContext.Provider
      value={{
        debug,
        isLoggedIn,
        setLoggedIn,
        analyticsId,
        setAnalyticsId,
        user,
        setUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
