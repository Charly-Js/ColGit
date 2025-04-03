"use client"

import type React from "react"
import { useState } from "react"
import { X, Minimize2, Maximize2, Send } from "lucide-react"

interface Conversation {
  id: string
  name: string
  lastMessage: string
  unreadCount: number
}

interface ChatWindow {
  id: string
  name: string
  minimized: boolean
}

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", name: "Alice Johnson", lastMessage: "Hey, how are you?", unreadCount: 2 },
    { id: "2", name: "Bob Smith", lastMessage: "Did you see the latest commit?", unreadCount: 0 },
    { id: "3", name: "Carol Williams", lastMessage: "Meeting at 3pm", unreadCount: 1 },
  ])

  const [openChats, setOpenChats] = useState<ChatWindow[]>([])
  const [message, setMessage] = useState("")

  const openChat = (conversation: Conversation) => {
    if (openChats.length < 3 && !openChats.some((chat) => chat.id === conversation.id)) {
      setOpenChats([...openChats, { id: conversation.id, name: conversation.name, minimized: false }])
    }
  }

  const closeChat = (id: string) => {
    setOpenChats(openChats.filter((chat) => chat.id !== id))
  }

  const toggleMinimize = (id: string) => {
    setOpenChats(openChats.map((chat) => (chat.id === id ? { ...chat, minimized: !chat.minimized } : chat)))
  }

  const sendMessage = (chatId: string) => {
    console.log(`Sending message to chat ${chatId}: ${message}`)
    setMessage("")
  }

  return (
    <div className="fixed bottom-0 right-0 flex h-[calc(100vh-4rem)] w-full max-w-sm flex-col border-l bg-background">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold">Chats</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="mb-2 flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-accent"
            onClick={() => openChat(conv)}
          >
            <div>
              <div className="font-medium">{conv.name}</div>
              <div className="text-sm text-muted-foreground">{conv.lastMessage}</div>
            </div>
            {conv.unreadCount > 0 && (
              <div className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                {conv.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 right-0 flex space-x-2 p-2">
        {openChats.map((chat) => (
          <div key={chat.id} className="w-64 rounded-t-lg bg-background shadow-md">
            <div className="flex items-center justify-between border-b p-2">
              <div className="font-medium">{chat.name}</div>
              <div className="flex space-x-1">
                <button onClick={() => toggleMinimize(chat.id)}>
                  {chat.minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => closeChat(chat.id)}>
                  <X size={16} />
                </button>
              </div>
            </div>
            {!chat.minimized && (
              <>
                <div className="h-48 overflow-auto p-2">{/* Chat messages would go here */}</div>
                <div className="flex border-t p-2">
                  <input
                    type="text"
                    className="flex-1 rounded-l-md border-0 bg-accent"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="rounded-r-md bg-primary p-2 text-primary-foreground"
                    onClick={() => sendMessage(chat.id)}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatInterface

