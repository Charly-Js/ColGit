"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "@/utils/use-translation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Reply, Tag, MessageSquare } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  replyTo?: string
  tags?: string[]
  label?: string
}

interface CommunityChatProps {
  communityId: string
}

export function CommunityChat({ communityId }: CommunityChatProps) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [tagging, setTagging] = useState<string[]>([])
  const [label, setLabel] = useState<string>("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los mensajes
    // Por ahora, usaremos datos de ejemplo
    setMessages([
      { id: "1", sender: "Alice", content: "Hello everyone!", timestamp: "2023-05-10T10:00:00Z" },
      { id: "2", sender: "Bob", content: "Hi Alice, welcome to the community!", timestamp: "2023-05-10T10:05:00Z" },
      {
        id: "3",
        sender: "Carol",
        content: "Hey folks, any React experts here?",
        timestamp: "2023-05-10T10:10:00Z",
        label: "Question",
      },
    ])
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You", // En una implementación real, esto vendría del usuario autenticado
        content: newMessage,
        timestamp: new Date().toISOString(),
        replyTo: replyingTo,
        tags: tagging,
        label: label,
      }
      setMessages([...messages, message])
      setNewMessage("")
      setReplyingTo(null)
      setTagging([])
      setLabel("")
    }
  }

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId)
  }

  const handleTag = (username: string) => {
    if (!tagging.includes(username)) {
      setTagging([...tagging, username])
    }
  }

  const removeTag = (username: string) => {
    setTagging(tagging.filter((tag) => tag !== username))
  }

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className="mb-4 p-2 rounded-lg bg-secondary">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender} />
                <AvatarFallback>{message.sender.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{message.sender}</p>
                <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
              {message.label && (
                <Badge variant="secondary" className="ml-2">
                  {message.label}
                </Badge>
              )}
            </div>
            {message.replyTo && (
              <div className="ml-8 mb-2 p-2 rounded bg-muted text-sm">
                <p className="font-semibold">{t("replying_to", { id: message.replyTo })}</p>
              </div>
            )}
            <p className="ml-8">{message.content}</p>
            {message.tags && message.tags.length > 0 && (
              <div className="ml-8 mt-2">
                {message.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="mr-1">
                    @{tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="ml-8 mt-2 flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleReply(message.id)}>
                <Reply className="w-4 h-4 mr-1" />
                {t("reply")}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Tag className="w-4 h-4 mr-1" />
                    {t("tag")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    {["Alice", "Bob", "Carol"].map((user) => (
                      <Button
                        key={user}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTag(user)}
                        className="w-full justify-start"
                      >
                        @{user}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="space-y-2">
        {replyingTo && (
          <div className="flex items-center bg-muted p-2 rounded">
            <p className="text-sm">{t("replying_to", { id: replyingTo })}</p>
            <Button type="button" variant="ghost" size="sm" onClick={() => setReplyingTo(null)} className="ml-auto">
              {t("cancel")}
            </Button>
          </div>
        )}
        {tagging.length > 0 && (
          <div className="flex flex-wrap gap-1 bg-muted p-2 rounded">
            {tagging.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center">
                @{tag}
                <Button type="button" variant="ghost" size="sm" onClick={() => removeTag(tag)} className="ml-1 p-0">
                  &times;
                </Button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("type_your_message")}
            className="flex-grow"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline">
                <MessageSquare className="w-4 h-4 mr-1" />
                {t("label")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <Label>{t("select_label")}</Label>
                {["Question", "Announcement", "Idea", "Bug"].map((l) => (
                  <Button
                    key={l}
                    variant="ghost"
                    size="sm"
                    onClick={() => setLabel(l)}
                    className="w-full justify-start"
                  >
                    {l}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit">{t("send")}</Button>
        </div>
      </form>
    </div>
  )
}

