import { test } from 'socket:test'
import os from 'socket:os'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
test('test', (t: any) => {
  const label1 = document.querySelector('h1')?.textContent
  t.equal(label1, `Hello, ${os.platform()}`, 'label on start is correct')
})
