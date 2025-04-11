import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hi! How can I help you today?' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSend = () => {
    if (!newMessage.trim()) return

    const userMessage = { sender: 'user', text: newMessage.trim() }
    setMessages((prev) => [...prev, userMessage])
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
                  msg.sender === 'user'
                    ? 'ml-auto self-end bg-blue-100 text-right'
                    : 'self-start bg-gray-100 text-left'
                }`}
              >
                {msg.text}
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
            <button
              onClick={handleSend}
              className='rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={handleToggle}
        className='cursor-pointer rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600'
        aria-label='Toggle chat'
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

export default ChatWidget
