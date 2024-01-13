import { type FunctionComponent } from 'react'
import { Link, useRouteError } from 'react-router-dom'

export const ErrorPage: FunctionComponent = () => {
  const error = useRouteError() as { statusText: string; message: string }
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Back Home</Link>
    </div>
  )
}
