"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Maximize2, Send, Image, Smile, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/utils/use-translation"
import { useAuth } from "@/utils/auth-context"

interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  type: "text" | "image"
  imageUrl?: string
}

interface ChatWindow {
  contact: Contact
  minimized: boolean
  messages: Message[]
  unreadCount: number
}

export function FacebookStyleChat() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    {
      id: "2",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: "2 hours ago",
    },
    { id: "3", name: "Carol Williams", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    { id: "4", name: "David Brown", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    {
      id: "5",
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: "1 day ago",
    },
  ])

  const [openChats, setOpenChats] = useState<ChatWindow[]>([])
  const [chatListOpen, setChatListOpen] = useState(false)
  const [newMessage, setNewMessage] = useState<{ [key: string]: string }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [openChats])

  const toggleChatList = () => {
    setChatListOpen(!chatListOpen)
  }

  const openChat = (contact: Contact) => {
    if (!openChats.some((chat) => chat.contact.id === contact.id)) {
      const newOpenChats = [...openChats]
      if (newOpenChats.length >= 3) {
        newOpenChats.shift()
      }

      const mockMessages: Message[] = [
        {
          id: `${contact.id}-1`,
          senderId: contact.id,
          receiverId: user?.username || "currentUser",
          content: `Hi there! This is ${contact.name}.`,
          timestamp: new Date(Date.now() - 3600000),
          read: true,
          type: "text",
        },
        {
          id: `${contact.id}-2`,
          senderId: user?.username || "currentUser",
          receiverId: contact.id,
          content: "Hello! How are you doing?",
          timestamp: new Date(Date.now() - 3000000),
          read: true,
          type: "text",
        },
        {
          id: `${contact.id}-3`,
          senderId: contact.id,
          receiverId: user?.username || "currentUser",
          content: "I'm doing great! Just working on some code.",
          timestamp: new Date(Date.now() - 2400000),
          read: true,
          type: "text",
        },
      ]

      newOpenChats.push({
        contact,
        minimized: false,
        messages: mockMessages,
        unreadCount: 0,
      })

      setOpenChats(newOpenChats)
      setNewMessage({ ...newMessage, [contact.id]: "" })
    } else {
      setOpenChats(openChats.map((chat) => (chat.contact.id === contact.id ? { ...chat, minimized: false } : chat)))
    }

    setChatListOpen(false)
  }

  const closeChat = (contactId: string) => {
    setOpenChats(openChats.filter((chat) => chat.contact.id !== contactId))
  }

  const toggleMinimize = (contactId: string) => {
    setOpenChats(
      openChats.map((chat) => (chat.contact.id === contactId ? { ...chat, minimized: !chat.minimized } : chat)),
    )
  }

  const handleMessageChange = (contactId: string, message: string) => {
    setNewMessage({ ...newMessage, [contactId]: message })
  }

  const sendMessage = (contactId: string) => {
    if (!newMessage[contactId]?.trim()) return

    const updatedChats = openChats.map((chat) => {
      if (chat.contact.id === contactId) {
        const newMsg: Message = {
          id: `msg-${Date.now()}`,
          senderId: user?.username || "currentUser",
          receiverId: contactId,
          content: newMessage[contactId],
          timestamp: new Date(),
          read: false,
          type: "text",
        }

        return {
          ...chat,
          messages: [...chat.messages, newMsg],
        }
      }
      return chat
    })

    setOpenChats(updatedChats)
    setNewMessage({ ...newMessage, [contactId]: "" })
  }

  const handleKeyPress = (e: React.KeyboardEvent, contactId: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(contactId)
    }
  }

  const handleImageUpload = (contactId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      alert(t("only_jpg_png_allowed"))
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert(t("file_too_large"))
      return
    }

    const imageUrl = URL.createObjectURL(file)

    const updatedChats = openChats.map((chat) => {
      if (chat.contact.id === contactId) {
        const newMsg: Message = {
          id: `msg-${Date.now()}`,
          senderId: user?.username || "currentUser",
          receiverId: contactId,
          content: "Sent an image",
          timestamp: new Date(),
          read: false,
          type: "image",
          imageUrl,
        }

        return {
          ...chat,
          messages: [...chat.messages, newMsg],
        }
      }
      return chat
    })

    setOpenChats(updatedChats)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleChatList}
          className="rounded-full h-12 w-12 p-0 bg-primary text-primary-foreground shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </Button>
      </div>

      {chatListOpen && (
        <div className="fixed bottom-20 right-4 w-64 bg-background rounded-lg shadow-lg border z-50 overflow-hidden">
          <div className="p-3 border-b">
            <h3 className="font-semibold">{t("contacts")}</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-3 hover:bg-muted cursor-pointer"
                onClick={() => openChat(contact)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      contact.status === "online"
                        ? "bg-green-500"
                        : contact.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  ></span>
                </div>
                <div className="ml-3">
                  <div className="font-medium text-sm">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {contact.status === "online"
                      ? t("online")
                      : contact.status === "away"
                        ? t("away")
                        : contact.lastSeen
                          ? `${t("last_seen")} ${contact.lastSeen}`
                          : t("offline")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-4 flex space-x-2 z-40">
        {openChats.map((chat) => (
          <div
            key={chat.contact.id}
            className={`w-72 bg-background rounded-t-lg shadow-lg border overflow-hidden transition-all duration-300 ${
              chat.minimized ? "h-12" : ""
            }`}
          >
            <div
              className={`flex items-center justify-between p-2 border-b cursor-pointer ${
                chat.unreadCount > 0 && chat.minimized ? "bg-primary/20 animate-pulse" : ""
              }`}
              onClick={() => toggleMinimize(chat.contact.id)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={chat.contact.avatar} alt={chat.contact.name} />
                    <AvatarFallback>{chat.contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background ${
                      chat.contact.status === "online"
                        ? "bg-green-500"
                        : chat.contact.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  ></span>
                </div>
                <div className="ml-2 font-medium text-sm">{chat.contact.name}</div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMinimize(chat.contact.id)
                  }}
                >
                  {chat.minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeChat(chat.contact.id)
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${chat.minimized ? "h-0" : "h-auto"}`}>
              <div className="h-64 overflow-y-auto p-3 bg-muted/30">
                {chat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 flex ${message.senderId === (user?.username || "currentUser") ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-2 ${
                        message.senderId === (user?.username || "currentUser")
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.type === "text" ? (
                        <p className="text-sm break-words">{message.content}</p>
                      ) : (
                        <img
                          src={message.imageUrl || "/placeholder.svg"}
                          alt="Shared image"
                          className="max-w-full rounded"
                          style={{ maxHeight: "150px" }}
                        />
                      )}
                      <span className="text-xs opacity-70 block text-right mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-2 border-t">
                <div className="flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <label className="cursor-pointer p-1 rounded-full hover:bg-muted">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(chat.contact.id, e)}
                      />
                      <Image size={18} />
                    </label>
                    <button className="p-1 rounded-full hover:bg-muted">
                      <Paperclip size={18} />
                    </button>
                    <button className="p-1 rounded-full hover:bg-muted">
                      <Smile size={18} />
                    </button>
                  </div>
                  <Input
                    value={newMessage[chat.contact.id] || ""}
                    onChange={(e) => handleMessageChange(chat.contact.id, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, chat.contact.id)}
                    placeholder={t("type_a_message")}
                    className="h-9 text-sm"
                  />
                  <Button size="icon" className="ml-2 h-8 w-8" onClick={() => sendMessage(chat.contact.id)}>
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

