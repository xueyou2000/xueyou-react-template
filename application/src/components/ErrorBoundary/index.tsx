import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router'

export function ErrorBoundary() {
  const error = useRouteError()
  // console.error(error)

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        {error.statusText && <p>{error.statusText}</p>}
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
  return (
    <div id="not-found-page">
      <h1>Oops! Page not found</h1>
    </div>
  )
}
