"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/utils/use-translation"

interface TeamMember {
  id: string
  name: string
  avatar: string
  contributions: {
    type: string
    count: number
  }[]
}

export function CodeTeam() {
  const { t } = useTranslation()
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "/avatars/01.png",
      contributions: [
        { type: "commits", count: 150 },
        { type: "pull_requests", count: 25 },
        { type: "issues", count: 10 },
      ],
    },
    {
      id: "2",
      name: "Bob Smith",
      avatar: "/avatars/02.png",
      contributions: [
        { type: "commits", count: 120 },
        { type: "pull_requests", count: 15 },
        { type: "issues", count: 5 },
      ],
    },
    {
      id: "3",
      name: "Carol Williams",
      avatar: "/avatars/03.png",
      contributions: [
        { type: "commits", count: 200 },
        { type: "pull_requests", count: 30 },
        { type: "issues", count: 15 },
      ],
    },
  ])

  const maxContributions = Math.max(...members.flatMap((m) => m.contributions.map((c) => c.count)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("codeteam_members")}</CardTitle>
        <CardDescription>{t("codeteam_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {members.map((member) => (
          <div key={member.id} className="mb-6">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
              </div>
            </div>
            {member.contributions.map((contribution) => (
              <div key={contribution.type} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>{t(contribution.type)}</span>
                  <span>{contribution.count}</span>
                </div>
                <Progress value={(contribution.count / maxContributions) * 100} className="h-2" />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

