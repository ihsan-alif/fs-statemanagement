import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) =>{
  const [notification, setNotification] = useState('')

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
        {children}
    </NotificationContext.Provider>
  )
}