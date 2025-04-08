import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hi! How can I help you today?' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleSend = () => {
    if (!newMessage.trim()) return

    const userMessage = { sender: 'user', text: newMessage.trim() }
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // 👇 Mock auto-response from agent after delay
    setTimeout(() => {
      const agentReplies = [
        "Thanks for your message!",
        "Let me check that for you.",
        "One moment please...",
        "Can you provide more details?",
      ]
      const randomReply = agentReplies[Math.floor(Math.random() * agentReplies.length)]
      setMessages(prev => [...prev, { sender: 'agent', text: randomReply }])
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 text-right">
      {isOpen && (
        <div className="bg-white w-80 rounded-lg shadow-lg p-4 mb-2 flex flex-col justify-between h-96">
          <h4 className="font-semibold text-blue-600 mb-2 text-left">Chat with Agent</h4>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 self-end ml-auto text-right'
                    : 'bg-gray-100 self-start text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={handleToggle}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer"
        aria-label="Toggle chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

export default ChatWidget
