import ExampleShowMessages from './ExampleShowMessages'
import ExampleSendMessage from './ExampleSendMessage'

export default function App() {
  return (
    <div className='p-2 flex flex-col gap-2'>
      <ExampleSendMessage name='example' />
      <ExampleShowMessages name='example' />
    </div>
  )
}
