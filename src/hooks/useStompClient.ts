// hooks/useStompClient.ts
import { Client } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'

type ChatMessage = {
  senderId: string
  content: string
}

export const useStompClient = (customerId?: string) => {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const clientRef = useRef<Client>(null)

  useEffect(() => {
    if (!customerId) return
    const client = new Client({
      brokerURL: 'ws://localhost:8080/chat',
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true)

        client.subscribe(`/user/${customerId}/queue/messages`, (message) => {
          const msg = JSON.parse(message.body)
          setMessages((prev) => [...prev, msg])
        })
      },
      onStompError: (frame) => {
        console.error(' STOMP Error:', frame.headers['message'])
      },
      onWebSocketError: (error) => {
        console.error(' WebSocket Error:', error)
      },
    })

    client.activate()
    clientRef.current = client

    return () => {
      client.deactivate()
    }
  }, [customerId])

  const sendMessage = (receiverId: string, content: string) => {
    if (!customerId) return
    const stompClient = clientRef.current
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ senderId: customerId, receiverId, content }),
      })
      setMessages((prev) => [...prev, { senderId: customerId, content }])
    }
  }

  return { connected, messages, sendMessage }
}
