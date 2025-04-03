"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "@/utils/use-translation"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Smile, Image, X } from "lucide-react"

interface Contact {
  id: string
  name: string
  avatar: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "emoji" | "gif" | "sticker"
}

const GIPHY_API_KEY = "your_giphy_api_key_here" // Replace with your actual Giphy API key

export function ChatInterface({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [gifs, setGifs] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulated API call to get contacts
    setContacts([
      { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "3", name: "Carol Williams", avatar: "/placeholder.svg?height=40&width=40" },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    // In a real app, you'd fetch messages for this contact here
    setMessages([])
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "currentUser",
        content: inputMessage,
        timestamp: new Date(),
        type: "text",
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    if (selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "currentUser",
        content: emoji.native,
        timestamp: new Date(),
        type: "emoji",
      }
      setMessages([...messages, newMessage])
    }
  }

  const handleGifSelect = (gif: string) => {
    if (selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "currentUser",
        content: gif,
        timestamp: new Date(),
        type: "gif",
      }
      setMessages([...messages, newMessage])
    }
  }

  const handleStickerSelect = (sticker: string) => {
    if (selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "currentUser",
        content: sticker,
        timestamp: new Date(),
        type: "sticker",
      }
      setMessages([...messages, newMessage])
    }
  }

  const searchGifs = async (query: string) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=10`)
    const data = await response.json()
    setGifs(data.data.map((gif: any) => gif.images.fixed_height.url))
  }

  return (
    <Card className="fixed bottom-0 right-4 w-80 h-[500px] flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="font-semibold">{t("chat")}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="flex-grow flex flex-col p-0">
        <div className="w-full border-r">
          <ScrollArea className="h-[200px]">
            {contacts.map((contact) => (
              <Button
                key={contact.id}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => handleContactSelect(contact)}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{contact.name}</span>
              </Button>
            ))}
          </ScrollArea>
        </div>
        {selectedContact ? (
          <>
            <div className="flex items-center p-2 border-t border-b">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{selectedContact.name}</span>
            </div>
            <ScrollArea className="flex-grow">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 p-2 ${message.senderId === "currentUser" ? "text-right" : "text-left"}`}
                >
                  {message.type === "text" && <p>{message.content}</p>}
                  {message.type === "emoji" && <p className="text-4xl">{message.content}</p>}
                  {message.type === "gif" && (
                    <img src={message.content || "/placeholder.svg"} alt="GIF" className="max-w-[200px] inline-block" />
                  )}
                  {message.type === "sticker" && (
                    <img
                      src={message.content || "/placeholder.svg"}
                      alt="Sticker"
                      className="max-w-[100px] inline-block"
                    />
                  )}
                  <small className="block text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</small>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div className="p-2 border-t">
              <div className="flex items-center">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t("type_a_message")}
                  className="flex-grow mr-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="ml-2">
                      <Image className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Tabs defaultValue="gif" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="gif">GIF</TabsTrigger>
                        <TabsTrigger value="sticker">Sticker</TabsTrigger>
                      </TabsList>
                      <TabsContent value="gif">
                        <Input
                          placeholder={t("search_gifs")}
                          onChange={(e) => searchGifs(e.target.value)}
                          className="mb-2"
                        />
                        <ScrollArea className="h-[200px]">
                          <div className="grid grid-cols-2 gap-2">
                            {gifs.map((gif, index) => (
                              <img
                                key={index}
                                src={gif || "/placeholder.svg"}
                                alt="GIF"
                                className="w-full cursor-pointer"
                                onClick={() => handleGifSelect(gif)}
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="sticker">
                        <ScrollArea className="h-[200px]">
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, index) => (
                              <img
                                key={index}
                                src={`/placeholder.svg?height=80&width=80&text=Sticker${index + 1}`}
                                alt={`Sticker ${index + 1}`}
                                className="w-full cursor-pointer"
                                onClick={() =>
                                  handleStickerSelect(`/placeholder.svg?height=80&width=80&text=Sticker${index + 1}`)
                                }
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </PopoverContent>
                </Popover>
                <Button onClick={handleSendMessage} className="ml-2">
                  {t("send")}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>{t("select_a_contact_to_start_chatting")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

