// simple example that responds to messages

import { useGun } from './gun-react'
import { useEffect, useState } from 'react'

export default function ExampleShowMessages({ name }) {
  const { gun } = useGun()
  const [messages, messagesSet] = useState([])
  useEffect(() => {
    if (gun) {
      gun.get(name).on((data) => {
        messagesSet([...messages, data])
      })
    }
  }, [gun, name])

  return <pre>{JSON.stringify(messages, null, 2)}</pre>
}
