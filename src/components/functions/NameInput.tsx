'use client'

import { useContext, useState } from 'react'

import BotMessage from '@/components//functions/BotMessage'
import Input from '@/components/Input'

import { ConversationContext } from '@chatbotkit/react'

export default function NameInput({ message }: { message: string }) {
  const [value, setValue] = useState('')
  const { request } = useContext(ConversationContext)

  return (
    <>
      <BotMessage message={message} />
      <Input
        message={message}
        type="text"
        placeholder="e.g. Jane Doe"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            request('captureName', {
              name: value,
            })
          }
        }}
      />
    </>
  )
}
