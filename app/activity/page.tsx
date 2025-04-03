"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/utils/use-translation"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ActivityPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for repository activity
  const repositoryData = [
    { name: "Project A", commits: 24, pullRequests: 5, timeSpent: 15 },
    { name: "Project B", commits: 18, pullRequests: 3, timeSpent: 10 },
    { name: "Project C", commits: 12, pullRequests: 2, timeSpent: 8 },
    { name: "Project D", commits: 6, pullRequests: 1, timeSpent: 5 },
  ]

  // Mock data for time distribution
  const timeData = [
    { name: "Coding", value: 45 },
    { name: "Code Review", value: 20 },
    { name: "Documentation", value: 15 },
    { name: "Meetings", value: 10 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{t("my_activity")}</h1>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="repositories">{t("repository_items")}</TabsTrigger>
            <TabsTrigger value="time">{t("time_spent")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>{t("activity_overview")}</CardTitle>
                <CardDescription>{t("your_activity_over_time")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityHeatmap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repositories">
            <Card>
              <CardHeader>
                <CardTitle>{t("repository_activity")}</CardTitle>
                <CardDescription>{t("your_activity_across_repositories")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={repositoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="commits" fill="#8884d8" name={t("commits")} />
                      <Bar dataKey="pullRequests" fill="#82ca9d" name={t("pull_requests")} />
                      <Bar dataKey="timeSpent" fill="#ffc658" name={t("hours_spent")} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle>{t("time_distribution")}</CardTitle>
                <CardDescription>{t("how_you_spend_your_time")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {timeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} hours`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

