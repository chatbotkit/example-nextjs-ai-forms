'use client'

import { useContext, useState } from 'react'

import BotMessage from '@/components//functions/BotMessage'
import Input from '@/components/Input'

import { ConversationContext } from '@chatbotkit/react'

export default function EmailInput({ message }: { message?: string }) {
  const [value, setValue] = useState('')
  const { request } = useContext(ConversationContext)

  return (
    <>
      <BotMessage message={message} />
      <Input
        message={message}
        type="email"
        placeholder="name@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            request('captureEmail', {
              email: value,
            })
          }
        }}
      />
    </>
  )
}
