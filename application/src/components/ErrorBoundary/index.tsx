import React from 'react'
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router'
import { AlertDialog, Button, Text, Code, Flex } from '@radix-ui/themes'
import './styles.scss'

export function ErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  const getErrorContent = () => {
    if (isRouteErrorResponse(error)) {
      return {
        title: 'Oops!',
        description: 'Sorry, an unexpected error has occurred.',
        details: error.statusText,
        status: error.status
      }
    } else if (error instanceof Error) {
      return {
        title: 'Error',
        description: error.message,
        details: error.stack
      }
    }
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.'
    }
  }

  const errorContent = getErrorContent()

  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Content className="error-boundary-content">
        <AlertDialog.Title>
          {errorContent.title}
          {errorContent.status && (
            <Text color="red" className="error-status">
              ({errorContent.status})
            </Text>
          )}
        </AlertDialog.Title>

        <AlertDialog.Description>{errorContent.description}</AlertDialog.Description>

        {errorContent.details && (
          <div className="error-boundary-details">
            <Code>{errorContent.details}</Code>
          </div>
        )}

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button variant="solid" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </AlertDialog.Action>
        </Flex>

        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button onClick={() => navigate('/')} variant="solid">
            返回首页
          </Button>
        </div> */}
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
