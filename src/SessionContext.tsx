import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

interface ISessionContext {
  debug: boolean
  analyticsId: string
  isLoggedIn: boolean
  user: IUser
  setAnalyticsId: Function
  setLoggedIn: Function
  setUser: Function
}

interface IUser {
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
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [analyticsId, setAnalyticsId] = useState('')
  const [user, setUser] = useState(userDefault)

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
