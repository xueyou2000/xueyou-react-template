import { Progress, Flex, Text } from '@radix-ui/themes'
import * as React from 'react'

// 导入 Spinner 组件
import { Spinner } from '@radix-ui/themes'

interface LoadingFallbackProps {
  text?: string
}

export const LoadingFallback = ({ text = '加载中...' }: LoadingFallbackProps) => (
  <Flex
    direction="column"
    gap="3"
    justify="center"
    align="center"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      padding: '20px',
      backgroundColor: 'var(--color-background)',
      borderRadius: 'var(--radius-3)',
      boxShadow: 'var(--shadow-3)'
    }}
  >
    <Flex align="center" gap="2">
      <Spinner size="3" />
      <Text size="3" align="center">
        {text}
      </Text>
    </Flex>
    <Progress size="2" style={{ width: '100%' }} />
  </Flex>
)
