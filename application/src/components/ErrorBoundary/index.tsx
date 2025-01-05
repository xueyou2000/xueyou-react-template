import React from 'react'
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router'
import { AlertDialog, Button, Text, Code, Flex, ScrollArea } from '@radix-ui/themes'
import './styles.scss'

export interface ErrorBoundaryProps {
  pageNotFound?: boolean
}

export function ErrorBoundary({ pageNotFound = false }: ErrorBoundaryProps) {
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
    if (pageNotFound) {
      return {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.'
      }
    }
    return {
      title: 'Error',
      description: 'An unexpected error occurred.'
    }
  }

  function onReset() {
    window.location.reload()
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
          <ScrollArea type="auto" scrollbars="vertical" className="error-boundary-details">
            <Code>{errorContent.details}</Code>
          </ScrollArea>
        )}

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button variant="soft" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <Button variant="solid" onClick={onReset}>
              重试
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
