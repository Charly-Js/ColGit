"use client"

import { useState } from 'react'
import { Layout } from "@/components/layout"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')
  const [notes, setNotes] = useState('')

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask])
      setNewTask('')
      toast({
        title: "Task added",
        description: "Your new task has been added successfully.",
      })
    }
  }

  const saveNotes = () => {
    // Here you would typically save the notes to your backend
    console.log({ date, notes })
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    })
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-1/2 lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Manage your schedule and tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/2 lg:w-1/3">
          <Tabs defaultValue="tasks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>
                    Manage your tasks for {date?.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input type="checkbox" className="w-4 h-4" />
                        <span>{task}</span>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="New task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <Button onClick={addTask}>Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>
                    Add notes for {date?.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your notes here"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <Button onClick={saveNotes} className="mt-4">Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}

