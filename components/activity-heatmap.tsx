"use client"

import { useState } from 'react'
import { format, parseISO, eachDayOfInterval, subYears, getDay, startOfWeek, addDays, isSameMonth } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/utils/use-translation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Activity = {
  date: string
  hours: number
  projects: { [key: string]: number }
}

type ActivityData = {
  [date: string]: Activity
}

type MonthData = {
  month: string
  days: Date[]
}

export function ActivityHeatmap() {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [activityData, setActivityData] = useState<ActivityData>(generateMockActivityData())

  // Generate calendar grid data
  const endDate = new Date()
  const startDate = subYears(endDate, 1)
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  
  // Group days by month
  const months: MonthData[] = []
  let currentMonth: MonthData | null = null

  days.forEach((day) => {
    const monthStr = format(day, 'MMM yyyy')
    if (!currentMonth || currentMonth.month !== monthStr) {
      if (currentMonth) {
        months.push(currentMonth)
      }
      currentMonth = {
        month: monthStr,
        days: []
      }
    }
    currentMonth.days.push(day)
  })
  if (currentMonth) {
    months.push(currentMonth)
  }

  const handleDayClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col justify-around mr-2 text-xs text-muted-foreground h-[144px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-max">
              {months.map((monthData, monthIndex) => (
                <div key={monthData.month} className="flex flex-col">
                  <div className="text-xs text-muted-foreground mb-2 px-2">
                    {monthData.month}
                  </div>
                  <div className="relative">
                    <div className="grid grid-rows-7 gap-1 px-2">
                      {Array.from({ length: 7 }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                          {monthData.days
                            .filter((day) => getDay(day) === rowIndex)
                            .map((day) => {
                              const dateStr = format(day, 'yyyy-MM-dd')
                              const activity = activityData[dateStr]
                              return (
                                <TooltipProvider key={dateStr}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className={`w-3 h-3 rounded-sm ${getColorClass(activity?.hours || 0)}`}
                                        onClick={() => handleDayClick(dateStr)}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{format(day, 'MMM d, yyyy')}</p>
                                      <p>{activity?.hours || 0} hours</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )
                            })}
                        </div>
                      ))}
                    </div>
                    {monthIndex < months.length - 1 && (
                      <div className="absolute right-0 top-0 w-px h-full bg-border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 text-xs text-muted-foreground">
          <span className="mr-2">{t('less')}</span>
          <div className="flex gap-1">
            {[0, 2, 4, 6].map((hours) => (
              <div
                key={hours}
                className={`w-3 h-3 rounded-sm ${getColorClass(hours)}`}
              />
            ))}
          </div>
          <span className="ml-2">{t('more')}</span>
        </div>
      </div>

      {selectedDate && activityData[selectedDate] && (
        <Card>
          <CardHeader>
            <CardTitle>{t('activity_details')}</CardTitle>
            <CardDescription>
              {format(parseISO(selectedDate), 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('total_hours_worked', { hours: activityData[selectedDate].hours })}</p>
            <h4 className="font-semibold mt-2">{t('projects_worked_on')}:</h4>
            <ul className="list-disc list-inside">
              {Object.entries(activityData[selectedDate].projects).map(([project, hours]) => (
                <li key={project}>{project}: {hours} {t('hours')}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function generateMockActivityData(): ActivityData {
  const data: ActivityData = {}
  const end = new Date()
  const start = subYears(end, 1)

  eachDayOfInterval({ start, end }).forEach(date => {
    const dateString = format(date, 'yyyy-MM-dd')
    const hours = Math.floor(Math.random() * 8)
    if (hours > 0) {
      data[dateString] = {
        date: dateString,
        hours,
        projects: {
          'Project A': Math.floor(Math.random() * hours),
          'Project B': Math.floor(Math.random() * (hours - (data[dateString]?.projects['Project A'] || 0)))
        }
      }
    }
  })

  return data
}

function getColorClass(hours: number): string {
  if (hours === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (hours < 3) return 'bg-green-200 dark:bg-green-900'
  if (hours < 6) return 'bg-green-400 dark:bg-green-700'
  return 'bg-green-600 dark:bg-green-500'
}

