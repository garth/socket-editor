import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDocumentState } from '../hooks/useDocumentState'
import { Header } from '../components/Header'
import { Editor } from '../components/Editor'

export default function Document() {
  const { documentName } = useParams()
  const [state, provider] = useDocumentState(documentName ?? 'unknown')

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
