import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDocumentState } from '../hooks/useDocumentState'
import { Header } from '../components/Header'
import { Editor } from '../components/Editor'
import { type SocketProvider } from '@socket-editor/lib/socketProvider.js'

export default function Document() {
  const { documentName } = useParams()
  const [provider, setProvider] = useState<SocketProvider | null>(null)
  const { state, socketProviderPromise } = useDocumentState(documentName ?? 'unknown')

  useEffect(() => {
    void socketProviderPromise.then(setProvider)
  }, [socketProviderPromise])

  const presence = useMemo(
    () => ({
      name: window.localStorage.getItem('name') ?? 'Anonymous',
      color: '#ffcc00',
    }),
    [],
  )

  return (
    <>
      <Header>{documentName ?? 'unknown'}</Header>
      {provider && state && <Editor provider={provider} value={state.content} presence={presence} />}
    </>
  )
}
