// simple example that creates a button & modal to send a message

import { useGun } from './gun-react'
import { useRef, useCallback, useState } from 'react'

export default function ExampleSendMessage({ name }) {
  const { gun } = useGun()
  const r = useRef()
  const f = useRef()
  const [error, errorSet] = useState('')

  const onSend = useCallback(async (e) => {
    e.preventDefault()
    // for an unmanaged form, I just pull all values
    const values = Object.fromEntries(new FormData(f.current))
    if (values.message) {
      try {
        await gun.get(name).put(values)
        r.current.close()
      } catch (e) {
        errorSet(e.message)
      }
    }
  })

  const onModal = useCallback(() => {
    errorSet('')
    r.current.showModal()
  })

  return (
    <>
      <button className='btn' onClick={onModal}>
        Send "{name}"
      </button>
      <dialog ref={r} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Send "{name}" Message</h3>
          {!!error && (
            <div role='alert' className='alert alert-error alert-soft mt-4'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 shrink-0 stroke-current' fill='none' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span>Error! {error}</span>
            </div>
          )}
          <p className='py-4'>Press ESC key or click the button below to close. This is just an example, but you can make your form look like whatever you want.</p>
          {/* this is an unmanaged form, but you could also useState and manage everything, if you want */}
          <form ref={f} onSubmit={onSend}>
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
