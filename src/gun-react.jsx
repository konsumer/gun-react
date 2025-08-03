// simple example context, that just provides gun-object to children

import Gun from 'gun'
import { createContext, useContext, useEffect, useState } from 'react'

export const context = createContext()
export const useGun = () => useContext(context)

const { Provider } = context

// props can contain any of these named options: https://gun.eco/docs/API#options
export function GunProvider({ children, ...options }) {
  const [gun, gunSet] = useState()
  useEffect(() => {
    gunSet(new Gun(options))
  }, [])
  return <Provider value={{ gun }}>{children}</Provider>
}
