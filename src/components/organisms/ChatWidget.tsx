import { Button } from '@/components/ui/button.tsx'
import { useAuth } from '@/hooks/useAuth.ts'
import { useCustomerById } from '@/hooks/useCustomer.ts'
import { useStompClient } from '@/hooks/useStompClient.ts'
import { useUserIdByReference } from '@/hooks/useUserIdByReference.ts'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

const ChatWidget = () => {
  const { user, isLoggedIn } = useAuth()
  const customerId = user?.customerId ?? -1
  const senderUserId = user?.id ?? ''

  const { data: customerData, error: customerError } =
    useCustomerById(customerId)

  const agentId = customerData?.agentId ?? -1

  const { data: receiverUser, error: receiverError } = useUserIdByReference(
    undefined,
    agentId,
  )

  const { messages, sendMessage } = useStompClient(senderUserId)

  const [isOpen, setIsOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  if (customerError) {
    console.error('Error fetching customer data:', customerError)
    return null
  }

  if (receiverError) {
    console.error('Error fetching receiver user by reference:', receiverError)
    return null
  }

  const receiverId = receiverUser?.data.userId ?? ''

  if (!isLoggedIn) return null

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSend = () => {
    if (!newMessage.trim()) return
    sendMessage(receiverId, newMessage.trim())
    setNewMessage('')
  }

  return (
    <div className='fixed right-6 bottom-6 z-50 text-right'>
      {isOpen && (
        <div className='mb-2 flex h-96 w-80 flex-col justify-between rounded-lg bg-white p-4 shadow-lg'>
          <h4 className='mb-2 text-left font-semibold text-blue-600'>
            Chat with Agent
          </h4>
          <div className='flex-1 space-y-2 overflow-y-auto pr-1'>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  msg.senderId === senderUserId
                    ? 'ml-auto self-end bg-blue-100 text-right'
                    : 'self-start bg-gray-100 text-left'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className='flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm'
              placeholder='Type a message...'
            />
            <Button
              onClick={handleSend}
              className='rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400'
            >
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={handleToggle}
        className='cursor-pointer rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600'
        aria-label='Toggle chat'
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  )
}

export default ChatWidget
