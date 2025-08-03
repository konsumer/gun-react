// simple example that creates a button & modal to send a message

import { useGun } from './gun-react'
import { useRef, useCallback } from 'react'

export default function ExampleSendMessage({ name }) {
  const { gun } = useGun()
  const r = useRef()
  const f = useRef()

  const onSend = useCallback(
    (e) => {
      e.preventDefault()
      // for an unmanaged form, I just pull all values
      const values = Object.fromEntries(new FormData(f.current))
      if (values.message) {
        gun.get(name).put(values)
        r.current.close()
      }
    },
    [name]
  )

  // for an unmanaged form, I don't allow it to submit (via ENTER or whatever)
  const noSubmit = useCallback((e) => e.preventDefault())

  return (
    <>
      <button className='btn' onClick={() => r.current.showModal()}>
        Send "{name}"
      </button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Send "{name}" Message</h3>
          <p className='py-4'>Press ESC key or click the button below to close. This is just an example, but you can make your form look like whatever you want.</p>
          {/* this is an unmanaged form, but you could also useState and manage everything, if you want */}
          <form ref={f} onSubmit={noSubmit}>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>What is your message?</legend>
              <input type='text' className='input' placeholder='Type here' required name='message' />
            </fieldset>
          </form>
          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              <button className='btn'>Close</button>
              <button className='btn btn-primary' onClick={onSend}>
                Send
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
